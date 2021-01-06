const mongoose = require('mongoose');
const db_uri = process.env.MONGO_URI;

if(!db_uri){
    console.error('Mongo url not set in env file');
    return new Error('Mongo url not set in env file');
}

mongoose.connect(db_uri, 
    {
        useNewUrlParser:true,
        useFindAndModify:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
}, error => {
    if(error){
        console.log('Database Not Connected');
    }
    else{
        console.log('Database successfully connected');
    }
})

module.exports = mongoose;