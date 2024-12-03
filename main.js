//imports
require("dotenv").config();
const express = require("express")
const mongoose = require("mongoose")
const session = require ("express-session");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;


app.use(cors());


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    retryWrites: true,
    w: 'majority'
});

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(express.json());





// static
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(
     session({
        secret: "my secret key",
        saveUninitialized : true,
        resave : false,
    })
);


app.use((req,res,next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});

app.use(express.static("uploads"));

//set template engine
app.set("view engine", "ejs");


//db connection
mongoose.connect(process.env.DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 5000,
}).then(() => console.log('Connected to MongoDB'))
.catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

mongoose.connection.on('error', err => {
    console.error('MongoDB error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', async () => {
    await mongoose.connection.close();
    process.exit(0);
});

const db = mongoose.connection;
db.on("error", (error) => console.log (error));
db.once('open', ()=>console.log("Connected to DB!"));

//route prefix 
app.use("", require("./routes/routes"));

app.listen(PORT, ()=>{
    console.log(`Server started at :${PORT}`);
});