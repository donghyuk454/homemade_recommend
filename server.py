from flask import Flask, request, jsonify
import numpy as np
import json
from flask_cors import CORS

app = Flask(__name__)
# CORS(app)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

# for recommend
recommend = np.load('./result.npy')
recipe_dict = {
    "계란죽": 0,
    "계란찜": 1,
    "고구마만쥬": 2,
    "김밥": 3,
    "리코타치즈": 4,
    "멍치킨": 5,
    "소고기무국": 6,
    "소시지": 7,
    "아이스크림": 8,
    "치즈볼": 9,
    "피자": 10
}

recipe_name_list = ["계란죽","계란찜","고구마만쥬","김밥","리코타치즈","멍치킨","소고기무국","소시지","아이스크림","치즈볼","피자"]

# for filter
small_breeds = ["스피츠", "시츄", "요크셔테리어", "말티즈", "닥스훈트", "포메라니안", "푸들", "치와와", "미니핀", "슈나우저", "페키니즈", "빠삐용", "잭러셀테리어 믹스", "장모치와와", "밀티푸", "실버 푸들"]

class Recipe:
    def __init__(self, json_data):
        self.name = json_data['name']
        self.age = json_data['age'] 
        self.disease = json_data['disease']
        self.favor = json_data['favor'] # score 를 위해 추가
        self.tool = json_data['tools']
        self.hard = json_data['hard']
        self.allergy = json_data['allergy']
    
    def get_name(self):
        return self.name

    def check(self, recipe_elememt, user_element):
        for r in recipe_elememt:
            if r in user_element:
                return True
        return False
    
    def check_for_tool(self, recipe_tool, user_tool):
        for t in recipe_tool:
            if t not in user_tool:
                return True
        return False

    def filter(self, user):
        if self.check(self.disease, user.disease):
            print(self.name+"제외, 이유 : 질병")
            return False

        if self.check_for_tool(self.tool, user.tool):
            print(self.name+"제외, 이유 : 집기")
            return False

        if self.check(self.allergy, user.allergy):
            print(self.name+"제외, 이유 : 알러지")
            return False
        
        if self.hard < user.hard[0] or self.hard > user.hard[1]:
            print(self.name+"제외, 이유 : 강도")
            return False

        return True


class User:
    hard = [1]
    def __init__(self, age, breed, disease, favor, tool, allergy):
        self.age = age
        hardEnd = 3
        if breed in small_breeds or age <= 12  or age >= 84:
            hardEnd = 2
        self.hard.append(hardEnd)
        self.disease = disease
        self.favor = favor
        self.tool = tool
        self.allergy = allergy

recipe_list = []

with open("./recipes.json", "r", encoding="UTF-8") as json_file:
    json_data = json.load(json_file)
    for data in json_data['recipes']:
        recipe = Recipe(json_data=data)
        recipe_list.append(recipe)

@app.route('/')
def start():
    return "started"

@app.route('/recommend', methods=['POST'])
def hello():
    print(request.is_json)
    params = request.get_json()['params']
    order = params['order']
    recom = np.zeros(11)
    for o in order:
        recom += recommend[recipe_dict[o]]
    
    idx_list = []
    cos_list = []
    while recom.max() > 0:
        idx = np.argmax(recom)
        idx_list.append(idx)
        cos_list.append(recom[idx])
        recom[idx] = 0


    for i in range(len(idx_list)):
        print(recipe_name_list[idx_list[i]], idx_list[i], cos_list[i])

    recommend_recipe = []
    for idx in idx_list:
        recommend_recipe.append(recipe_name_list[idx])

    print("----------------")
    breed = params['breed']
    age = params['age']
    disease = params['disease']
    favor = params['favor']
    tool = params['tool']
    allergy = params['allergy']

    user = User(breed=breed, age=age, disease=disease, favor=favor, tool=tool, allergy=allergy)

    result = {
        'recipes': []
    }

    for idx in idx_list:
        recipe = recipe_list[idx]    
        name = recipe.get_name()
        if name in recommend_recipe and recipe.filter(user):
            result['recipes'].append(name)
    
    return jsonify(result)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)