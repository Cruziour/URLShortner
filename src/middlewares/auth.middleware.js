import { getUser } from "../utils/auth.js";

const checkForAuthentication = (req, res, next) => {
    const tokenCookie = req.cookies?.token;
    req.user = null
    if (!tokenCookie) {
        return next()
    }
    
    const token = tokenCookie;
    const user = getUser(token)
    req.user = user 
    return next()
}

const restrictTo = (roles = []) => {
    return (req, res, next) => {
        if(!req.user) return res.redirect('/login')
        
        if(!roles.includes(req.user.role)) return res.end('UnAuthorized')

        return next()
    }
}

export {
    checkForAuthentication,
    restrictTo
}




// import { getUser } from "../utils/auth.js";

// const restrictToLoggedinUserOnly = (req, res, next) => {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization']

//     if(!userUid) return res.redirect('/login')
    
//     const token = userUid.split('Bearer ')[1];

//     // const user = getUser(userUid)
//     const user = getUser(token)

//     if(!user) return res.redirect('/login')
    
//     req.user = user
//     next()
// }

// const checkAuth = async(req, res, next) => {
//     // const userUid = req.cookies?.uid;
//     const userUid = req.headers['authorization']
//     const token = userUid.split('Bearer ')[1];
//     // const user = getUser(userUid)
//     const user = getUser(token)

//     req.user = user
//     next()
// } 

// export {
//     restrictToLoggedinUserOnly,
//     checkAuth,
// }