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

const questions = {
    "frontend": [
      {
        question: "What does the <div> tag represent in HTML?",
        choice1: "A form input field",
        choice2: "A block-level container",
        choice3: "A link to an external website",
        choice4: "A placeholder for images",
        answer: 2,
        score: 10
      },
      {
        question: "Which HTML tag is used to link an external CSS file?",
        choice1: "<style>",
        choice2: "<css>",
        choice3: "<link>",
        choice4: "<script>",
        answer: 3,
        score: 10
      },
      {
        question: "What attribute is used to specify the URL for a link in HTML?",
        choice1: "href",
        choice2: "src",
        choice3: "alt",
        choice4: "title",
        answer: 1,
        score: 10
      },
      {
        question: "What is the correct HTML tag for inserting a line break?",
        choice1: "<break>",
        choice2: "<lb>",
        choice3: "<br>",
        choice4: "<newline>",
        answer: 3,
        score: 10
      },
      {
        question: "What does the <meta> tag do in HTML?",
        choice1: "Defines the page's title",
        choice2: "Provides metadata about the HTML document",
        choice3: "Creates a navigation bar",
        choice4: "Specifies the background image",
        answer: 2,
        score: 10
      },
      {
        question: "What does the flex property do in CSS?",
        choice1: "Aligns content to the right",
        choice2: "Defines the flex container",
        choice3: "Sets the font size",
        choice4: "Adds a shadow effect",
        answer: 2,
        score: 10
      },
      {
        question: "How do you center a block element horizontally in CSS?",
        choice1: "margin: auto;",
        choice2: "text-align: center;",
        choice3: "padding: center;",
        choice4: "align-items: center;",
        answer: 1,
        score: 10
      },
      {
        question: "What is the purpose of the z-index property in CSS?",
        choice1: "The font size",
        choice2: "The stacking order of elements",
        choice3: "The opacity of an element",
        choice4: "The border thickness",
        answer: 2,
        score: 10
      },
      {
        question: "What is the purpose of the box-sizing property in CSS?",
        choice1: "To set the size of the content box only",
        choice2: "To include padding and border in the element's total width and height",
        choice3: "To set the visibility of an element",
        choice4: "To align items in a flex container",
        answer: 2,
        score: 10
      }],
    
    "backend": [
      {
        question: "What is a Python decorator?",
        choice1: "A function that wraps another function",
        choice2: "A variable that stores data",
        choice3: " A method that calls a class constructor",
        choice4: "A built-in Python library",
        answer: 1,
        score: 10
      },
      {
        question: "What is the purpose of the self keyword in Python?",
        choice1: "To refer to the class itself",
        choice2: "To reference the instance of the class",
        choice3: "To declare a global variable",
        choice4: "To initialize a loop",
        answer: 2,
        score: 10
      },
      {
        question: "How can you create a dictionary in Python?",
        choice1: "dict = {key: value}",
        choice2: "dict = [key: value]",
        choice3: "dict = (key, value)",
        choice4: "dict = <key, value>",
        answer: 1,
        score: 10
      },
      {
        question: "What does the JOIN keyword do in SQL?",
        choice1: "Combines two or more tables based on a related column",
        choice2: "Deletes a row from the table",
        choice3: "Groups rows based on column values",
        choice4: "Creates a new table",
        answer: 1,
        score: 10
      },
      {
        question: "What is the difference between INNER JOIN and LEFT JOIN in SQL?",
        choice1: "INNER JOIN includes all records, while LEFT JOIN only includes matching records",
        choice2: "INNER JOIN only returns records with matching values from both tables",
        choice3: "LEFT JOIN only returns records from the right table",
        choice4: "There is no difference",
        answer: 2,
        score: 10
      },
      {
        question: "How do you retrieve all columns from a table in SQL?",
        choice1: "SELECT * FROM table_name;",
        choice2: "SELECT ALL FROM table_name;",
        choice3: "FETCH * FROM table_name;",
        choice4: "SELECT column_name FROM table_name;",
        answer: 1,
        score: 10
      },
      {
        question: "What PHP function is used to include a file?",
        choice1: "include_file()",
        choice2: "load_file()",
        choice3: "include()",
        choice4: "require_file()",
        answer: 3,
        score: 10
      },
      {
        question: "What is the difference between echo and print in PHP?",
        choice1: "echo can return values, while print does not",
        choice2: "echo can output multiple strings, while print can only output one",
        choice3: "print is used to print arrays, while echo prints strings",
        choice4: "echo is used to declare variables",
        answer: 2,
        score: 10
      },
      {
        question: "How do you connect to a MySQL database in PHP?",
        choice1: "mysql_connect('host', 'user', 'password')",
        choice2: "db_connect('host', 'user', 'password')",
        choice3: "connect_to_mysql('host', 'user', 'password')",
        choice4: "mysqli_connect('host', 'user', 'password')",
        answer: 1,
        score: 10
      }],
    "c_cpp": [
      {
        question: "What is the difference between ++i and i++ in C/C++?",
        choice1: "++i increments the value before using it, and i++ increments after using it",
        choice2: "++i is used for strings, while i++ is for integers",
        choice3: "i++ increments twice, while ++i increments once",
        choice4: "There is no difference",
        answer: 1,
        score: 10
      },
      {
        question: "What does #include do in C/C++?",
        choice1: "Includes a library or header file in the program",
        choice2: "Includes a function definition",
        choice3: "Includes an input file",
        choice4: "Includes a variable declaration",
        answer: 1,
        score: 10
      },
      {
        question: "What is a pointer in C/C++?",
        choice1: "It stores the address of a variable",
        choice2: "It stores the data itself",
        choice3: "It loops through array elements",
        choice4: "It represents a function return type",
        answer: 1,
        score: 10
      },
      {
        question: "How does memory management work in C?",
        choice1: "Memory is automatically managed by the operating system",
        choice2: "Developers must manually allocate and deallocate memory",
        choice3: "Memory is managed using variables",
        choice4: "Memory is never released in C",
        answer: 2,
        score: 10
      },
      {
        question: "What is the difference between malloc and calloc in C?",
        choice1: "malloc allocates memory, and calloc initializes it to 0",
        choice2: "calloc is used for arrays, and malloc is for single elements",
        choice3: "malloc is used for integers, while calloc is for strings",
        choice4: "There is no difference",
        answer: 1,
        score: 10
      },
      {
        question: "What is a structure in C/C++?",
        choice1: "A function that creates objects",
        choice2: "A way to define arrays",
        choice3: "A data type that allows grouping variables of different types",
        choice4: "A method to implement inheritance",
        answer: 3,
        score: 10
      }
    ],
    "algorithms": [
      {
        question: "What is the time complexity of the quicksort algorithm?",
        choice1: "O(n^2)",
        choice2: "O(log n)",
        choice3: "O(n log n)",
        choice4: "O(n)",
        answer: 3,
        score: 10
      },
      {
        question: "What is a binary search algorithm?",
        choice1: "A search that works by repeatedly dividing the list in half",
        choice2: "A search that checks each element one by one",
        choice3: "A search for elements in a sorted array",
        choice4: "A sorting algorithm",
        answer: 1,
        score: 10
      },
      {
        question: "What is the space complexity of the merge sort algorithm?",
        choice1: "O(1)",
        choice2: "O(n)",
        choice3: "O(n log n)",
        choice4: "O(log n)",
        answer: 2,
        score: 10
      },
      {
        question: "What data structure is best for implementing a LIFO (Last In First Out) system?",
        choice1: "Queue",
        choice2: "Stack",
        choice3: "Array",
        choice4: "Linked list",
        answer: 2,
        score: 10
      },
      {
        question: "What is the purpose of the hash table in computer science?",
        choice1: "To provide quick access to elements using a key-value pair",
        choice2: "To sort data",
        choice3: "To store data in sequential order",
        choice4: "To manage memory",
        answer: 1,
        score: 10
      },
      {
        question: "What is the difference between a stack and a queue?",
        choice1: "Stack is FIFO, Queue is LIFO",
        choice2: "Stack is LIFO, Queue is FIFO",
        choice3: "Stack is used to store numbers, Queue for strings",
        choice4: "Stack uses more memory",
        answer: 2,
        score: 10
      }
    ],
    "devops": [
      {
        question: "What is the main purpose of CI/CD?",
        choice1: "Code injection and database management",
        choice2: "Manual testing of applications",
        choice3: "Continuous Integration and Continuous Deployment",
        choice4: "CPU performance monitoring",
        answer: 3,
        score: 10
      },
      {
        question: "Which tool is commonly used for automation in DevOps pipelines?",
        choice1: "MySQL",
        choice2: "Git",
        choice3: "Jenkins",
        choice4: "VS Code",
        answer: 3,
        score: 10
      },
      {
        question: "What does Docker do?",
        choice1: "It is used for compiling Java code",
        choice2: "It creates virtual machines",
        choice3: "It packages applications into containers",
        choice4: "It hosts websites",
        answer: 3,
        score: 10
      },
      {
        question: "Which file is used to define a Docker image?",
        choice1: "Dockerfile",
        choice2: "docker.config",
        choice3: "image.txt",
        choice4: "container.yml",
        answer: 1,
        score: 10
      },
      {
        question: "What does kubectl do in Kubernetes?",
        choice1: "It compiles JavaScript files",
        choice2: "It connects SQL databases",
        choice3: "It manages Kubernetes clusters",
        choice4: "It manages Docker images",
        answer: 3,
        score: 10
      }
    ],
    "software_engineering": [
      {
        question: "What does SOLID stand for in software design?",
        choice1: "Safe, Organized, Logical, Integrated, Designed",
        choice2: "Simple, Objective, Layered, Interface, Database",
        choice3: "Five principles of object-oriented design",
        choice4: "A programming framework",
        answer: 3,
        score: 10
      },
      {
        question: "Which of the following is NOT a principle of OOP (Object-Oriented Programming)?",
        choice1: "Encapsulation",
        choice2: "Abstraction",
        choice3: "Compilation",
        choice4: "Polymorphism",
        answer: 3,
        score: 10
      },
      {
        question: "What does DRY stand for in coding?",
        choice1: "Don’t Repeat Yourself",
        choice2: "Develop Rapidly Yourself",
        choice3: "Delete Reused YAML",
        choice4: "Dynamic Rendering Yearly",
        answer: 1,
        score: 10
      },
      {
        question: "What is refactoring?",
        choice1: "Rewriting all code from scratch",
        choice2: "Reducing the number of files",
        choice3: "Improving code structure without changing behavior",
        choice4: "Formatting a database",
        answer: 3,
        score: 10
      },
      {
        question: "Why is code documentation important?",
        choice1: "It slows down the team",
        choice2: "It helps compilers understand the code",
        choice3: "It improves communication and maintainability",
        choice4: "It's only needed for front-end projects",
        answer: 3,
        score: 10
      }
    ]
  }

