// update-notices.js

fetch('/notices')
  .then(response => response.json())
  .then(data => {
    const noticesContainer = document.getElementById('notices-container');
    noticesContainer.innerHTML = ''; // Clear existing notices
    data.forEach(notice => {
      noticesContainer.innerHTML += `<p><strong>${notice.subject}</strong><br>${notice.body}</p>`;
    });
  })
  .catch(error => console.error('Error fetching notices:', error));
