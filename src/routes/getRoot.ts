import path from "path"
import {Application} from "express-ws"
import {findUserById} from "../repositories/userRepository"

export function getRoot(app: Application) {
  app.get('/', async (req, res) => {
    res.status(500).send('Cette page n\'existe pas encore')   
  })
}
