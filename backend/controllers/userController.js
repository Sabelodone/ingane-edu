const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register user
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await User.create({ name, email, password: hashedPassword });

  if (newUser) {
    const token = jwt.sign({ id: newUser._id }, 'secret', { expiresIn: '30d' });
    res.json({ _id: newUser._id, name: newUser.name, email: newUser.email, token });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '30d' });
    res.json({ _id: user._id, name: user.name, email: user.email, token });
  } else {
    res.status(400).json({ message: 'Invalid credentials' });
  }
};

// Get user profile
exports.getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    res.json({ _id: user._id, name: user.name, email: user.email, profilePicture: user.profilePicture });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    if (req.file) {
      user.profilePicture = req.file.path;
    }

    const updatedUser = await user.save();
    res.json({ _id: updatedUser._id, name: updatedUser.name, email: updatedUser.email, profilePicture: updatedUser.profilePicture });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
};
