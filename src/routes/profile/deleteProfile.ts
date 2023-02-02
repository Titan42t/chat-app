import {Application} from "express-ws"
import {findUserById, deleteUser} from "../../repositories/userRepository"

export function deleteProfile(app: Application) {
    app.get('/deleteProfile', async (req, res) => {
        const user = await findUserById(req.signedCookies.ssid)
        if (!user) {
            res.status(404).send('Profil inconnu dans la base de données')
        }
        try {
            const deletedUser = await deleteUser(req.signedCookies.ssid)
            res.clearCookie('ssid')
            res.redirect('/login')
        } catch (e) {
            console.error(e)
            res.status(500).send('Internal Server Error')
        }
    })
}