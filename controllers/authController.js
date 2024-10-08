const bcrypt = require('bcrypt')
const {validationResult} = require('express-validator');
const User = require('../models/User');
const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).redirect('/login');
  } catch (error) {
    const result = validationResult(req);
    console.log(result)
    console.log(result.array()[0].msg)
    for(let i = 0 ; i < result.array().length ; i++) {
      req.flash("error", `${result.array()[i].msg}`);
    }
    res.status(400).redirect('/register'); 
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body 
    const user = await User.findOne({ email })
    const same = await bcrypt.compare(password, user.password)
    
    if (same) { 
      req.session.userID = user._id
      res.status(200).redirect('/users/dashboard')
    }else {
      req.flash("error", "Your password is not correct");
      res.status(400).redirect('/login')
    }
  } catch (error) {
    req.flash("error", "User is not exist");
    res.status(400).redirect('/login')
  }
}

exports.logoutUser = (req, res) => {
  req.session.destroy(()=> {
    res.redirect('/');
  })
}

exports.getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id:req.session.userID}).populate('courses')
  const categories = await Category.find()
  const courses = await Course.find({user:req.session.userID})
  const users = await User.find()
  res.render("dashboard", {
      page_name: "dashboard",
      user,
      categories,
      courses,
      users
  })
}

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    await Course.deleteMany({ user: req.params.id });
    req.flash("error", `${user.name} user has been removed successfully.`);
    res.status(200).redirect("/users/dashboard");
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error,
    });
  }
};