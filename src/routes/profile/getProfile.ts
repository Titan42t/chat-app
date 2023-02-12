import {Application} from "express-ws"
import path from 'path'
import {findEveryPostsByUser} from "../../repositories/postRepository"
import {findUserById} from "../../repositories/userRepository"

export function getProfile(app: Application) {
    app.get('/profile', async (req, res) => {
        const user = await findUserById(req.signedCookies.ssid)
        let posts = null
        if (!user) {
            res.status(404).send('Profil inconnu dans la base de données')
        } else {
            posts = await findEveryPostsByUser(user.id)
        }
        res.render(path.join(__dirname, '../../../pages/profile.ejs'), {user: user, posts: posts})
    })
}