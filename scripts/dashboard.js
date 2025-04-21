document.addEventListener('DOMContentLoaded', () => {
  const usersData = document.getElementById('users-data');
  const users = JSON.parse(localStorage.getItem('quizUsers')) || [];
  
  users.forEach(user => {
      const row = document.createElement('tr');
      
      let totalScore = 0;
      let highScore = 0;
      
      if (user.scores) {
          const scores = Object.values(user.scores)
              .map(score => parseInt(score))
              .filter(score => !isNaN(score));
          
          if (scores.length > 0) {
              totalScore = scores.reduce((sum, score) => sum + score, 0);
              highScore = Math.max(...scores);
          }
      }
      
      row.innerHTML = `
          <td>${user.username || 'N/A'}</td>
          <td>${user.email || 'N/A'}</td>
          <td>${totalScore}</td>
          <td>${highScore}</td>
      `;
      
      usersData.appendChild(row);
  });
});