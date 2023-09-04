var isAdmin = false;
fetch('../pre-login/fetch_credentials.php')
.then(response => response.json())
.then(data => {
  isAdmin = data.role === 'admin';
  const adminSettingsLi = document.getElementById('admin-settings-li');

  // Show the "Admin Settings" link if the user is an admin
  if (isAdmin) {
    adminSettingsLi.style.display = 'block';
  }
})
.catch(error => {
  console.error('Error fetching data', error);
});