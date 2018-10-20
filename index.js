// index.js node puhelinluettelo on server
// TODO (1) 
// result: Cannot read property 'innerHTML' of null
// input: http://localhost:3001/api/persons
//
// 3.1 puhelinluettelon backend osa 1 expressin alkeet
// 3.2 puhelinluettelon backend osa 2
// 3.3 puhelinluettelon backend osa 3
// 3.4 puhelinluettelon backend osa 4
// 3.5 puhelinluettelon backend osa 5
// 3.6 puhelinluettelon backend osa 6
// 3.7 puhelinluettelon backend osa 7 morgan HTTP request logger middleware for node.js
// 3.8* puhelinluettelon backend osa 8
// Konfiguroi morgania siten, että se näyttää myös HTTP-pyyntöjen mukana tulevan datan:
const express = require('express')
const cors = require('cors')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')
const PORT = process.env.PORT || 5000
// 3.7 puhelinluettelon backend osa 7
// app.use(morgan('tiny'))
app.use(cors())

app.use(bodyParser.json())
// 3.8* puhelinluettelon backend osa 8
let logger = require('morgan')
logger.token('typex', function (req, res) { 
  let result = ""
  result = result.concat(JSON.stringify(req.body))
  return result
})
app.use(logger(':method :url :typex :status :res[content-length] - :response-time ms'))


let persons = [
    {
        name: 'Maija Kannisto',
        number: '04055512345',
        id: 1
    },
    {
        name: 'Kalevi Kannisto',
        number: '04055522345',
        id: 2
    },
    {
        name: 'Pihla Kannisto',
        number: '04055532345',
        id: 3
    },
    {
        name: 'Risto Kannisto',
        number: '04055542345',
        id: 4
    },
    {
        name: 'Raija Kannisto',
        number: '04055552345',
        id: 5
    }
  ]

  // 3.2 puhelinluettelon backend osa 2
app.get('/info', (req, res) => {
      let cDate = new Date();
    console.log("req.url", req.url, "req.method", req.method)
    res.send('<p class=\"info\">Puhelinluettelossa on ' + persons.length + 
    ' henkilön tiedot ' + '<br>' + cDate + '<p>')
})

  // 3.1 puhelinluettelon backend osa 1
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

  // 3.3 puhelinluettelon backend osa 3
app.get('/api/persons/:id', (request, response) => {
    console.log("req.url", request.url, "req.method", request.method)
    const id = Number(request.params.id)
    const result = persons.find(x => x.id === id)
    if ( result ) {
      response.json(result)
    } else {
      response.status(404).end()
    }
})

  // 3.4 puhelinluettelon backend osa 4
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(x => x.id !== id)
    response.status(204).end()
})

  // 3.5 puhelinluettelon backend osa 5
  // 3.6 puhelinluettelon backend osa 6
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
    const personx = {
      name: body.name,
      number: body.number,
      id: Math.random().toFixed(2) * 100
    }
    console.log('app.post 001', persons)
    console.log('app.post 002', personx)
    persons = persons.concat(personx)
    console.log('app.post 003', persons)
    response.json(persons)
})

/*
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
*/
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  // end index.js