function startGame() {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions[quizCategory]];
  document.querySelector('.score-info strong').textContent = score;
  getNewQuestion();
}

function getNewQuestion() {
  if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
    const currentUserEmail = localStorage.getItem('currentUser');
    const userIndex = users.findIndex(user => user.email === currentUserEmail);
    
    if (userIndex !== -1) {
        users[userIndex].scores = users[userIndex].scores || {};
        users[userIndex].scores[quizCategory] = 
            Math.max(score, users[userIndex].scores[quizCategory] || 0);
        localStorage.setItem('quizUsers', JSON.stringify(users));
    }
    
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign("/public/end.html");
  }

  questionCounter++;
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  document.querySelector('.q-text').textContent = currentQuestion.question;

  const choices = Array.from(document.querySelectorAll('.choice'));
  choices.forEach(choice => {
    const number = choice.dataset.number;
    choice.textContent = currentQuestion[`choice${number}`];
    choice.classList.remove('correct', 'incorrect');
  });

  availableQuestions.splice(questionIndex, 1);
  acceptingAnswers = true;
}

document.querySelectorAll('.choice').forEach(choice => {
  choice.addEventListener('click', e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset.number;
    const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
    
    selectedChoice.classList.add(classToApply);

    if (classToApply === 'correct') {
      score += currentQuestion.score;
      document.querySelector('.score-info strong').textContent = score;
    }


  });
});

