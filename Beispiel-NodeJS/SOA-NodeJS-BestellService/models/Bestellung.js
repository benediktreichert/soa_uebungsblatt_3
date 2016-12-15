/**
 * Created by Fabian on 12.12.16.
 */
let mongoose = require('mongoose');

/*=================================================================
 DATA MODEL Bestellung
 =================================================================*/

let BestellungSchema = new mongoose.Schema({
    bestellDatum: {type: Date, default: Date.now()},
    bezahlt: {type: Boolean, default: false},
    kunde: {
        _id: {type: String, required: true},
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
        }
    },
    artikel: [{
        type: {type: String, required: true},
        _id: {type: String, required: true},
        name: {type: String, required: true},
        preis: {type: Number, required: true}
    }]
});

mongoose.model('Bestellung', BestellungSchema);