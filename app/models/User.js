var mongoose   = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Users',
                 {useMongoClient: true});

Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    location: String,
    meta: {
        age: Number,
        website: String
    },
    created_at: Date,
    updated_at: Date
});

userSchema.methods.dudify = function() {
    this.name = this.name + '-dude'; 
    return this.name;
};

var User = mongoose.model('User', userSchema);
module.exports = User;


