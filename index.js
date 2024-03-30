const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('./configs/mongoose');
const logins = require('./models/login');
const users = require('./models/userSchema');
const comments = require('./models/comments');
const posts = require('./models/postSchema');
const bcrypt = require('bcrypt');

const port = 7000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));


app.get('/', (req, res) => {
    console.log("hitted the /");
    res.render('login', { title: 'Login or Register' });
  });

  app.get('/home', async function(req,res){
    try{
        res.render('home');
    }
    catch(err){

    }
  });

  app.get('/comment',async function(req,res){
        try{
            const userid="652e1139d65f93e1b229a15d";
            const postid="652e79f0aee6cc6825c37f71";
            const user = await logins.findOne({_id: userid});
            const tapPost = await posts.findOne({ _id: postid });
            const com = await comments.find({userId: userid, postId: postid} );
            res.render('post',{
                com,tapPost,user
            })
        }
        catch(err){
            console.log(err);
        }
  })
  
  app.post('/add-comment', async (req, res) => {
    try {
      // Get the data from the form input fields
      const { userID, postID, text } = req.body;
  
      // Assuming you have a 'comments' model
      const comment = new comments({ userID, postID, text });
  
      // Save the comment to the database
      await comment.save();
  
      res.redirect(`/post/${postID}`); // Redirect to the post page after adding the comment
    } catch (err) {
      console.error(err);
      res.status(500).send('Error adding comment');
    }
  });
  

  app.post('/signup', async function(req, res){
   try{
    console.log("hitted the .signup");
    const { register_Name, register_email, register_password } = req.body;
    const hashedPassword = await bcrypt.hash(register_password, 10); 
    const user = new logins({ name: register_Name, email: register_email, password: hashedPassword });
     await user.save();
    res.render('/login');
   }
   catch(err){
    console.log(err);
   }

    });
  
  
  app.post('/signin', async  function(req, res) {
    
    try {
        console.log("hitted the .signin");
        const { login_email, login_password } = req.body;
        const user = await logins.findOne({ email: login_email });
        console.log(user.email);
        if (user) {
            const isPasswordValid = await bcrypt.compare(login_password, user.password);
            console.log(isPasswordValid);
            if (isPasswordValid) {
                userEmail = login_email;
                res.redirect('/home');
            } else {
                res.render('login', {
                    title: "Error: Incorrect password"
                });
            }
        } else {
            res.render('login', {
                title: "Error: User not found"
            });
        }
    } catch (error) {
        console.error("Error during login: ", error);
        res.redirect('/login');
    }
  });
  
app.listen(port, function(err) {
    if (err) {
        console.log("We have an error on loading server: ", err);
    }
    console.log("The server is working on port:", port);
    console.log("localhost:9009");
});
