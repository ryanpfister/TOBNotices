// Assuming you will fetch notices from server
// Example using fetch API
fetch('/notices')
  .then(response => response.json())
  .then(data => {
    const noticesContainer = document.getElementById('notices-container');
    noticesContainer.innerHTML = ''; // Clear existing notices
    data.forEach(notice => {
      noticesContainer.innerHTML += `<p>${notice}</p>`;
    });
  })
  .catch(error => console.error('Error fetching notices:', error));
