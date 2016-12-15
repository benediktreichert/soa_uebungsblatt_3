/**
 * Created by Fabian on 14.12.16.
 */
let express = require('express');
let router = express.Router();

let mongoose = require('mongoose');

let Bestellung = mongoose.model('Bestellung');

let http = require('http');

router.get('/bestellungen', (req, res, next) => {
    Bestellung.find().exec((err, data) => {
        if (err) {
            console.log(err);
            res.sendStatus(500)
        }

        res.json(data);
    })
});

router.post('/bestellungen', (req, res, next) => {

    let kunde = req.body.kunde;
    let unterlagen = req.body.unterlagen;
    let lektionen = req.body.lektionen;

    let data_kunde;
    let data_unterlagen = [];
    let data_lektionen = [];

    let promiseKunde = new Promise((resolve, reject) => {
        http.get({
            host: 'localhost',
            port: 3000,
            path: `/api/kunden/${kunde}`
        }, (response) => {
            console.log('Got Response: ' + response.statusCode);
            let output = [];
            response
                .on('data', (chunk) => {
                    output.push(chunk)
                })
                .on('end', () => {
                    console.log('Kunde: ' + output);
                    resolve(data_kunde = JSON.parse(output));
                })
        }).on('error', (error) => {
            console.log('Got Error: ' + error);
            reject(error);
        })
    });

    let promiseUnterlagen = new Promise((resolve, reject) => {

        promisesUnterlagen = []

        for (let unterlage of unterlagen) {

            promisesUnterlagen.push(new Promise((resolve, reject) => {

                http.get({
                    host: 'localhost',
                    port: '4000',
                    path: `/api/unterlagen/${unterlage}`
                }, (response) => {
                    console.log('Got Response: ' + response.statusCode)
                    let output = []
                    response
                        .on('data', (chunk) => {
                            output.push(chunk)
                        })
                        .on('end', () => {
                            //console.log('Unterlage: ' + output)
                            //data_unterlagen.push(JSON.parse(output))
                            resolve(JSON.parse(output))
                        })
                }).on('error', (error) => {
                    console.log('Got Error: ' + error)
                    reject(error);
                })

            }))


        }
        Promise.all(promisesUnterlagen).then((results) => {

            resolve(results);
        });
    });

    let promiseLektionen = new Promise((resolve, reject) => {

        promisesLektionen = []

        for (let lektion of lektionen) {

            promisesLektionen.push(new Promise((resolve, reject) => {

                http.get({
                    host: 'localhost',
                    port: '4000',
                    path: `/api/lektionen/${lektion}`
                }, (response) => {
                    console.log('Got Response: ' + response.statusCode)
                    let output = []
                    response
                        .on('data', (chunk) => {
                            output.push(chunk)
                        })
                        .on('end', () => {
                            //console.log('Lektionen: ' + output)
                            //data_lektionen.push(JSON.parse(output))
                            resolve(JSON.parse(output))
                        })
                }).on('error', (error) => {
                    console.log('Got Error: ' + error)
                    reject(error);
                })

            }))

        }

        console.log('Got Lektionen: ' + JSON.stringify(data_lektionen));

        Promise.all(promisesLektionen).then((results) => {
            resolve(results);
        })

    });

    Promise.all([promiseKunde, promiseUnterlagen, promiseLektionen]).then((responses) => {

        let kunde = responses[0];
        let unterlagen = responses[1];
        let lektionen = responses[2];

        let bestellung_data = {};
        bestellung_data.kunde = kunde;

        bestellung_data.bezahlt = false;

        bestellung_data.artikel = []
        for(let unterlage of unterlagen){
            bestellung_data.artikel.push({
                type: 'Unterlage',
                name: unterlage.name,
                _id: unterlage._id,
                preis: unterlage.preis
            })
        }
        for(let lektion of lektionen){
            bestellung_data.artikel.push({
                type: 'Lektion',
                name: lektion.name,
                _id: lektion._id,
                preis: lektion.preis
            })
        }

        console.log('Bestellung: ' + bestellung_data)

        let bestellung = new Bestellung(bestellung_data);


        bestellung.save((err, data) => {
            if(err){
                console.log(err);
                return res.sendStatus(500);
            }

            res.header('Created-ID', data.id);
            res.sendStatus(201);
        });
    })

});

module.exports = router;