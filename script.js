const questions = [
  {
    question: "Qual foi o último livro da Bíblia a ser escrito?",
    answers: [
      { text: "Evangelho de João", correct: false },
      { text: "Apocalipse", correct: true },
      { text: "Atos dos Apóstolos", correct: false },
      { text: "Carta aos Hebreus", correct: false },
    ],
  },
  {
    question: "Quem foi o primeiro mártir cristão?",
    answers: [
      { text: "Tiago", correct: false },
      { text: "Estêvão", correct: true },
      { text: "Pedro", correct: false },
      { text: "Bartolomeu", correct: false },
    ],
  },
  {
    question: "Qual foi o primeiro milagre de Jesus?",
    answers: [
      { text: "Multiplicação dos pães", correct: false },
      { text: "Ressuscitar Lázaro", correct: false },
      { text: "Transformar água em vinho", correct: true },
      { text: "Caminhar sobre as águas", correct: false },
    ],
  },
  {
    question: "Qual Papa convocou o Concílio Vaticano II?",
    answers: [
      { text: "Pio XII", correct: false },
      { text: "João XXIII", correct: true },
      { text: "Paulo VI", correct: false },
      { text: "João Paulo II", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  nextButton.style.display = "none";
  showQuestion();
  nextButton.onclick = handleNextButtonClick; // Garantir que a função correta esteja atribuída ao botão
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(event) {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  // Desativar todos os botões após a escolha
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

// Função para lidar com o clique do botão "Next"
function handleNextButtonClick() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `Você acertou ${score} de ${questions.length} perguntas!`;
  nextButton.innerHTML = "Reiniciar";
  nextButton.style.display = "block";

  // Agora o botão next chama startQuiz ao final do jogo
  nextButton.onclick = startQuiz;
}

// **Correção:** Sempre garantir que `handleNextButtonClick` está no botão "Next"
nextButton.onclick = handleNextButtonClick;

startQuiz();
