const urlParams = new URLSearchParams(window.location.search);
const quizCategory = urlParams.get('quiz') || 'frontend';

document.querySelector('h1').textContent = `${quizCategory.charAt(0).toUpperCase() + quizCategory.slice(1)} Quiz`;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;







