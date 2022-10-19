import React, {Component} from 'react';
import { Link } from "react-router-dom";
import Checkbox from './component/Checkbox';
import {Dropdown} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import CheckboxMulti from './component/CheckboxMulti';

const url = "";

function Main() {
    const [surveyTwo, setSurveyTwo] = React.useState("입력해 주세요");
    const [surveyTwoClicked, setSurveyTwoClicked] = React.useState(0);
  
    const dogBreedDic = ["믹스견", "스피츠", "시츄", "요크셔테리어", "말티즈", "포메라니안", "푸들", "치와와", "미니핀", "슈나우저", "페키니즈", "닥스훈트", "빠삐용",
    "비숑 프리제", "보스턴 테리어", "샤페이", "웰시코기", "비글", "코카스파니엘", "불독", "사모예드", "피레니즈", "리트리버", "말라뮤트", "한국 토종견", "허스키", "세퍼트",
    "하운드", "달마시안", "콜리", "쉽독"];
    const [dogBreedArr, setDogBreedArr] = React.useState([]);

    // 견종 선택
    const handleTextSurveyTwo = (event) => {
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
          setSurveyTwo(val);
      }
    };
  
    function clickSurveyTwo(){
      if (surveyTwo === "입력해 주세요"){
          setSurveyTwo("");
      }
      setSurveyTwoClicked(1);
    };
  
    function clickSurveyTwoBlur(){
      if (surveyTwo === ""){
          setSurveyTwo("입력해 주세요");
      }
      setSurveyTwoClicked(0);
    };
  
    const getBreedArray = (surveyTwo) =>{
      if (surveyTwo){
          setDogBreedArr([]);
          const regex = new RegExp(surveyTwo, 'i');
      }
    };
  
    function setBreedButton(name){
      setSurveyTwo(name);
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

    const [name, setName] = React.useState("");
    const [age, setAge] = React.useState(0);
    const [userage, setUserage] = React.useState(1);
    const [disease, setDisease] = React.useState([]);
    const [allergy, setAllergy] = React.useState([]);
    const [favor, setFavor] = React.useState([]);
    const [tool, setTool] = React.useState([]);
    const [data, setData] = React.useState({});
    
    const handleUserage = (age) => {
        setUserage(age);
        setData(getData());
    }

    const handleDisease = (value) => {
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

    const changeName = (e) => {
        setName(e.target.value);
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
        let sex = false;
        if (document.getElementById("male").checked){
            sex = true
        }

        return {
            dogname: name,
            dogage: age,
            sex: sex,
            userage: userage,
            disease: disease,
            allergy: allergy,
            favor: favor,
            tool: tool
        }
    }
  
    return (
        <div>
            <h1>강아지 정보 입력</h1>
                <div>
                    <h3>성별을 선택해주세요.</h3>
                    <p id='sex'>
                        <label for="male">남성</label>
                        <input id="male" type="radio" value="남성" name="ss"></input>
                        <label for="female">여성</label>
                        <input id="female" type="radio" value="여성" name="ss"></input>
                    </p>
                </div>
            <div>
                <h3>연령대를 선택해주세요.</h3>
                <Checkbox formData={userAgeFormData} handler={handleUserage}></Checkbox>
            </div>
            <div>
                <h3>강아지의 이름을 입력해주세요.</h3>
                <input type="text" placeholder='아름' value={name} onChange={changeName}/>
            </div>
            <div>
                <h3>강아지의 나이를 입력해주세요. (단위: 개월)</h3>
                <input type="text" placeholder='나이' value={age} onChange={changeAge}/>
            </div>
            <div>
                <h3>강아지의 종을 선택해주세요.</h3>
                <div className = "Q2" style = {{display:'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <form>
                        <div>
                            <textarea value={surveyTwo} onChange = {handleTextSurveyTwo} onClick = {() => {clickSurveyTwo()}} onBlur = {() => {clickSurveyTwoBlur()}} />
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
            <Link to="/menu" state={{hello:"hello", data: data}}>넘어가기</Link>
        </div>
    );
}

export default Main;