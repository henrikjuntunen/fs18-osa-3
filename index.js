// index.js node puhelinluettelo on server
// remote:        https://safe-headland-53320.herokuapp.com/ deployed to Heroku
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
  
app.get('/api/persons', (req, res) => {
    // res.json(persons)
    Person
    .find({})
    .then(people => {
      res.json(people.map(formatPerson))
    })
})

app.get('/api/persons/:id', (request, response) => {
    console.log("req.url", request.url, "req.method", request.method)
    // const id = Number(request.params.id)
    // const result = persons.find(x => x.id === id)
    Person
    .findById(Number(request.params.id))
    .then(person => {
      response.json(formatNote(person))
    })
    // if ( result ) {
    //     response.json(result)
    // } else {
    //     response.status(404).end()
    // }
})

app.delete('/api/persons/:id', (request, response) => {
    // const id = Number(request.params.id)
    // persons = persons.filter(x => x.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
    }
    if (body.number === undefined) {
        return response.status(400).json({error: 'number missing'})
    }
    if (0 < persons.filter(x => x.number === body.number).length) {
        return response.status(400).json({error: 'number dublicate not allowed'})
    }
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
          response.json(formatNote(savedPerson))
    })
})

let ENVFS18 = 'local*'
let ENVHEROKU = 'heroku*'
let environment = ENVHEROKU
// let environment = ENVFS18

switch(environment) {
case ENVFS18: {
    PORT = process.env.PORT || 3001
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
      .listen(PORT, () => console.log(`Listening on ${ PORT } having persons count `, persons.length))
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
      .listen(PORT, () => console.log(`Listening on ${ PORT } having persons count. `, persons.length))
    break;
}
}

/*
*/



  // end index.js