import {Application} from "express-ws"
import path from "path"
import {findEveryPosts} from "../../repositories/postRepository"

export function getRoot(app: Application) {
  app.get('/', async (req, res) => {
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - 10) //Get the day, 5 days ago
    const posts = await findEveryPosts(startDate)
    res.render(path.join(__dirname, '../../../pages/home.ejs'), {posts: posts})
  })
}
