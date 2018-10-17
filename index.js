// index.js node puhelinluettelo on server
// 3.1 puhelinluettelon backend osa 1 expressin alkeet
// 3.2 puhelinluettelon backend osa 2
// 3.3 puhelinluettelon backend osa 3
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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
        number: '04055542345',
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

  const PORT = 3003
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  
  /*
  3.2 ja 3.3
  TODO
  app.js:22 Uncaught TypeError: Cannot read property 'innerHTML' of null
    at Object.init (app.js:22)
    at String.4 (app.js:112)
    at _kitty_require (app.js:11)
    at 4 (app.js:14)
    at app.js:15
  */

  // end index.js