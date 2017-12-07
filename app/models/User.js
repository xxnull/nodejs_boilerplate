module.exports = function(mongoose) {
    
    var config = require('./../config');
    
    mongoose.Promise = global.Promise;
    mongoose.connect(config.usersDatabase, {useMongoClient: true});
    //mongoose.connect(process.env.MONGODB_URI || process.env.MONGOLAB_URI);
    mongoose.connection.on('error', (err) => {
        console.error(err);
        console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'));
        process.exit();
    });


    Schema = mongoose.Schema;

    var userSchema = new Schema({
        name: String,
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        email: {type: String,  unique: true },
        active: false,
        role: Number,
        location:  {type: String},
        meta: {
            age:  {type: Number},
            favorite_bands: []
        },
        pets:[],
        created_at: Date,
        updated_at: Date
    });

    userSchema.methods.dudify = function() {
        this.name = this.name + '-dude'; 
        return this.name;
    };

    return mongoose.model('User', userSchema);
}




