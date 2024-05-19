// Helper functions across different js files

function isUserConnected() {
  if  (sessionStorage.getItem('currentUser') !== null) {
      alert('A user is already connected, please log out first.');
      return true;
  }
  return false;
}
