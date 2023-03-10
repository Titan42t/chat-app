import path from "path"
import {Application} from "express-ws"
import {findUserById} from "../../repositories/userRepository"

export function getChat(app: Application) {
  app.get('/chat', async (req, res) => {
    const user = await findUserById(req.signedCookies.ssid)
    if (!user) {
      res.clearCookie('ssid')
      res.redirect('/login')
      return
    }

    res.render(path.join(__dirname, '../../../pages/chat.ejs'))    
  })
}
