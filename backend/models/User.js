const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
    nom : {type: String, required: true},
    prenom : {type: String, required: true},
    telephone : {type: String, required: true},
    mail : {type: String, required: true, unique: true},
    birthday : {type: String, required: true},
    password : {type: String, required: true},
    fonds : {type : Map},
    depense : {
        loyer : {type: Map},
        besoins : {type: Map},
        investissements : {type: Map},
        mensualites : {type: Map},
        epargne : {type: Map},
        loisirs : {type: Map},
        abonnements : {type: Map},
        autres : {type: Map},
        totalDepense : {type: Map},
    },
    investissements : {
        bourse : {type: Map},
        crypto : {type: Map},
        immobilier : {type: Map},
        autres : {type: Map},
        totalInvestie : {type: Number}
    },
});



userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema)