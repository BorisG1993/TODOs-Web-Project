# TODO App Usage


Install npm express, mongoose and body-parser\n
Start server (http://localhost:3000 by default)\n
Go to /register to register a user\n
Go to /login to login\n
Upon login you will be navigated to /todo where you manage tour TODOs\n

Registration restrictions:
- if current user logged in on session, first logout before registering.
- password should be at least 8 characters

Login restrictions:
- if current user logged in on session, first logout before logging in again.