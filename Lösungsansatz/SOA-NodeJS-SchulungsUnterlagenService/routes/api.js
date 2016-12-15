let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let Unterlage = mongoose.model('Unterlage');
let Lektion = mongoose.model('Lektion');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

/*=================================================================
 /unterlagen

 GET
 POST
 =================================================================*/

router.get('/unterlagen', (req, res, next) => {
   Unterlage.find().exec((err, data) => {
       if(err){
           return next(err);
       }
       res.json(data);
   })
});

router.post('/unterlagen', (req, res, next) => {
    let unterlage = new Unterlage(req.body);

    unterlage.save((err, data) => {
        if(err){
            return next(err);
        }
        console.log(data);
        res.header('Created-ID', data._id);
        res.sendStatus(201);
    })
});

/*=================================================================
 /unterlagen/:id

 GET
 PATCH
 PUT
 DELETE
 =================================================================*/

router.get('/unterlagen/:ID', (req, res, next) => {
   Unterlage.findById(req.params.ID).exec((err, data) => {
      if(err){
          return next(err)
      }
      if(data === undefined || data === null){
          return res.sendStatus(404);
      }
      res.json(data);
   });
});

router.patch('/unterlagen/:ID', (req, res, next) => {
    Unterlage.findByIdAndUpdate(req.params.ID, req.body,{new: true, runValidators: true}, (err, data) => {
        if(err){
            return next(err)
        }

        res.json(data);
    })
});

router.put('/unterlagen/:ID', (req, res, next) => {
    Unterlage.findByIdAndUpdate(req.params.ID, req.body,{new: true, runValidators: true}, (err, data) => {
        if(err){
            return next(err)
        }

        res.json(data);
    })
});

router.delete('/unterlagen/:ID', (req, res, next) => {
   Unterlage.findByIdAndRemove(req.params.ID, (err) => {
       if(err){
           return next(err)
       }

       res.sendStatus(200);
   })
});

/*=================================================================
 /lektionen

 GET
 POST
 =================================================================*/

router.get('/lektionen', (req, res, next) => {
    Lektion.find().exec((err, data) => {
        if(err){
            return next(err);
        }

        res.json(data);
    });
});

router.post('/lektionen', (req, res, next) => {
   let lektion = new Lektion(req.body);

   lektion.save((err, data) => {
       if(err){
           console.log(err);
           return next(err)
       }

       res.header('Created-ID', data.id);
       res.sendStatus(201);
   });
});

/*=================================================================
 /lektionen/:id

 GET
 PATCH
 PUT
 DELETE
 =================================================================*/


router.get('/lektionen/:ID', (req, res, next) => {
    Lektion.findById(req.params.ID).exec((err, data) => {
        if(err){
            return next(err)
        }
        if(data === undefined || data === null){
            return res.sendStatus(404);
        }
        res.json(data);
    });
});

router.patch('/lektionen/:ID', (req, res, next) => {
    Lektion.findByIdAndUpdate(req.params.ID, req.body,{new: true, runValidators: true}, (err, data) => {
        if(err){
            return next(err)
        }

        res.json(data);
    })
});

router.put('/lektionen/:ID', (req, res, next) => {
    Lektion.findByIdAndUpdate(req.params.ID, req.body,{new: true, runValidators: true}, (err, data) => {
        if(err){
            return next(err)
        }

        res.json(data);
    })
});

router.delete('/lektionen/:ID', (req, res, next) => {
    Lektion.findByIdAndRemove(req.params.ID, (err) => {
        if(err){
            return next(err)
        }

        res.sendStatus(200);
    })
});

module.exports = router;