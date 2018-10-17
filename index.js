// index.js node puhelinluettelo on server
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
    }
  ]

  app.get('/', (req, res) => {
    console.log("req.url", req.url, "req.method", req.method)
    res.send('<h1>Hello there World on port the 3003!</h1>')
  })

  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  const PORT = 3003
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
  
  // end index.js