// imports
const express = require("express") //importing express package
const app = express() // creates a express application
const dotenv = require("dotenv").config() //this allows me to use my .env values in this file
const mongoose = require("mongoose")
const methodOverride = require('method-override')
const morgan = require('morgan')
const Car = require('./models/Car')



async function conntectToDB(){ //connection to the database
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to Database")
    }
    catch(error){
        console.log("Error Occured",error)
    }
}




conntectToDB() // connect to database






// Middleware
app.use(express.static('public')); //all static files are in the public folder
app.use(express.urlencoded({ extended: false })); // this will allow us to see the data being sent in the POST or PUT
app.use(methodOverride('_method'))
app.use(morgan('dev'))






















// Routes go here



app.get('/', async (req,res)=>{
    res.render('homepage.ejs')
})

app.get('/cars/new', async (req,res)=>{
    res.render('new.ejs')
})

app.post('/cars', async (req,res)=>{
    req.body.isItAutomatic = Boolean(req.body.isItAutomatic)
    const createdNewCar = await Car.create(req.body)
    res.redirect('/')
})

app.get('/cars', async (req,res)=>{
    const allCars = await Car.find()
    res.render('all-cars.ejs', {cars: allCars})
})

app.get('/cars/:id', async (req,res)=>{
    const foundCar = await Car.findById(req.params.id)
    res.render('car_details.ejs', {car: foundCar})
})

app.get('/cars/:id/edit', async (req,res)=>{
    const foundCar = await Car.findById(req.params.id)
    res.render('edit-car.ejs', {car: foundCar})
})

app.put('/cars/:id', async (req,res)=>{
    req.body.isItAutomatic = Boolean(req.body.isItAutomatic)
    const updatedCar = await Car.findByIdAndUpdate(req.params.id, req.body)
    res.redirect('/cars')
})

app.delete('/cars/:id', async (req,res)=>{
    req.body.isItAutomatic = Boolean(req.body.isItAutomatic)
    const updatedCar = await Car.findByIdAndDelete(req.params.id, req.body)
    res.redirect('/cars')    
})

 
 
 
 




app.listen(3000,()=>{
    console.log('App is Running')
}) // listen on port 3000
