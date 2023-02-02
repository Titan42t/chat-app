import {Application} from "express-ws"
import path from 'path'
import {findUserById} from "../../repositories/userRepository"

export function getProfile(app: Application) {
    app.get('/profile', async (req, res) => {
        const user = await findUserById(req.signedCookies.ssid)
        if (!user) {
            res.status(404).send('Profil inconnu dans la base de données')
        }
        res.render(path.join(__dirname, '../../../pages/profile.ejs'), {user: user})
    })
}