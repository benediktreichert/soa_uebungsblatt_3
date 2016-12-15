/**
 * Created by Fabian on 06.12.16.
 */
let mongoose = require('mongoose');

/*=================================================================
 DATA MODEL Kunde
 =================================================================*/

let KundeSchema = new mongoose.Schema({
    name: {
        vorname: {type: String, required: true},
        nachname: {type: String, required: true},
    },
    adresse: {
        land: {type: String, required: true},
        stadt: {type: String, required: true},
        plz: {type: String, required: true},
        strasse: {type: String, required: true},
        hausnummer: {type: String, required: true}
    },
    bankverbindung:{
        iban: {type: String, required: true},
        bic: {type: String, required: true}
    }
});

mongoose.model('Kunde', KundeSchema);