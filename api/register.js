import {create} from '../db'

export async function reg(req, res) {
    try {
        const user = req.body
        const createUser = await create('User', user)

        if (!createUser) throw new Error(`Error create ${user.name}`)
        res.setHeader('user', JSON.stringify({id: createUser._id, name: createUser.name, email: createUser.email}))
        res.end()

    } catch (e) {
        console.error(e)
        res
            .writeHead(500, {
                'Error': e.message
            })
            .end(`<h1>Error 500</h1><h3>${e.message}</h3>`)
        
    }
}