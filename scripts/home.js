document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get('user');
  if (userEmail) {
    localStorage.setItem('currentUser', userEmail);
  }

  if (!localStorage.getItem('quizzes')) {
    const quizzes = [
      { name: 'Frontend', image: '/assets/images/frontend-img2.png', key: 'frontend' },
      { name: 'Backend', image: '/assets/images/home-backend.png', key: 'backend' },
      { name: 'C / C++', image: '/assets/images/home-c.cpp.png', key: 'c_cpp' },
      { name: 'Data Structures', image: '/assets/images/home-data.structures.png', key: 'algorithms' },
      { name: 'Version Control (Git)', image: '/assets/images/home-itgit.png', key: 'git' },
      { name: 'DevOps & Deployment Section', image: '/assets/images/home-devops.png', key: 'devops' },
      { name: 'Software Engineering', image: '/assets/images/home-software.enj.png', key: 'software_engineering' }
    ];
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }

  const quizItems = document.querySelector('.quiz-items');
  const quizzes = JSON.parse(localStorage.getItem('quizzes'));

  quizItems.innerHTML = quizzes.map(quiz => `
    <li class="quiz-item">
      <a href="/public/quiz.html?quiz=${encodeURIComponent(quiz.key)}">
        ${quiz.name}
        <img src="${quiz.image}" alt="${quiz.name}">
      </a>
    </li>
  `).join('');
});