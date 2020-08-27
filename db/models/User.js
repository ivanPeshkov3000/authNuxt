import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function (text) {
            return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(text);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
          type: String,
          required: true
    },
    photo: Buffer
})

export default mongoose.model('User', userSchema)