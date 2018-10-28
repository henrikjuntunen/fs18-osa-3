// index.js node puhelinluettelo on server
// remote:        https://safe-headland-53320.herokuapp.com/ deployed to Heroku
// 3.13,, 3.15, ;
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const Person = require('./models/person')

app.use(cors())

app.use(bodyParser.json())

let logger = require('morgan')
logger.token('typex', function (req, res) { 
    let result = ""
    result = result.concat(JSON.stringify(req.body))
    return result
})
app.use(logger(':method :url :typex :status :res[content-length] - :response-time ms'))

app.use(express.static('build')) // clientia varten 

// sovitetaan Heroku ja tämä serveri toisiinsa datan osalta

const formatPerson = (person) => {
    return {
      name: person.name,
      number: person.number,
      id: person._id
    }
} 


app.get('/', (req, res) => {
    // res.json(persons)
    const info = '(/) API INFO FS18-OSA-3 VERSION 03.12 TIME 2018-10-27:08:26:000001'
    // console.log('app.get info /', info)
    // console.log('app.get req /', req)
    // console.log('app.get res /', res)
    // console.log('app.get / version 00.01')
    // return(res.json(info))
    return res.status(400).json({error: info})
})

app.get('/info', (req, res) => {
    // res.json(persons)
    const info = '(/info) API INFO FS18-OSA-3 VERSION 03.12 TIME 2018-10-27:08:26:000001'
    // console.log('app.get info /info', info)
    // console.log('app.get req /info', req)
    // console.log('app.get res /info', res)
    // console.log('app.get /info version 00.01')
    // return(res.json(info))
    return res.status(400).json({error: info})
})


app.get('/api/persons', (req, res) => {
    // res.json(persons)
    console.log('app.get /api/persons req /', req)
    console.log('app.get /api/persons res /', res)
    console.log('app.get /api/persons version 00.01')
    Person
    .find({})
    .then(people => {
      res.json(people.map(formatPerson))
      // res.json(people.map(Person.formatPerson))
    }).catch(error => {
        console.log(error)})
})

app.get('/api/persons/:id', (request, response) => {
    console.log("req.url", request.url, "req.method", request.method)
    // const id = Number(request.params.id)
    // const result = persons.find(x => x.id === id)
    Person
    .findById(Number(request.params.id))
    .then(person => {
      response.json(formatPerson(person))
      // response.json(person.formatPerson(person))
    })
    // if ( result ) {
    //     response.json(result)
    // } else {
    //     response.status(404).end()
    // }
    .catch(error => {
        console.log(error)})
})
/*
https://coursework.vschool.io/mongoose-crud/

Delete
Similar to the "Update" section above, you can go about deleting a document from the database by first finding it, then running the .remove() method on the found document. Also similar to the updating section above, Mongoose v4.0 introduced some helper methods - .findOneAndRemove() and .findByIdAndRemove() - which is what we'll show in the example below.

// The "todo" in this callback function represents the document that was found.
// It allows you to pass a reference back to the client in case they need a reference for some reason.
Todo.findByIdAndRemove(req.params.todoId, (err, todo) => {
    // As always, handle any potential errors:
    if (err) return res.status(500).send(err);
    // We'll create a simple object to send back with a message and the id of the document that was removed
    // You can really do this however you want, though.
    const response = {
        message: "Todo successfully deleted",
        id: todo._id
    };
    return res.status(200).send(response);
});
*/

app.delete('/api/persons/:id', (req, res) => {
    // const id = Number(request.params.id)
    // persons = persons.filter(x => x.id !== id)
    // response.status(204).end()
    Person
    .findOneAndDelete(req.params.id)
    .then(person => {
        res.json(formatPerson(person))
        })
    .catch(error => {
            console.log(error)})
        
    })



app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
    }
    if (body.number === undefined) {
        return response.status(400).json({error: 'number missing'})
    }
    // if (0 < persons.filter(x => x.number === body.number).length) {
    //    return response.status(400).json({error: 'number dublicate not allowed'})
    // }
    // const personx = {
    //     name: body.name,
    //     number: body.number,
    //     id: Math.random().toFixed(2) * 100
    // }
    // console.log('app.post 001', persons)
    // console.log('app.post 002', personx)
    // persons = persons.concat(personx)
    // console.log('app.post 003', persons)
    // response.json(persons)
    const person = new Person({
        name: body.name,
        number: body.number,
        id: Math.random().toFixed(2) * 100
      })
    person
        .save()
        .then(savedPerson => {
          response.json(formatPerson(savedPerson))
          // response.json(savedPerson.formatPerson(savedPerson))
    })
    .catch(error => {
        console.log(error)})
})

let ENVFS18 = 'local*'
let ENVHEROKU = 'heroku*'
// let environment = ENVHEROKU
let environment = ENVFS18

switch(environment) {
case ENVFS18: {
    PORT = process.env.PORT || 5000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} a`)
    })
    break;
}
case ENVHEROKU: {    
    PORT = process.env.PORT || 5000
    express()
    .use(express.static(path.join(__dirname, 'public')))
    //.use(express.static(path.join(__dirname, 'public')))
    //.set('views', path.join(__dirname, 'views'))
    //.set('view engine', 'ejs')
    .get('/', (req, res) => res.render('index.html'))
      .listen(PORT, () => console.log(`Listening on ${ PORT }`))
    break;
}
default:{
    PORT = process.env.PORT || 5000
    express()
    .use(express.static(path.join(__dirname, 'public')))
    //.use(express.static(path.join(__dirname, 'public')))
    //.set('views', path.join(__dirname, 'views'))
    //.set('view engine', 'ejs')
    .get('/', (req, res) => res.render('index.html'))
      .listen(PORT, () => console.log(`Listening on ${ PORT }.`))
    break;
}
}

/*
*/



  // end index.js