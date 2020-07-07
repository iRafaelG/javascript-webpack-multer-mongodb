// import node modules
const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

// dotenv
if (process.env.NODE_ENV !== 'prod') {
    require('dotenv').config({ path: path.join(__dirname, 'configs/.env') });
}

// database
const db = require('./configs/db.config');

// initializations
const app = express();
db();

// settings
app.set('port', process.env.PORT || 3000);

const storage = multer.diskStorage({
    destination: path.join(__dirname, 'public/images'),
    filename(req, file, callback) {
        callback(null, new Date().getTime() + path.extname(file.originalname))
    }
})

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(multer({ storage }).single('image'));
app.use(cors());

if (process.env.NODE_ENV !== 'prod') {
    app.use(morgan('dev'));
}

// routes
app.use(require('./routes/home.router'));
app.use('/api', require('./routes/car.router'));

// statics files
app.use(express.static(path.join(__dirname, 'public')));

// server running
app.listen(app.get('port'), () => {
    console.log(`Server running in ${process.env.NODE_ENV} on port ${app.get('port')}`);
})