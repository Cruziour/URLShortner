import { v4 as uuidv4 } from 'uuid'
import { User } from "../models/user.models.js";
import { setUser } from '../utils/auth.js';

const handleUserSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email, 
        password
    })
    return res.redirect('/')
}

const handleUserLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({email, password})

    if(!user) return res.render('login', {
        error: "Invalid Username or Password"
    })
 
    // statefull auth 
    // const sessionId = uuidv4()
    // setUser(sessionId, user)
    // res.cookie('uid', sessionId)
    // return res.redirect('/')

    // stateless auth 
    // const token = setUser(user)
    // res.cookie('uid', token)
    // return res.redirect('/')

    const token = setUser(user)
    res.cookie('token', token)
    return res.redirect('/')
}

export {
    handleUserSignUp,
    handleUserLogin
}