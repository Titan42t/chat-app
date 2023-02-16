import expressWs, {Application} from "express-ws"
import express, {NextFunction, Request, Response} from "express"
import cookieParser from 'cookie-parser'
import path from 'path'
import {authenticationMiddleware} from "./middlewares/authenticationMiddleware"
import {getLogin} from "./routes/login/getLogin"
import {postLogin} from "./routes/login/postLogin"
import {getLogout} from "./routes/login/getLogout"
import {getRegister} from "./routes/register/getRegister"
import {postRegister} from "./routes/register/postRegister"
import {getWs} from "./routes/root/getWs"
import {getRoot} from "./routes/root/getRoot"
import {getProfile} from "./routes/profile/getProfile"
import {postProfile} from "./routes/profile/postProfile"
import {deleteProfile} from "./routes/profile/deleteProfile"
import {getChat} from "./routes/chat/getChat"
import {getWsChat} from "./routes/chat/getWsChat"

const SECRET_KEY = 'MySecretKeyIsAwesome'

function main() {
  const app = express() as unknown as Application
  expressWs(app)
  const sockets = new Map()

  app.set('view engine', 'ejs')
  app.use((req, res, next) => {
    console.log(new Date().toISOString(), req.method, req.path)
    next()
  })
  app.use(cookieParser(SECRET_KEY))
  app.use(express.static(path.join(__dirname, '../public')))

  getLogin(app)
  postLogin(app)
  getRegister(app)
  postRegister(app)

  app.use(authenticationMiddleware)
  getRoot(app)
  getLogout(app)
  getProfile(app)
  postProfile(app)
  deleteProfile(app)
  getChat(app)
  getWs(app, sockets)
  getWsChat(app, sockets)

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    res.status(500).send('Internal Server Error')
    next()
  })

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
  })
}

main()
