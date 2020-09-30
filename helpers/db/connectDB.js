const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
        .then(() => {
            console.log('DB Bağlantısı Başarılı');
        }).catch((err) => {
        console.log('Hata: ', err);
    });
};

module.exports = connectDB;