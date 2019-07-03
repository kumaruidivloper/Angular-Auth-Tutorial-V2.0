// const express = require('express');
// const jwt = require('jsonwebtoken');
// const router = express.Router();
// const User = require('../models/user');

// const mongoose = require('mongoose')
// const db = "mongodb+srv://kumar:kumar1234@cluster0-t6xml.mongodb.net/test?retryWrites=true"
// mongoose.connect(db, err => {
//     if(err) {
//         console.error('Error!' + err);
//     } else {
//         console.log('connected to mongodb')
//     }
// })


// function verifyToken(req, res, next) {
//     if (!req.headers.authorization) {
//         return res.status(401).send('Unauthorized request')
//     } 
//     let token = req.headers.authorization.split(' ')[1];
//     if (token === 'null') {
//         return res.status(401).send('Unauthorized request')
//     }
//     let payload = jwt.verify(token, 'secretKey')
//     if (!payload) {
//         return res.status(401).send('Unauthorized request')
//     }

//     req.userId = payload.subject
//     next()
// }

// router.get('/', (req, res)=> {
//     res.send('From API Route')
// })

// router.post('/register', (req, res) => {
//     let userData = req.body
//     let user = new User(userData)
//     user.save((error, registeredUser) => {
//         if(error) {
//             console.log(error);
//         } else {
//             let payload = { subject: registeredUser._id }
//             let token = jwt.sign(payload, 'secretKey')
//             res.status(200).send({token})
//         }
//     })
// })

// router.post('/login', (req, res) => {
//     let userData = req.body

//     User.findOne({email: userData.email}, (error, user) => {
//         if (error) {
//             console.log(error)
//         } else {
//             if(!user) {
//                 res.status(401).sent('Invalid Email')
//             } else if (user.password !== userData.password  ) {
//                 res.status(401).send('Invalid password')
//             } else {
//                 let payload = { subject: user._id }
//                 let token = jwt.sign(payload, 'secretkey')
//                 res.status(200).send({token})
//             }
//         }
//     })
// })


// router.get('/events', (req, res) => {
//     let events = [
//     {
//         "_id": "1",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "2",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "3",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "4",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "5",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "6",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     }
//     ]

//     res.json(events);
// })


// router.get('/special', verifyToken, (req, res) => {
//     let specialEvents = [
//     {
//         "_id": "1",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "2",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "3",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "4",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "5",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     },
//     {
//         "_id": "6",
//         "name": "Auto Expo",
//         "description": "lorem ipsum",
//         "date": "2012-04-23T18:25:43.511Z"
//     }
//     ]

//     res.json(specialEvents);
// })

// module.exports = router;


const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user');
const jwt = require('jsonwebtoken')
// const db = "mongodb://testuser:testpw@ds123136.mlab.com:23136/eventsdb";
const db = "mongodb+srv://kumar:kumar1234@cluster0-t6xml.mongodb.net/test?retryWrites=true"

// mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
    if(err){
        console.error('Error! ' + err)
    } else {
      console.log('Connected to mongodb')      
    }
});

// function verifyToken(req, res, next) {
//   if(!req.headers.authorization) {
//     return res.status(401).send('Unauthorized request')
//   }
//   let token = req.headers.authorization.split(' ')[1]
//   if(token === 'null') {
//     return res.status(401).send('Unauthorized request')    
//   }
//   let payload = jwt.verify(token, 'secretKey')
//   if(!payload) {
//     return res.status(401).send('Unauthorized request')    
//   }
//   req.userId = payload.subject
//   next()
// }

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
      return res.status(401).send('Unauthorized request')
  } 
  let token = req.headers.authorization.split(' ')[1]
  console.log(token);
  if (token === 'null') {
      return res.status(401).send('Unauthorized request')
  }
  jwt.verify(token, 'secretKey', function(err, payload) {
           if(err){
               return res.status(401).send('Unauthorized request')
           }else{
               req.userId = payload.subject
               next()       
          }    
        }); 
  //let payload = jwt.verify(token, 'secretKey');

  //console.log(payload);
  // try{
  //  let payload = jwt.verify(token, 'secretKey');
  // }catch(err) {  
  //   console.log('inside error');
  //   return res.status(401).send('Unauthorized request');
  // }
  //if(!payload) {
      //return res.status(401).send('Unauthorized request')
  //}
  //req.userId = payload.subject
  //next()
}

router.get('/events', (req,res) => {
  let events = [
    {
      "_id": "1",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(events)
})

router.get('/special', verifyToken, (req, res) => {
  let specialEvents = [
    {
      "_id": "1",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "2",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "3",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "4",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "5",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    },
    {
      "_id": "6",
      "name": "Auto Expo Special",
      "description": "lorem ipsum",
      "date": "2012-04-23T18:25:43.511Z"
    }
  ]
  res.json(specialEvents)
})

router.post('/register', (req, res) => {
  let userData = req.body
  let user = new User(userData)
  user.save((err, registeredUser) => {
    if (err) {
      console.log(err)      
    } else {
      let payload = {subject: registeredUser._id}
      let token = jwt.sign(payload, 'secretKey')
      res.status(200).send({token})
    }
  })
})

router.post('/login', (req, res) => {
  let userData = req.body
  User.findOne({email: userData.email}, (err, user) => {
    if (err) {
      console.log(err)    
    } else {
      if (!user) {
        res.status(401).send('Invalid Email')
      } else 
      if ( user.password !== userData.password) {
        res.status(401).send('Invalid Password')
      } else {
        let payload = {subject: user._id}
        let token = jwt.sign(payload, 'secretKey')
        res.status(200).send({token})
      }
    }
  })
})

module.exports = router;