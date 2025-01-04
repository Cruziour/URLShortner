// const sessionIdToUserMap = new Map()

// const setUser = (id, user) => {
//     sessionIdToUserMap.set(id, user)
// }

// const getUser = (id) => {
//     return sessionIdToUserMap.get(id)
// }

// export {
//     setUser,
//     getUser
// }

import jwt from 'jsonwebtoken'

const setUser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        role: user.role
    }
    return jwt.sign(payload, process.env.SECRET_KEY)
}

const getUser = (token) => {
    if(!token) return null;
    try {
        return jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        return null
    }
}

export {
    setUser,
    getUser
}