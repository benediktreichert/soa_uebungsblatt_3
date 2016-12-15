/**
 * Created by Fabian on 06.12.16.
 */
let mongoose = require('mongoose');

/*=================================================================
 DATA MODEL Unterlage
 =================================================================*/

let UnterlageSchema = new mongoose.Schema({
    name: 			    {type: String, required: true},
    fachgebiet: 		{type: String, required: true},
    beschreibung: 		{type: String, required: false},
    multimediaKomponente:{type: Boolean, required: true},
    preis:              {type: Number, required: true}
});

mongoose.model('Unterlage', UnterlageSchema);