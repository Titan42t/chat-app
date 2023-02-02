import bodyParser from "body-parser"
import {Application} from "express-ws"
import path from 'path'
import {findUserById, updateUser} from "../../repositories/userRepository"

export function postProfile(app: Application) {
    app.post('/profile', bodyParser.urlencoded(), async (req, res) => {
        const user = await findUserById(req.signedCookies.ssid)
        if (!user) {
            res.status(404).send('Profil inconnu dans la base de données')
        }
        try {
            const email = req.body.email
            const name = req.body.name
            const newUser = await updateUser(req.signedCookies.ssid, email, name)
            res.render(path.join(__dirname, '../../../pages/profile.ejs'), {user: newUser, message: 'Profil enregistré'})
        } catch (e) {
            console.error(e)
            res.status(500).send('Internal Server Error')
        }
    })
}