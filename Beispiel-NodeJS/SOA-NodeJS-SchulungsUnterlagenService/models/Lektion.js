/**
 * Created by Fabian on 06.12.16.
 */
let mongoose = require('mongoose');
let Schema = mongoose.Schema;


/*=================================================================
 DATA MODEL Lektion
 =================================================================*/

let LektionSchema = new mongoose.Schema({
    name: 			    {type: String, required: true},
    fachgebiet: 		{type: String, required: true},
    beschreibung: 		{type: String, required: false},
    preis:              {type: Number, required: true},
    unterlagen:         [{
        name: 			    {type: String, required: true},
        fachgebiet: 		{type: String, required: true},
        beschreibung: 		{type: String, required: false},
        multimediaKomponente:{type: Boolean, required: true},
    }]
});

mongoose.model('Lektion', LektionSchema);