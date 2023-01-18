import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//new

const question = document.querySelector('.question')
var option1 = document.querySelector('#option1')
var option2 = document.querySelector('#option2')
var option3 = document.querySelector('#option3')
var option4 = document.querySelector('#option4')
const submit = document.querySelector('#submit')
const answers = document.querySelectorAll('.answer')
const scorearea = document.querySelector('.scorearea')
const showscore = document.querySelector('#showscore')
const dark = document.getElementById('dark-moon')
let score = 0
let qnumber = 0
let correctAnswer
let correctid
async function questionBank(){
  const APIUrl = 'https://the-trivia-api.com/api/questions?categories=general_knowledge,music,science,history&limit=10&region=US&difficulty=easy';
  const result = await fetch(`${APIUrl}`)
  const data = await result.json();
  toArray(data);
  //loadQuestion(data);
}

var dataArr = [];

function toArray(data){
  //console.log(data)
  dataArr = data;
  loadQuestion();
}


function loadQuestion(){
  // console.log(data.length)
  console.log(qnumber);
  // console.log(data[qnumber])
   var info = dataArr[qnumber];
  //console.log(info)
  correctAnswer = info.correctAnswer;
  question.innerHTML = info.question;
  var arr = [];
  arr.push(info.incorrectAnswers[0]);
  arr.push(info.incorrectAnswers[1]);
  arr.push(info.incorrectAnswers[2]);
  arr.push(info.correctAnswer);
  //console.log(arr)
  function shuffle(arr) {
    arr.sort(() => Math.random() - 0.5);
  }  
  shuffle(arr);
  option1.innerHTML = arr.shift();
  option2.innerHTML = arr.shift();
  option3.innerHTML = arr.shift();
  option4.innerHTML = arr.shift();
  //console.log(option1.innerHTML);
  function actualCorrect(){
    if(option1.innerHTML === correctAnswer)correctid = 'ans1';
    else if(option2.innerHTML === correctAnswer)correctid = 'ans2';
    else if(option3.innerHTML === correctAnswer)correctid = 'ans3';
    else if(option4.innerHTML === correctAnswer)correctid = 'ans4';
  }
  actualCorrect();
  // console.log(correctid)
}

questionBank();

const deselectAll = () =>{
  answers.forEach((element) => {
      element.checked=false;
  });
}


const getAnswer = () =>{
  let answer ;
  answers.forEach((element) => {
      if(element.checked){
          answer = element.id;
      }
  });
  //console.log(answer.innerHTML)
  return answer;
};


submit.addEventListener('click',() =>{
  const checkAnswer = getAnswer();
  if(checkAnswer===correctid && qnumber!==10){
      score++;
  };

  qnumber+=1;
  deselectAll()
  if(qnumber<10){
      loadQuestion()
  }
  else{
      showscore.innerHTML = `
      <h3> You have scored ${score}/${10} </h3>
      <button class='btn' onclick="location.reload()">Play Again</button>`;
      showscore.classList.remove('scorearea');
  }
});


dark.onclick = function(){
    document.body.classList.toggle("dark-theme")
    if(document.body.classList.contains('dark-theme')){
        dark.src = './images/sun.png'
    }
    else{
        dark.src = './images/moon.png'
    }
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
