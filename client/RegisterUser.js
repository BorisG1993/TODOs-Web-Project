// User registration behaviour
// Contains username, email, password and password confirm


// Submission behaviour
document.getElementById('registrationForm').addEventListener('submit', async function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);
    const data = {};
    formData.forEach((value, key) => (data[key] = value));

    if(!check_data(data) || isUserConnected()) return;

    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // if user exists
        if (response.status == 400) {
            const responseData = await response.json();
            alert(responseData.message);
        }

        // for other errors
        else if (!response.ok) {
            const errorResponse = await response.json();
            alert(errorResponse.error);
        }

        // navigate to /login
        else {
            const responseData = await response.json();
            alert(responseData.message);
            window.location.href = '/login';
        }

    } catch (error) {
        alert(error);
    }
});


// check data
function check_data(data) {

    // other evaluations are done trough bootstrap 

    if (data['password'].length < 8) {
        alert("Password should be 8 or more characters");
        return false;
    }

    if (data['password'] != data['confirm_password']) {
        alert("Passwords do not match");
        return false;
    }
    return true;
}



