// User login behaviour
// Contains username and password

// Go straight to /todo if user currently logged in on session
if(sessionStorage.getItem('currentUser') !== null) {
  window.location.href = '/todo?' + getCurrentUserQuery();
}

// Submission behaviour
document.getElementById('loginForm').addEventListener('submit', async function(event) {
  event.preventDefault(); 

  const formData = new FormData(this);
  const data = {};
  formData.forEach((value, key) => (data[key] = value));

  try {
    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    // if user doesn't exist
    if (response.status == 400) {
        const responseData = await response.json();
        alert(responseData.message);
    }

    // for other errors
    else if (!response.ok) {
        const errorResponse = await response.json();
        alert(errorResponse.error);
    }

    // navigate to /todo with logged user
    else {
        const responseData = await response.json();
        data['username'] = responseData.username;
        const user = JSON.stringify(data);
        sessionStorage.setItem('currentUser', user);
        localStorage.setItem('todo', JSON.stringify(responseData.todos));
        window.location.href = '/todo?' + getCurrentUserQuery();   
    }

} catch (error) {
    alert(error);
}
});

// creates username and email data to be passed as string query to /todo for the labels
function getCurrentUserQuery() {
  const storedUserString = sessionStorage.getItem('currentUser');
  const storedUser = JSON.parse(storedUserString);
  return new URLSearchParams( {username: storedUser.username, email: storedUser.email} ).toString();
}