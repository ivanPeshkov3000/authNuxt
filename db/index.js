import mongoose from 'mongoose'
const DBuri = process.env.DBuri
// mongoose.connect(DBuri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })
async function waitConnection() {
    mongoose.connection.readyState == 1 ? () => undefined :
    mongoose.connection.readyState == 2 ? await new Promise((resolve) => (mongoose.connection.on('connected', () => resolve(undefined)))) :
    await mongoose.connect(DBuri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
}

mongoose.connection.on('connected', () => {
    console.log(`DB:: Mongoose connected to ${DBuri}`)
})
mongoose.connection.on('error', () => {
    console.error(`DB:: Mongoose connected error to ${DBuri}`)
})
mongoose.connection.on('disconnected', () => {
    console.log('DB:: Mongoose disconnected')
})


export async function create(entity, {...data}) {
    if ( !entity || typeof entity != "string") throw new Error("Имя сущности должно быть строкой!")
    if ( !data ) throw new Error("Не переданы параметры")
    await waitConnection()
    try {
        let {default: Model} = await import(`./models/${entity}`)
        Model ? null : Model = mongoose.model(entity)
        const Entity = new Model({_id: new mongoose.Types.ObjectId(), ...data})
        const ent = await Entity.save()
        console.log("Сохранен объект: ", ent)
        mongoose.disconnect()
        
        return ent
    } catch (e) {
        console.error(`on create\n${e}`)
        mongoose.disconnect()
        throw e
    }
}

export async function readOne(entity, params) {
    if (typeof entity != "string") throw new Error("Имя сущности должно быть строкой!")
    await waitConnection()
    try {
        console.log("Find %o", params)
        let {default: Model} = await import(`./models/${entity}`)
        Model ? null : Model = mongoose.model(entity)
        
        return await Model
                        .findOne(params)
                        .exec()

    } catch (e) {
        console.error(e)
        mongoose.disconnect()
        throw e
    }
}

export async function read(entity, params) {
    if (typeof entity != "string") throw new Error("Имя сущности должно быть строкой!")
    await waitConnection()
    try {
        let {default: Model} = await import(`./models/${entity}`)
        Model ? null : Model = mongoose.model(entity)
        
        return await Model
                        .find(params)
                        .exec()
    } catch (e) {
        console.error(e)
        mongoose.disconnect()
        throw e
    }
}

// export async function update(value, property) {
//     return property(value)
// }

// export async function delete(property, entity) {
//     return entity(property)
// }
