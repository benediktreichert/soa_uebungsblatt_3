/**
 * Created by Fabian on 06.12.16.
 */
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Kunde = mongoose.model('Kunde');

/*=================================================================
 /Kunden

 GET
 POST
 =================================================================*/

router.get('/kunden', (req, res, next) => {
    Kunde.find().exec((err, data) => {
        if(err){
            return next(err)
        }

        res.json(data);
    })
});

router.get('/kunden/:ID', (req, res, next) => {
   Kunde.findById(req.params.ID).exec((err, data) => {
       if(err){
           return next(err);
       }

       res.json(data);
   })
});

router.post('/kunden', (req, res, next) => {
   let kunde = new Kunde(req.body);

   kunde.save((err, data) => {
       if(err){
           return next(err)
       }

       res.header('Created-ID', data.id);
       res.sendStatus(201);
    })
});

module.exports = router;