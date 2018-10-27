// Ei lisätä mongoa käsittelevää koodia heti backendin koodin sekaan, vaan tehdään erillinen kokeilusovellus tiedostoon mongo.js:
// Kannattaa muistaa, että tietokannan salasanaa ei kannata laittaa missään vaiheessa Githubiin!
// Määrittelemmekin seuraavassa kannan suoraan mlab:iin, jolloin luottokorttitietoja ei tarvita.
// npm install mongoose --save

// Mongoosesta voisi käyttää luonnehdintaa object document mapper (ODM), ja sen avulla Javascript-olioiden tallettaminen mongon dokumenteiksi on suoraviivaista.

// Ohjelma toimii siten, että jos sille annetaan käynnistäessä kaksi komentoriviparametria, esim:

// node mongo.js Joulupukki 040-1234556

// Ohjelma tulostaa

// lisätään henkilö Joulupukki numero 040-1234556 luetteloon
// ja lisää uuden yhteystiedon tietokantaan. Huomaa, että jos nimi sisältää välilyöntejä, on se annettava hipsuissa:

// node mongo.js "Arto Vihavainen" 040-1234556
// Jos komentoriviparametreja ei anneta, eli ohjelma suoritetaan komennolla

// node mongo.js
// tulostaa ohjelma tietokannassa olevat numerotiedot:

// puhelinluettelo:
// Pekka Mikkola 040-1234556
// Arto Vihavainen 045-1232456
// Tiina Niklander 040-1231236
// Saat selville ohjelman komentoriviparametrit muuttujasta process.argv

// 3.12 tietokanta komentoriviltä
// ------------------------------------------------------------------------------

const mongoose = require('mongoose')

const url = 'mongodb'

mongoose.connect(url)

// print process.argv
process.argv.forEach((val, index) => {
    console.log(`${index}: ${val}`);
  });

let argv2 = process.argv[2];
let argv3 = process.argv[3];
let argv4 = process.argv[4];


const Person = mongoose.model('Person', {   
    name: String,
    number: String,
    date: Date,
    id: Number
})

if (argv2 && argv3 && argv4) {
    // lisätään yksi henkilö
    const person = new Person({   
            name: argv2,
            number: argv3, 
            date: new Date(),
            id: Number(argv4)
    })
    person
        .save()
        .then(response => {
        console.log('The person ', argv2, argv3, argv4, ' saved!')
        mongoose.connection.close()
    })
} else {
    console.log('The person ', argv2, argv3, argv4, ' not saved!')
    // haetaan kaikki henkilöt
    Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
    console.log('Anna parametrina lisättävä nimi numero ja id')
    console.log('node mongo.js "Arto Vihavainen" 040-1234556 101')
}



// ------------------------------------------------------------------------------
/*
    const person = new Person({   
            name: 'Aino Hellas Parikka',
            number: '040-6661235467', 
            date: '2018-10-28T17:30:31.098Z',
            id: 1
    })

    let idHaku = 1;

        Person
    .find({})
    .then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })

Person
  .find({ id: idHaku })
  .then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
})


person
  .save()
  .then(response => {
    console.log('person saved!')
    mongoose.connection.close()
})
*/

/* end */