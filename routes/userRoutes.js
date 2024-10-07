const express = require("express");
const router = express.Router();
const connectEnsureLogin = require("connect-ensure-login");

const signup = require("../models/signup");

// all users
router.get("/all-users-page", connectEnsureLogin.ensureLoggedIn(), async (req, res) => {
  try {
    if (req.session.user.role === "manager") { // ensure that only managers access all-users page
      const allUsers = await signup.find().sort({ $natural: -1 });
      res.render("all-users", {
        users: allUsers,
      });
    }else {
      res.send("Only Managers are allowed to access this page")
    }
  } catch (error) {
    res.status(400).send("Unable to find users in your database", error);
  }
});

// update user
router.get("/update-user-page/:id", async (req, res) => {
  try {
    const dbUser = await signup.findOne({ _id: req.params.id });
    res.render("update-user", {
      user: dbUser,
    });
  } catch (err) {
    res.status(400).send("Unable to find user in the database");
  }
});

router.post("/update-user-page", async (req, res) => {
  try {
    await signup.findOneAndUpdate({ _id: req.query.id }, req.body);
    res.redirect("/all-users-page");
  } catch (err) {
    res.status(404).send("Unable to update user in the database");
  }
});

// delete User
router.post("/delete-user", async (req, res) => {
  try {
    await signup.deleteOne({ _id: req.body.id });
    res.redirect("back");
  } catch (err) {
    res.status(400).send("Unable to delete user in the database");
  }
});

module.exports = router;













// Explanation:
// router.get("/all-users", async (req, res) => { ... })
// This sets up a route that listens for GET requests to the /all-users URL.
// When a client sends a GET request to /all-users, this function will be executed.

// async (req, res)
// The route handler function is declared as async, allowing the use of await inside it. This is important for handling asynchronous operations like database queries.

// const allUsers = await Signup.find();
// Signup.find() is a Mongoose method that queries the Signup collection in the MongoDB database to retrieve all documents (users).
// The await keyword ensures that the code waits for the database query to complete before continuing, allowing for synchronous-like code flow in an asynchronous environment.

// res.render("all-users", { users: allUsers });
// After successfully retrieving the users from the database, the res.render() method is called to render the all-users view (which would be a .pug or other templating engine file).
// The users: allUsers part passes the array of user data (allUsers) to the view under the variable name users, allowing the view to dynamically display the user data.

// } catch (error) { ... }
// This catch block handles any errors that occur during the execution of the code inside the try block.
// If an error occurs, the server responds with a status code of 400 (Bad Request) and sends an error message back to the client with res.status(400).send("Unable to find users in your database", error);.
