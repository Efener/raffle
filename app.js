const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user.model');
app.use(bodyParser.json());

mongoose.connect("mongodb://127.0.0.1/my-database",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('DB connection is set.')
  });

  const userDataArray = [];
app.set('view engine', 'twig');

app.get("/",(req,res,next)=> {

res.render("index1");
}    )

app.get("/efener",(req,res,next)=>
{
    res.render("menu");
} )



app.get("/api/get-array", async(req, res, next) => {
  let userDataArray = await User.find();
  res.json({ data: userDataArray });
});


app.post("/api/saveUserData", (req, res, next) => {
  const userData = req.body;

  const newUser = new User({
    name: userData.name,
    number: userData.schoolNumber
  });

  newUser.save()
    .then(() => {
      res.json({ message: 'Bilgiler başarıyla kaydedildi.' });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ message: 'Bir hata oluştu, veri kaydedilemedi.' });
    });
});






const PORT = 80;

app.listen(PORT, () => {

console.log(`App is running on ${PORT}`);


})