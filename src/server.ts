import expressWs, {Application} from "express-ws"
import express, {Request, Response, NextFunction} from "express"
import cookieParser from 'cookie-parser'
import path from 'path'
import {getLogin} from "./routes/login/getLogin"
import {postLogin} from "./routes/login/postLogin"
import {getRegister} from "./routes/register/getRegister"
import {postRegister} from "./routes/register/postRegister"
import {getRoot} from "./routes/getRoot"
import {getChat} from "./routes/chat/getChat"
import {getWs} from "./routes/getWs"
import {authenticationMiddleware} from "./middlewares/authenticationMiddleware"
import { getLogout } from "./routes/login/getLogout"

const SECRET_KEY = 'MySecretKeyIsAwesome'

function main() {
  const app = express() as unknown as Application
  expressWs(app)
  const sockets = new Map()

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
  getChat(app)
  getWs(app, sockets)

  app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    res.status(500).send('Internal Server Error')
  })

  app.listen(3000, () => {
    console.log('Example app listening on port 3000!')
  })
}

main()
