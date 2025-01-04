import express from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import { URL } from './models/url.models.js'

import urlRoute from './routes/url.routes.js'
import staticRoute from './routes/staticRoutes.js'
import userRoute from './routes/userRoutes.js'
// import {restrictToLoggedinUserOnly, checkAuth} from './middlewares/auth.middleware.js'
import {checkForAuthentication, restrictTo} from './middlewares/auth.middleware.js'


const app = express()

app.set('view engine', 'ejs')
app.set('views', path.resolve('src/views'))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(checkForAuthentication)

app.get('/test', async (req, res) => {
    const allUrls = await URL.find({});
    return res.render("home", {
        urls: allUrls
    })
})

app.use('/url', restrictTo(['NORMAL', 'ADMIN']), urlRoute)
app.use('/user', userRoute)
app.use('/', staticRoute)


// app.use('/url', restrictToLoggedinUserOnly, urlRoute)
// app.use('/user', userRoute)
// app.use('/', checkAuth, staticRoute)


export default app;