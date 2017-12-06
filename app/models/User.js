module.exports = function(mongoose) {
    
    var config = require('./../config');
    
    mongoose.Promise = global.Promise;
    mongoose.connect(config.usersDatabase, {useMongoClient: true});

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

    return mongoose.model('User', userSchema);
}




