import mongoose from 'mongoose'

export default () => {
    const userSchema = mongoose.Schema({
        _id: {
            mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true
        },
        userName: {
            String,
            required: true
        },
        email: {
            String,
            required: true,
            validate: {
                validator: function (text) {
                return text.indexOf('https://www.linkedin.com/') === 0;
                },
                message: ''
            }
        },
      password: {
            type: String,
            required: true
      },
      photo: Buffer,
    });
    try {
        mongoose.connect('mongodb://localhost/users');
    }
}



user.save()
  .then(function (doc) {
    console.log("Сохранен объект", doc);
    mongoose.disconnect(); // отключение от базы данных
  })
  .catch(function (err) {
    console.log(err);
    mongoose.disconnect();
  });