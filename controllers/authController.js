const User = require('../models/User');
const bcrypt = require('bcrypt')

exports.createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);

    res.status(201).redirect('/login');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body 
    const user = await User.findOne({ email })
     if (!user) { res.status(400).send("kullanici yok")}

    const same = await bcrypt.compare(password, user.password)
    
    req.session.userID = user._id
     if (same) { res.status(200).redirect('/')}
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    })
  }
}