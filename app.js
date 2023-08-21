require('./config/db')

const express = require('express')
const app = express()
const port = 3000
const path = require('path')

//mongodg user model
const User = require('./models/user')


//Password Handler 
const bcrypt = require('bcrypt')
const { error } = require('console')
const bodyParser = require('express').json;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static(path.join(__dirname, "/public")));
app.use(bodyParser());

app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (name === "" || email === "" || password === "") {
      throw new Error("Please fill all inputs");
    } else if (name.length < 8) {
      throw new Error("Name should contain more than 8 characters");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      throw new Error("Invalid email entered");
    } else if (password.length < 8) {
      throw new Error("Password is too short");
    } else {
      // Checking if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User with the provided email already exists");
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });

      // Save the new user
      await newUser.save();

      res.json({
        status: "SUCCESS",
        message: "User account created successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({
      status: "FAILED",
      message: error.message,
    });
  }
});

  app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        throw new Error("Please provide both email and password");
      }

      const user = await User.findOne({ email });

      if (!user) {
        throw new Error("Invalid credentials");
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      res.redirect("./public/home.html");
    } catch (error) {
      console.error(error);
      res.status(400).json({
        status: "FAILED",
        message: error.message,
      });
    }
  });



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