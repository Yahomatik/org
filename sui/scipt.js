var counter = 0;
var bestScore = sessionStorage.getItem('bestScore') || 0;
var numberA;
var numberB;
var result;
var timer;

var problem = document.querySelector(".problem");
var answers = document.querySelector(".answers").children;
var remaining = document.querySelector(".remaining");
var score = document.querySelector(".score");
var bestScoreDisplay = document.querySelector(".best-score");
var button = document.querySelector('.pfc');
var randomNum = function(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var countdown = function() {
  var increment = 99;
  timer = setInterval(function() {
    remaining.style.width = increment + "%";
    increment -= 1;
    
    if (remaining.style.width === "0%") {
      alert(" oyun bitti!");
      newGame();
    }
  }, 550);
};

  

var placeNumbers = function() {
  problem.innerHTML = numberA + " : " + numberB;
  answers[randomNum(3, 0)].innerHTML = result;
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].innerHTML === "") {
      if (result > 100) {
        answers[i].innerHTML = result + i + 10;
      } else {
        answers[i].innerHTML = result + i + 1;
      }
    }
  }
};

var newGame = function() {
  clearInterval(timer);
  problem.innerHTML = "";
  for (var i = 0; i < answers.length; i++) {
    answers[i].innerHTML = "";
  }
  button.disabled = false;
  alert("  topladığım puan sayısı: " + counter);
  if (counter > bestScore) {
    bestScore = counter;
    bestScoreDisplay.innerHTML = "en iyi puan: " + bestScore; //    
    sessionStorage.setItem('bestScore', bestScore);
  }
  remaining.style.width = "100%";
  score.innerHTML = "puan: 0";
  counter = 0;
}

var click = function(e) {
  if (e.target.innerHTML == result) {
    for (var i = 0; i < answers.length; i++) {
      answers[i].innerHTML = "";
    }
    counter++;
    score.innerHTML = "puan: " + counter;
    generateNumber();
  } else {
    alert(" kaybet ettin!");
    newGame();
  }
};


var generateNumber = function() {
  button.disabled = true;

  for (var i = 0; i < answers.length; i++) {
    answers[i].addEventListener("click", click, false);
  }

  if (counter < 8) {
    numberA = randomNum(8, 2);
    numberB = randomNum(8, 2);
    result = (numberA / numberB).toFixed(1); // Limit the decimal places to 5
    placeNumbers();

  } else if (counter < 15) {
    numberA = randomNum(15, 5);
    numberB = randomNum(15, 5);
    result = (numberA / numberB).toFixed(2); // Limit the decimal places to 5
    placeNumbers();

  } else {
    numberA = randomNum(20, 10);
    numberB = randomNum(20, 10);
    result = (numberA / numberB).toFixed(3); // Limit the decimal places to 5
    placeNumbers();
  }
};

button.addEventListener("click", function() {
  generateNumber();
  countdown();
}, false);