import { URL } from '../models/url.models.js'

const handleServerSideRendering = async (req, res) => {
    if(!req.user) return res.redirect('/login')
    try {
        const allURL = await URL.find({ createdBy: req.user._id })
        if(!allURL) {
            return res.status(404).json({ error: "No URLs found." });
        }
        return res.status(200).render('home', {
            urls: allURL
        })
    } catch (error) {
        return res.status(500).json({
            error: 'Server error in static router'
        })
    }
}

const handleSignupRender = (req, res) => {
    return res.render('signup')
}
const handleLoginRender = (req, res) => {
    return res.render('login')
}

export {
    handleServerSideRendering,
    handleSignupRender,
    handleLoginRender
}