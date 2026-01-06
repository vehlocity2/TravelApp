const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// const { uploadToCloudinary } = require('./utils/cloudinary'); // your helper
const Post = require('./Models/PostModel');
const Trip = require('./Models/TripsModel');
const User = require('./Models/UserModel');
const { uploadToCloudinary } = require('./Controller/config/Cloudinary');

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(err));

async function migrateImages() {
  // -------- POSTS ----------
  const posts = await Post.find({});
  for (let post of posts) {
    const newImages = [];
    for (let img of post.images) {
      if (img.startsWith('http')) {
        newImages.push(img); // skip if already a URL
        continue;
      }
      const filePath = path.join(__dirname, 'upload', img);
      if (fs.existsSync(filePath)) {
        const buffer = fs.readFileSync(filePath);
        const url = await uploadToCloudinary(buffer);
        newImages.push(url);
        console.log(`Post image uploaded: ${img}`);
      }
    }
    post.images = newImages;
    await post.save();
  }

  // -------- TRIPS ----------
  const trips = await Trip.find({});
  for (let trip of trips) {
    const newImages = [];
    for (let img of trip.images) {
      if (img.startsWith('http')) {
        newImages.push(img);
        continue;
      }
      const filePath = path.join(__dirname, 'upload', img);
      if (fs.existsSync(filePath)) {
        const buffer = fs.readFileSync(filePath);
        const url = await uploadToCloudinary(buffer);
        newImages.push(url);
        console.log(`Trip image uploaded: ${img}`);
      }
    }
    trip.images = newImages;
    await trip.save();
  }

  // -------- USERS ----------
  const users = await User.find({});
  for (let user of users) {
    if (user.image && !user.image.startsWith('http')) {
      const filePath = path.join(__dirname, 'upload', user.image);
      if (fs.existsSync(filePath)) {
        const buffer = fs.readFileSync(filePath);
        const url = await uploadToCloudinary(buffer);
        user.image = url;
        await user.save();
        console.log(`User image uploaded: ${user._id}`);
      }
    }
  }

  console.log('All images migrated!');
  process.exit(0);
}

migrateImages();
