
export const users = []

export async function reg(req, res) {
    try {
        const user = req.body

        users.push({...user})
        res.setHeader('user', JSON.stringify({username: user.username, email: user.email}))
        res.end()

    } catch (e) {
        console.error(e)
    }
}