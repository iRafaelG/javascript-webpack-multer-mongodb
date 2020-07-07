// import node modules
const { Router } = require('express');
const { unlink } = require('fs-extra');
const path = require('path');

// initializations
const router = Router();

// import models
const CocheModelo = require('../models/Coche');

// routes
router.route('/cars')
    .get(async (req, res) => {
        let cars = await CocheModelo.find();
        res.json(cars);
    })
    .post(async (req, res) => {
        let { marca, modelo, matricula } = req.body;
        let foto = '/images/' + req.file.filename;
        let newCar = CocheModelo({
            marca,
            modelo,
            matricula,
            foto
        });
        await newCar.save();
        res.json({
            "message": "Car saved successfully!"
        })
    });

router.route('/cars/:id')
    .put(async (req, res) => {
        let carUpdated = await CocheModelo.findByIdAndUpdate(req.params.id, req.body);
        res.json({
            "message": "Car updated successfully!"
        });
    })
    .delete(async (req, res) => {
        let carRemoved = await CocheModelo.findByIdAndDelete(req.params.id);
        unlink(path.join('backend/public', carRemoved.foto));
        res.json({
            "message": "Car removed successfully!"
        });
    })

module.exports = router