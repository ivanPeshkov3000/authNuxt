import mongoose from 'mongoose'

export default mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    photo: [Buffer]
})