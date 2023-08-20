require('./config/db')

const express = require('express')
const app = express()
const port = 3000
const path = require('path')

//mongodg user model
const User = require('./models/user')


//Password Handler 
const bcrypt = require('bcrypt')
const bodyParser = require('express').json;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, "/public")));
app.use(bodyParser());

app.post("/signup",  (req, res) => {

    console.log(req.body)

    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;

    name = name.trim()
    email = email.trim()
    password = password.trim()

    if (name == "" || email == "" || password == "") {
      res.json({
        status: "FAILED",
        message: "Empty input fields!",
      });
    } else if (!/^[a-zA-Z]*$/.test(name)) {
      res.json({
        status: "FAILED",
        message: "Invalid Name Entered!",
      });
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res.json({
        status: "FAILED",
        message: "Invalid email Entered!",
      });
    } else if (password.length < 8) {
      res.json({
        status: "FAILED",
        message: "Password is too short",
      });
    } else {
      //checking ig user already exist
      User.find({ email })
        .then((result) => {
          if (result.length) {
            //A user already exist
            res.json({
              status: "Failed",
              message: "User with the provided email already exists",
            });
          } else {
            // Try to create new user

            //password handling
            const saltRounds = 10;
            bcrypt
              .hash(password, saltRounds)
              .then((hashedPassword) => {
                const newUser = new User({
                  name,
                  email,
                  password: hashedPassword,
                });

                newUser
                  .save()
                  .then((result) => {
                    // res.json({
                    //   status: "SUCCESS",
                    //   message: "signup successful",
                    //   data: result,
                    // });
                    res.redirect('./public/login.html')
                  })
                  .catch((err) => {
                    res.json({
                      status: "FAILED",
                      message: "An error occurred while saving user account!",
                    });
                  });
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "An error occurred while hashing password!",
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
          res.join({
            status: "FAILED",
            message: "An error occured while checking for existing user!",
          });
        });
    }
});


app.post('/login', (req, res) => {

    console.log(req.body)

    let email = req.body.email;
    let password = req.body.password;

    email = email.trim();
    password = password.trim();

    if (email == "" || password == "") {
      res.json({
        status: "FAILED",
        message: "Empty credentials supplied",
      });
    } else {
      ///check if user exist
      User.find({ email })
        .then((data) => {
          if (data.length) {
            //user exists

            const hashedPassword = data[0].password;
            bcrypt
              .compare(password, hashedPassword)
              .then((result) => {
                if (result) {
                  //password match
                  res.redirect("./public/home.html");
                } else {
                  res.join({
                    status: "FAILED",
                    mesaage: "Invalid password entered",
                  });
                }
              })
              .catch((err) => {
                res.json({
                  status: "FAILED",
                  message: "An error occurred while comparing passwords",
                });
              });
          } else {
            res.json({
              status: "FAILED",
              message: "Invalid credentials ",
            });
          }
        })
        .catch((err) => {
          res.json({
            status: "FAILED",
            message: "An error occurred while checking for existing user",
          });
        });
    }

})


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, './public/signup.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, './public/login.html'))
})

app.listen(port, () => {
    console.log(`server is running on localhost:${port}`)
})