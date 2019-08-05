var mongoose = require('mongoose');

exports.saveUser = async function (req, res) {
    try {
        console.log(req.body);
        mongoose.connect('mongodb://localhost/prostagma', {useNewUrlParser: true});
        var db = mongoose.connection;
        db.on('error', function (err){
            console.error(err);
        });
        db.once('open', function (success){
            console.log('connected');
        });
        var Schema = mongoose.Schema;
        var userSchema = new Schema({
            name: String,
            surname: String,
            email: String,
            password: String,
            birthday: Date,
            gender: Number,
            gender_specified: String,
            address: String,
            zip: Number,
            city: String,
            username: String
        })
        var User = mongoose.model('User', userSchema);
        var newUser = new User ({
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: req.body.password,
            birthday: req.body.birthday,
            gender: req.body.gender,
            gender_specified: req.body.gender_specified,
            address: req.body.address,
            zip: req.body.zip,
            city: req.body.city,
            username: req.body.username
        })
        newUser.save(function (err, data){
            if (err){
                console.error(err);
            }
            else {
                console.log('Saved : ', data);
            }
        })
    }
    catch (e){
        throw Error(e);
    }
}