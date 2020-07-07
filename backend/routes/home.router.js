// import node modules
const { Router } = require('express');
const path = require('path')

// initializations
const router = Router();

// routes
router.route('/')
    .get((req, res) => {
        res.sendFile('index.html', { root: path.resolve(__dirname, '../public') });
    });

module.exports = router;