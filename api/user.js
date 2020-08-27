import jwt from 'jsonwebtoken'

export default async({req, res}) => {
    try {
        const user = {}
        const token = req.headers.authorization
        const decoded = jwt.verify(token, 'bigBrother')
        if (!decoded) {
            res.statusCode = 403
            res.end("No, hacker, no cry")
            return
        }
        res.end(JSON.stringify(user))
    } catch(e) {
        console.error("\nUser handling error: ", e)
    }
}