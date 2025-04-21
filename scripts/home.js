document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userEmail = urlParams.get('user');
  if (userEmail) {
    localStorage.setItem('currentUser', userEmail);
  }

  if (!localStorage.getItem('quizzes')) {
    const quizzes = [
      { name: 'Frontend', image: '/assets/frontend-img2.png' },
      { name: 'Backend', image: '/assets/home-backend.png' },
      { name: 'C / C++', image: '/assets/home-c.cpp.png' },
      { name: 'Data Structures', image: '/assets/home-data.structures.png' },
      { name: 'Version Control (Git)', image: '/assets/home-itgit.png' },
      { name: 'DevOps & Deployment Section', image: '/assets/home-devops.png' },
      { name: 'Software Engineering', image: '/assets/home-software.enj.png' }
    ];
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }

  const quizItems = document.querySelector('.quiz-items');
  const quizzes = JSON.parse(localStorage.getItem('quizzes'));

  quizItems.innerHTML = quizzes.map(quiz => `
    <li class="quiz-item">
      <a href="/public/quiz.html?quiz=${encodeURIComponent(quiz.name)}">
        ${quiz.name}
        <img src="${quiz.image}" alt="${quiz.name}">
      </a>
    </li>
  `).join('');
});
