const express = require('express')
const app = express();
const PORT = 3500
const ResData = require('../Models/restaurants')
const ResLocation = require('../Models/locations')
const mealType = require('../Models/allMealtype');
const cors = require('cors');
const login = require('../Models/login')
const mongoose = require('mongoose');
const RestaurantDetails = require('../Models/RestaurantDetail')
const MenuDetails = require('../Models/Menu')
// app.use(express.urlencoded({ extended: false }))

// app.use(express.json)

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/Zomato').then(() => console.log('db connected successfully')).catch(err => console.log('err in mongodb connection', err))
}


app.use(cors());

app.use(express.json())

app.get('/getOneRestautants/:hotel_id', async (req, res) => {
    console.log('req params', req.params.hotel_id);

    try {
        const resultData = await RestaurantDetails.find({ hotel_id: req.params.hotel_id })
        res.json(resultData)

    } catch (err) {
        console.log(err);
        res.status(500).send("server error")
    }

})

app.get('/getAllRestautants', async (req, res) => {
    try {
        const resultData = await ResData.find()
        // res.status(200).send("server success")

        res.json(resultData)

    } catch (err) {
        console.log(err);
        res.status(500).send("server error")
    }

})

app.get('/getRestautantMenu/:hotel_id', async (req, res) => {
    try {
        const resultData = await MenuDetails.find({ hotel_id: req.params.hotel_id })
        res.json(resultData)
        res.status(200)


    } catch (err) {
        console.log(err);
        res.status(500).send("server error")
    }

})

app.get('/getAllLocations', async (req, res) => {
    try {
        const resultData = await ResLocation.find()
        res.json(resultData)

    } catch (err) {
        console.log(err);
        res.status(500).send("server error")
    }

})
app.get('/getAllMealType', async (req, res) => {
    try {
        const resultData = await mealType.find()
        res.json(resultData)

    } catch (err) {
        console.log(err);
        res.status(500).send("server error")
    }

})

app.get('/getMealType/:mealType_id', async (req, res) => {
    console.log('req params', req.params.mealType_id);
    try {
        const resultData = await ResData.find({ mealtype_id: req.params.mealType_id })
        res.json(resultData)

    } catch (err) {
        console.log(err);
        res.status(500).send("server error")
    }

})

app.get('/getRestaurantBasedOnLocations/:locality', async (req, res) => {

    console.log('req params', req.params.locality);
    const rest = await ResData.find({ locality: req.params.locality })
    // console.log('api res is ', [...rest]);
    res.json([...rest])

})
app.post('/createAccount', async (req, res) => {
    console.log('request body :', req.body);

    try {
        const resultData = await login.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            phoneNumber: req.body.phonenumber
        })
        if (resultData) {
            res.status(200)

            res.json({ message: 'data posted successfully' })

        }

    } catch (err) {
        console.log(err);
        res.status(500).send("server error")
    }

})

app.post('/loginAccount', async (req, res) => {
    console.log('request body :', req.body);

    try {
        const result = await login.find({
            email: req.body.email
        })
        console.log('login api result :', result[0].username);

        if (result) {
            res.status(200)
            res.json({ username: result[0].username, message: 'user Found' })
        }
        else {
            res.status(200)
            res.json({ message: 'user not Found' })
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("server error")
    }

})


app.listen(PORT, () => {
    console.log('server started')
    main()
})