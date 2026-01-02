const bcrypt = require('bcrypt')
const Auth = require('../Models/AuthModel')
const User = require('../Models/UserModel')
const jwt = require('jsonwebtoken')


const Signup = async(req, res)=>{
    const {bio, gender, age, name, email, password} = req.body
    if(!bio || !gender || !age || !name || !email || !password){
        return res.status(404).json({message: "All fields are required"})
    }
    const existingUser = await Auth.findOne({email})
    if(existingUser){
        return res.status(404).json({message: "User already exists"})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
   try {
     const user = new User({
        name, age, gender, bio
    })
    const savedUser = await user.save()
    const userId = savedUser._id
    const AuthUser = new Auth({
        userId,
        email,
        password : hashedPassword,
        isAdmin: false
    })
    await AuthUser.save()
    res.status(201).json({message:"User created successfully", savedUser})
   } catch (err){
        res.status(500).json({message: err.message})
   }
}

const AdminSignUp = async(req, res)=>{
    const {bio, gender, age, name, email, password} = req.body
    if(!bio || !gender || !age || !name || !email || !password){
        return res.status(404).json({message: "All fields are required"})
    }
    const existingUser = await Auth.findOne({email})
    if(existingUser){
        return res.status(404).json({message: "User already exist "})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    try {
        const user = new User({
            bio, gender, age, name
        })
        const savedUser = await user.save()
        const userId = savedUser._id
        const AuthUser = new Auth({
            userId,
            email,
            password: hashedPassword,
            isAdmin: true
        })
        await AuthUser.save()
        res.status(201).json({message: "Admin created successfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const SignIn = async(req, res)=>{
    const { email, password } = req.body
    if(!email || !password){
        return res.status(404).json({message: "All fields are required"})
    }
    const user = await Auth.findOne({email})
    if(!user){
        return res.status(404).json({message: "User not found"})
    }
    console.log("auth own id", user._id)
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(404).json({message: "Email or Password incorrect"})
    }
    const payload ={
        userId : user.userId,
        isAdmin: user.isAdmin,
        email: user.email
    }
    console.log("user credentials", payload)
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "1hr"})
    res.status(200).json({message: "Login successful", token, user:payload})
}

const getCurrentUser = async(req, res)=>{
    const userId = req.user.userId
    try {
        const user = await User.findById(userId).select('-__v').populate('auths', 'email isAdmin').populate('auths', 'email isAdmin').populate({path:"followers", select:"name image bio", populate: {path: 'auths', select: 'email'}}).populate({path:"following", select:"name image bio", populate: {path: 'auths', select: 'email'}})
        if(!user){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json({message: "User retrieved successfully", user})
    } catch (error) {
        console.error('Error getting user:', error)
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    Signup, AdminSignUp, SignIn, getCurrentUser
}