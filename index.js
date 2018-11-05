// index.js node puhelinluettelo on server
// remote:        https://safe-headland-53320.herokuapp.com/ deployed to Heroku
// 3.13,, 3.15, 3.16 3.17*;
// http://expressjs.com/
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

/*C CRUD*/
app.post('/api/persons', (request, response) => {
    console.log('app.post /api/persons version 00.01')
    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
    }
    if (body.number === undefined) {
        return response.status(400).json({error: 'number missing'})
    }
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


/*R CRUD*/
app.get('/', (req, res) => {
    // res.json(persons)
    const info = '(/) API INFO FS18-OSA-3 VERSION 03.13 TIME 2018-10-27:08:26:000001'
    // console.log('app.get info /', info)
    // console.log('app.get req /', req)
    // console.log('app.get res /', res)
    // console.log('app.get / version 00.01')
    // return(res.json(info))
    return res.status(400).json({error: info})
})

/*R CRUD*/
app.get('/info', (req, res) => {
    // res.json(persons)
    const info = '(/info) API INFO FS18-OSA-3 VERSION 03.14 TIME 2018-10-27:08:26:000001'
    // console.log('app.get info /info', info)
    // console.log('app.get req /info', req)
    // console.log('app.get res /info', res)
    // console.log('app.get /info version 00.01')
    // return(res.json(info))
    return res.status(400).json({error: info})
})


/*R CRUD*/
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

/*R CRUD*/
app.get('/api/persons/:id', (request, response) => {
    console.log("req.url", request.url, "req.method", request.method)
    // const id = Number(request.params.id)
    // const result = persons.find(x => x.id === id)
    Person
//    .findById(Number(request.params.id))
    .findById(request.params.id)
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

/*U CRUD*/
app.put('/api/persons/:id', (request, response) => {
    console.log('app.put /api/personid:id version 00.02')
    const body = request.body
    if (body.name === undefined) {
        return response.status(400).json({error: 'name missing'})
    }
    if (body.number === undefined) {
        return response.status(400).json({error: 'number missing'})
    }
    const person = {
        name: body.name,
        number: body.number
    }
    Person
      .findByIdAndUpdate(request.params.id, person, { new: true } )
      .then(updatedPerson => {
        response.json(formatPerson(updatedPerson))
      })
      .catch(error => {
        console.log(error)
        response.status(400).send({ error: 'malformatted id' })
      })
})


/*D CRUD*/
app.delete('/api/persons/:id', (req, res) => {
    Person
    .findOneAndDelete(req.params.id)
    .then(person => {
        res.json(formatPerson(person))
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