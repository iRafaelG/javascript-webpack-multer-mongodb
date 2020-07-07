// import node modules
const mongoose = require('mongoose');

// connect
module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`Database running on ${process.env.MONGO_URI}`);
    } catch (error) {
        console.log(error);
        console.log(`Something goes wrong...`);
    };
}