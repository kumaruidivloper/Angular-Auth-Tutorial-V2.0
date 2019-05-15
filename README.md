# NgLoginApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.0.

## Devlelopment Steps

MongoDB Username Details
Username: kumaruidec
Password: $Kumar3861 <--
Username: kumariu
Password: $Kumar4321 <--

bootstrap Login: https://bootsnipp.com/snippets/GaZG0
ng new <AppName> --style=scss --routing

Install BootStrap
Step1: npm install bootstrap --save
Step2: Open angular.json
"styles": [
  "src/styles.scss",
  "node_modules/bootstrap/dist/css/bootstrap.min.css"
],

Step1: Create Server Folder
Step2: Inside the server folder run [npm init --yes] This command create package.json file inside the server folder
Step3: Install dependency cmd [npm install express body-parser --save] 
Express is a web-server,
body parser is middelware to handle form data such us handle form data / login form
Step4: Create server.js file
Step5: Past Below code:
const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000

const app = express();

app.use(bodyParser.json())

app.get('/',  function(req, res){
    res.send('Hello from server')
})

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT);
})

Step6: run server [node server]

Step7: Create routes folder inside the server folder then routes --> api.json then create api.json inside routes folder

Step8: Past Below code in api.json file

const express = require('express');
const router = express.Router();

router.get('/', (req, res)=> {
    res.send('From API Route')
})

module.exports = router;

Step9: Tell our server use this route go-back to server
add below code in server.js
const api = require('./routes/api')

app.use('/api', api);
Paste Above this method
app.get('/',  function(req, res){
    res.send('Hello from server')
})

Step10: Restart the node server then open http://localhost:3000/api

Step11: Create DB in MongoDB
Step12: open [mongoosejs.com]
Step13: install inside server folder [npm install --save mongoose]
Step14: create models folder inside server with in the modal folder create user.js file
Step15: Past below code in user.js

const mongoose = require('mongoose');

const Schema = mongoose.Schema
const userSchema = new Schema({
    email: String,
    password: String
})

module.exports = mongoose.model('user', userSchema, 'users')

Step16: All the database request managed by in the api-route so the database connection happen in api.js
Step17: Past below code in api.js file
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose')
const db = "mongodb+srv://kumar:kumar1234@cluster0-t6xml.mongodb.net/test?retryWrites=true"
mongoose.connect(db, err => {
    if(err) {
        console.error('Error!' + err);
    } else {
        console.log('connected to mongodb')
    }
})

router.get('/', (req, res)=> {
    res.send('From API Route')
})

module.exports = router;


Step18: Register new user routes in api.js file Past below code
const express = require('express');
const router = express.Router();
const user = require('../models/user');

const mongoose = require('mongoose')
const db = "mongodb+srv://kumar:kumar1234@cluster0-t6xml.mongodb.net/test?retryWrites=true"
mongoose.connect(db, err => {
    if(err) {
        console.error('Error!' + err);
    } else {
        console.log('connected to mongodb')
    }
})

router.get('/', (req, res)=> {
    res.send('From API Route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

module.exports = router;


Step19: Create Login API  past below code api.json

const express = require('express');
const router = express.Router();
const user = require('../models/user');

const mongoose = require('mongoose')
const db = "mongodb+srv://kumar:kumar1234@cluster0-t6xml.mongodb.net/test?retryWrites=true"
mongoose.connect(db, err => {
    if(err) {
        console.error('Error!' + err);
    } else {
        console.log('connected to mongodb')
    }
})

router.get('/', (req, res)=> {
    res.send('From API Route')
})

router.post('/register', (req, res) => {
    let userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser) => {
        if(error) {
            console.log(error);
        } else {
            res.status(200).send(registeredUser)
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if (error) {
            console.log(error)
        } else {
            if(!user) {
                res.status(401).sent('Invalid Email')
            } else if (user.password !== userData.password  ) {
                res.status(401).send('Invalid password')
            } else {
                res.status(200).send(user)
            }
        }
    })
})

module.exports = router;


Step20: CORS install [npm install --save cors]
Past below code in server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000
const api = require('./routes/api')
const app = express();
app.use(cors());

app.use(bodyParser.json())


app.use('/api', api);
app.get('/',  function(req, res){
    res.send('Hello from server')
})

app.listen(PORT, function(){
    console.log('Server running on localhost:' + PORT);
})

Step21: Install JWT Token Package inside server folder [npm install jsonwebtoken --save]

Step22: Create Guard [ng g guard auth]

Step23: Create interceptor [ng g s token-interceptor]


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
