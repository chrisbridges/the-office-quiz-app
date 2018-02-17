let questionNumber = 0;
let score = 0;
const numberOfQuestions = QUESTIONS.length;

$('.number-of-questions').text(numberOfQuestions);

function startQuiz () {
  // on button submit, hide quiz-start, render first question to DOM
  $('.js-quiz-start').on('click', '.start-button', function(event) {
    $('.js-quiz-start').remove();
    renderQuestion();
  });
}

function createQuestion () {
  // create question-answer form template to push to DOM
  $('.question-number').text(questionNumber + 1);
    return `
    <div class="question">
      <form id="question-form" role="form">
        <legend>${QUESTIONS[questionNumber].question}</legend>
        <fieldset>
          <label for="answer-1">
          <input type ="radio" id="answer-1" name="answer" value="${QUESTIONS[questionNumber].answers[0]}" required>
          <span>${QUESTIONS[questionNumber].answers[0]}</span>
          </label>
          <label for="answer-2">
          <input type ="radio" id="answer-2" name="answer" value="${QUESTIONS[questionNumber].answers[1]}" required>
          <span>${QUESTIONS[questionNumber].answers[1]}</span>
          </label>
          <label for="answer-3">
          <input type ="radio" id="answer-3" name="answer" value="${QUESTIONS[questionNumber].answers[2]}" required>
          <span>${QUESTIONS[questionNumber].answers[2]}</span>
          </label>
          <label for="answer-4">
          <input type ="radio" id="answer-4" name="answer" value="${QUESTIONS[questionNumber].answers[3]}" required>
          <span>${QUESTIONS[questionNumber].answers[3]}</span>
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </div>`;
}

function renderQuestion () {
  // render createQuestion output to DOM
  let question = createQuestion(questionNumber);
  $('.js-question-form').html(question);
  listenForUserAnswer();
}

function listenForUserAnswer () {
  // depending on user answer, will either result in right or wrong screen
  $('#question-form').submit(function(event) {
    event.preventDefault();
    let userAnswer = $("input:checked").val();
    let correctAnswer = QUESTIONS[questionNumber].correctAnswer;
    if (userAnswer === correctAnswer) {
      userAnswerCorrect();
    } else {
      userAnswerWrong();
    }
  });
}

function userAnswerCorrect () {
  incrementScore();
  const nextButton = '<button class="next-button">Next Question</button>';
  $('.js-question-form').html(`
    <h2>Correct! You are the best</h2>
    <img class="result-image" src="https://ewedit.files.wordpress.com/2015/01/the-dundies.jpg?w=612" alt="Pam drunk with Dundie">
    ${nextButton}`);
  nextQuestion();
}

function userAnswerWrong () {
  const nextButton = '<button class="next-button">Next Question</button>';
  let correctAnswer = QUESTIONS[questionNumber].correctAnswer;
  $('.js-question-form').html(`
    <h2>Incorrect. The answer is <span class="correct-answer">${correctAnswer}</span></h2>
    <img class="result-image" src="https://img.cinemablend.com/filter:scale/quill/c/7/c/3/1/3/c7c3135f21f3ce71ca8cb0fd407d3de15877dbb2.jpg?mw=600" alt="Michael Scott in pain">
    ${nextButton}`);
  nextQuestion();
}

function nextQuestion () {
  incrementQuestionNumber();
  // generate next question after right/wrong screen
  $('.js-question-form').on('click', '.next-button', function(event) {
    if (questionNumber < numberOfQuestions) {
      // create new question
      renderQuestion();
    } else {
      endQuiz();
    }
  });
}

function incrementQuestionNumber () {
  questionNumber++;
}

function incrementScore () {
  score++;
  $('.score').text(score);
}

function endQuiz () {
  // generate reset button
  const resetButton = '<button class="reset-button">Try Again</button>';
  // give critique based on score
  if (score >= 8) {
    $('.js-question-form').html(`
      <h2>You are the World\'s Best Boss!</h2>
      <img class="result-image" src="http://www.businessnewsdaily.com/images/i/000/008/678/original/michael-scott-the-office.PNG?1432126986" alt="World's Best Boss">
      ${resetButton}`);
  }
  else if (score < 8 && score >= 6) {
    $('.js-question-form').html(`
      <h2>Nice! You have won a tiny Dundie.</h2>
      <img class="result-image" src="https://img.cinemablend.com/filter:scale/cb/f/6/c/4/a/1/f6c4a130350731b026f260de0931aaab7c53667b4036527988f71cfc9116941e.jpg?mw=600" alt="Tiny Dundie"> 
      ${resetButton}`);
  } else {
    $('.js-question-form').html(`
    <h2>Ouch. Study up and try again.<br>To quote the great Michael Scott who once quoted Wayne Gretzky:</h2>
    <img class="result-image" src="http://capitalsoutsider.com/wp-content/uploads/2013/10/Michael-Scott.jpg" alt="You miss 100% of the shots you don't take">
    ${resetButton}`);
  }
  // reset all quiz counter variables on reset
  $('.js-question-form').on('click', '.reset-button', function(event) {
    location.reload();
  });
}

function quizApp () {
  startQuiz();
}

$(quizApp);