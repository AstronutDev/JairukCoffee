const express = require('express')
const { update } = require('./models/CoffeeModel')
const Coffee = require('./models/CoffeeModel')

require('./db')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/coffees', async (req, res) => {
    await Coffee.find({})
    .then( data => {
        res.json({ data })
    })
    .catch(error => {
        res.status(400).json({ 'message': 'can not get' })
    })
})

app.get('/coffees/:id', async(req, res) => {
    const { id } = req.params
    await Coffee.findById(id)
        .then( data => {
            res.json({data})
        })
        .catch( error => {
            res.status(400).json({ 'message': 'not found' })
        })
})


app.post('/coffees', async(req, res) => {
    const { name, price } = req.body
    const newCoffee =  new Coffee({
        name,
        price
    })

    await newCoffee.save()
    .then( data => {
        res.json({data})
    })
    .catch(error => {
        res.status(400).json({ 'message': 'can not add coffee' })
    }) 
})

app.put('/coffees/:id', async (req, res) => {
    const {id} = req.params
    const { name, price} = req.body
    const updated = {
        $set: {
            name,
            price
        }
    }

    await Coffee.findByIdAndUpdate(id, updated, {new: true})
        .then( data => {
            res.json({data})
        })
        .catch (error => {
            res.status(400).json({ 'message': 'update not success'})
        })
})

app.delete('/coffees/:id', async(req, res) => {
    const {id} = req.params
    await Coffee.findByIdAndDelete(id)
        .then( () => {
            res.json({'message': `${id} already delete`})
        })
        .catch( error => {
            res.status(400).json({'message': 'can not delete'})
        })
})

app.listen(3000, () => {
    console.log('server listen on port 3000');
})