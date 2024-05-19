// Server side of the TODO app

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('client'));


// Connect to MongoDB
const dbURI = 'mongodb+srv://borisg:arigato3205@borisdb.vz1z8zh.mongodb.net/todo-base';
mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to DB and Node server is running and listening on port ${PORT}...`);
        });
    })
    .catch(error => console.log(error));


app.get("/", (req, res) => {
    res.send("Server is up and running...");
});

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/client/RegisterUser.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/client/LoginUser.html');
});

app.get('/todo', (req, res) => {
    res.sendFile(__dirname + '/client/todo.html');
});

app.get('/todo/mytodos', (req, res) => {
    User.findOne( { username: data.username, email: data.email })   
    .then(existingUser => {
        const todos = existingUser.todos || [];
        existingUser.todos = todos;
        res.status(201).json({ todos: JSON.stringify(todos) });
    })
    .catch (error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred loading data' });
    });
});

 
app.post('/register', (req, res) => {
    const data = req.body;

    User.findOne( { email: data.email, password: data.password } )
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).json({ message: 'User with this email already exists' });
            }       
            else {
                const user = new User({
                    username: data.username,
                    email: data.email,
                    password: data.password
                });
                return user.save()
                    .then(result => {
                        res.status(201).json({ message: 'User registered successfully', user: result });
                    })
                    .catch(error => {
                        console.log(error);
                        res.status(500).json({ error: 'An error occurred while saving the user' });
                    });
            }
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while checking for existing user' });
    });
});


app.post('/login', (req, res) => {
    const data = req.body;

    User.findOne( { email: data.email, password: data.password } )
        .then(existingUser => {
            if (!existingUser) {
                return res.status(400).json({ message: "Wrong username or password" });
            }       
            else {
                res.status(201).json( {username: existingUser.username, todos: existingUser.todos} );
                const something = 1;
            }})
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: 'An error occurred while logging in' });  
    });
});


app.post('/todo/save', (req, res) => {

    const data = req.body;

    User.findOne( { username: data.username, email: data.email } )   
    .then(existingUser => {
        existingUser.todos = data.todos;
        existingUser.save();
        res.status(201).json({ message: 'Data saved successfully' });
    })
    .catch (error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while saving data' });
    });
});