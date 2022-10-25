import React, {Component} from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import {Button, Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CheckboxMulti from './component/CheckboxMulti';

const url = "http://localhost:5000";

function Main() {
    const [result, setResult] = React.useState([]);
    const [breed, setBreed] = React.useState("입력해 주세요");
    const [breedClicked, setBreedClicked] = React.useState(0);
  
    const dogBreedDic = ["믹스견", "스피츠", "시츄", "요크셔테리어", "말티즈", "포메라니안", "푸들", "치와와", "미니핀", "슈나우저", "페키니즈", "닥스훈트", "빠삐용",
    "비숑 프리제", "보스턴 테리어", "샤페이", "웰시코기", "비글", "코카스파니엘", "불독", "사모예드", "피레니즈", "리트리버", "말라뮤트", "한국 토종견", "허스키", "세퍼트",
    "하운드", "달마시안", "콜리", "쉽독"];
    const [dogBreedArr, setDogBreedArr] = React.useState([]);

    // 견종 선택
    const handleTextbreed = (event) => {
      if (event.target.value){
          setDogBreedArr([]);
          const regex = new RegExp(event.target.value, 'i');
          setDogBreedArr(
              dogBreedDic.filter((name)=>name.search(regex)>=0)
          );
      }
      else {
          setDogBreedArr([]);
      }
      if(event.target.value.length <= 20)
      {
          let val = event.target.value.replace(/\n/g, "");
          setBreed(val);
      }
    };
  
    function clickbreed(){
      if (breed === "입력해 주세요"){
          setBreed("");
      }
      setBreedClicked(1);
    };
  
    function clickbreedBlur(){
      if (breed === ""){
          setBreed("입력해 주세요");
      }
      setBreedClicked(0);
    };
  
    const getBreedArray = (breed) =>{
      if (breed){
          setDogBreedArr([]);
          const regex = new RegExp(breed, 'i');
      }
    };
  
    function setBreedButton(name){
      setBreed(name);
      setDogBreedArr([]);
    };

    const userAgeFormData = [
        {id:1, name: "10대"},
        {id:2, name: "20대"},
        {id:3, name: "30대"},
        {id:4, name: "40대"},
        {id:5, name: "50대 이상"}
    ];

    const diseaseFormData = [
        {id:1, name: "눈 관련"},
        {id:2, name: "귀 관련"},
        {id:3, name: "슬개골 관련"},
        {id:4, name: "비만"}
    ]

    const allergyFormData = [
        {id:1, name: "닭고기"},
        {id:2, name: "계란"},
        {id:3, name: "소고기"},
        {id:4, name: "유제품"},
        {id:5, name: "밀"},
        {id:6, name: "양고기"}
    ]

    const favorFormData = [
        {id:1, name: "닭고기"},
        {id:2, name: "오리"},
        {id:3, name: "소/돼지고기"},
        {id:4, name: "단호박, 고구마"},
        {id:5, name: "채소"}
    ]

    const toolFormData = [
        {id:1, name: "전자레인지"},
        {id:2, name: "찜기/찜틀"},
        {id:3, name: "에어프라이기"},
        {id:4, name: "가스레인지"},
        {id:5, name: "인덕션"}
    ]

    const orderFormData = [
        {id:0, name: "계란죽"},
        {id:1, name: "계란찜"},
        {id:2, name: "고구마만쥬"},
        {id:3, name: "김밥"},
        {id:4, name: "리코타치즈"},
        {id:5, name: "멍치킨"},
        {id:6, name: "소고기무국"},
        {id:7, name: "소시지"},
        {id:8, name: "아이스크림"},
        {id:9, name: "치즈볼"},
        {id:10, name: "피자"}
    ]
    const recipeName = ["계란죽","계란찜","고구마만쥬","김밥","리코타치즈","멍치킨","소고기무국","소시지","아이스크림","치즈볼","피자"]

    const [age, setAge] = React.useState(0);
    const [disease, setDisease] = React.useState([]);
    const [allergy, setAllergy] = React.useState([]);
    const [favor, setFavor] = React.useState([]);
    const [tool, setTool] = React.useState([]);
    const [data, setData] = React.useState({});
    const [order, setOrder] = React.useState([]);

    const handleDisease = (value) => {
        console.log(value);
        setDisease(value);
        setData(getData());
    }

    const handleFavor = (value) => {
        setFavor(value);
        setData(getData());
    }

    const handleAllergy = (value) => {
        setAllergy(value);
        setData(getData());
    }

    const handleTool = (value) => {
        setTool(value);
        setData(getData());
    }

    const handleOrder = (value) => {
        const new_list = new Array()
        for(var i = 0; i < value.length; i++) {
            new_list[i] = recipeName[i]
        }
        setOrder(new_list);
        setData(getData());
    }

    const changeAge = (e) => {
        if (e.target.value != '') {
            let dogAge = parseInt(e.target.value);
            setAge(dogAge);
            e.target.value = String(dogAge);
        } else {
            setAge(0);
            e.target.value = String(0);
        }
        setData(getData());
    }

    const getData = () => {
        return {
            age: age,
            breed: breed,
            disease: disease,
            allergy: allergy,
            favor: favor,
            tool: tool,
            order: order
        }
    }

    let getResult = () => {
        const data = getData();
        console.log(data)
        axios.post(url+"/recommend", {
            params: data
        }).then((response) => {
            console.log(response);
            const data = response.data.recipes;
            const component_list = [];
            for (var i = 0; i < data.length; i++) {
                const component = <li>{data[i]}</li>;
                
                component_list.push(component);
            }
            
            setResult(component_list);
            
        });
    }
  
    return (
        <div>
            <h1>강아지 정보 입력</h1>

            <div>
                <h3>강아지의 나이를 입력해주세요. (단위: 개월)</h3>
                <input type="text" placeholder='나이' value={age} onChange={changeAge}/>
            </div>
            <div>
                <h3>강아지의 종을 선택해주세요.</h3>
                <div className = "Q2" style = {{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <form>
                        <div>
                            <textarea value={breed} onChange = {handleTextbreed} onClick = {() => {clickbreed()}} onBlur = {() => {clickbreedBlur()}} />
                        </div>
                    </form>
                    <Dropdown style={{display: 'flex', flexDirection: 'column', overflowY: 'scroll'}}>
                        {dogBreedArr.map((data, index) => (
                        <div>
                            <Dropdown.Item key = {index} onClick = {() => {setBreedButton(data)}}>
                                {data}
                            </Dropdown.Item>
                            <Dropdown.Divider />
                        </div>
                        ))}
                    </Dropdown>
                </div>
            </div>
            <div>
                <h3>강아지가 앓고 있는 질병을 선택해주세요.</h3>
                <CheckboxMulti formData={diseaseFormData} handler={handleDisease}></CheckboxMulti>
            </div>
            <div>
                <h3>강아지가 앓고 있는 알러지를 선택해주세요.</h3>
                <CheckboxMulti formData={allergyFormData} handler={handleAllergy}></CheckboxMulti>
            </div>
            <div>
                <h3>선호하는 재료를 선택해주세요.</h3>
                <CheckboxMulti formData={favorFormData} handler={handleFavor}></CheckboxMulti>
            </div>
            <div>
                <h3>사용 가능한 집기를 선택해주세요.</h3>
                <CheckboxMulti formData={toolFormData} handler={handleTool}></CheckboxMulti>
            </div>
            <div>
                <h3>관심있는 메뉴를 골라주세요.</h3>
                <CheckboxMulti formData={orderFormData} handler={handleOrder}></CheckboxMulti>
            </div>
            <Button onClick={getResult}>결과 저장</Button>
            <ol style={{marginTop: 50}}>
                {result}
            </ol>
        </div>
        
    );
}

export default Main;