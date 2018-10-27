import React from 'react'
import personsService from './services/rekisteri.2.16' 
import Clock from './components/Clock'
import Notification from './components/Notification'

// Osa 2 tehtävä 
// 2.14 - 2.19
// 1.10.2018 HJ
/*
2.14 puhelinluettelo osa 7
Palataan jälleen puhelinluettelon pariin.

Tällä hetkellä luetteloon lisättäviä uusia numeroita ei synkronoida palvelimelle. Korjaa tilanne.

2.15 puhelinluettelo osa 8
Siirrä palvelimen kanssa kommunikoinnista vastaava toiminnallisuus omaan moduuliin osan 2 esimerkin tapaan.

Eli asia mistä App on kiinnostunut on parametrin kentässä response.data.

Moduulia olisi miellyttävämpi käyttää, jos se HTTP-pyynnön vastauksen sijaan palauttaisi suoraan muistiinpanot sisältävän taulukon. Tällöin moduulin käyttö näyttäisi seuraavalta
tämä seruraavassa versiossa

2.16 puhelinluettelo osa 9
Tee ohjelmaan mahdollisuus yhteystietojen poistamiseen. Poistaminen voi tapahtua esim. nimen yhteyteen liitetyllä napilla. Poiston suorittaminen voidaan varmistaa käyttäjältä window.confirm-metodilla:

2.17* puhelinluettelo osa 10
Muuta toiminnallisuutta siten, että jos jo olemassaolevalle henkilölle lisätään numero, korvaa lisätty numero aiemman numeron. Korvaaminen kannattaa tehdä HTTP PUT -pyynnöllä.
(ei tehty PUT pyynnöllä)

2.18 puhelinluettelo osa 11
Toteuta osan 2 esimerkin parempi virheilmoitus tyyliin ruudulla muutaman sekunnin näkyvä ilmoitus, joka kertoo onnistuneista operaatioista (henkilön lisäys ja poisto, sekä numeron muutos):

2.19* puhelinluettelo osa 12
Jos poistat jonkun henkilön toisesta selaimesta hieman ennen kun yrität muuttaa henkilön numeroa toisesta selaimesta, tapahtuu virhetilanne:

TODO
:3001/persons/5:1 DELETE http://localhost:3001/persons/5 404 (Not Found)
Puhelinluettelo.2.19.js:235 remove error Error: Request failed with status code 404
    at createError (createError.js:17)
    at settle (settle.js:19)
    at XMLHttpRequest.handleLoad (xhr.js:78)

TODO

:3001/persons/8:1 DELETE http://localhost:3001/persons/8 404 (Not Found)
Puhelinluettelo.2.19.js:288 render Puhelinluettelo

Puhelinluettelo.2.19.js:106 remove error Error: Request failed with status code 404
    at createError (createError.js:17)
    at settle (settle.js:19)
    at XMLHttpRequest.handleLoad (xhr.js:78)

*/
class AppP extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            persons: [
            {   
                name: 'Arto Hellas Parikka',
                number: '040-5551235467', 
                date: '2017-12-10T17:30:31.098Z',
                id: 1
            }
            ],
            newName: '',
            newNumber: '',
            newFilter: '',
            personIdMax: 6,
            errorMessage1: '... jokin meni pieleen ...',
            errorMessage2: '... poisto onnistui ...',
            errorMessage3: '... tapaus lisätty ...',
            messageType: 'success', // 'note' 'error'
            showNoteC: false,
            notification: null
        }
        this.handleAddPerson = this.handleAddPerson.bind(this)
        this.handleFilterChange = this.handleFilterChange.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleNumberChange = this.handleNumberChange.bind(this)
        this.handleOnClickPoista = this.handleOnClickPoista.bind(this)
        console.log('constructor Puhelinluettelo')
    }
    
    // moduulin funktioita käytetään importatun muuttujan noteService kautta seuraavasti:
    componentDidMount(){
        console.log('did mount Puhelinluettelo')        
        personsService
        .getAll()
        .then( response => {
        // this.setState({persons: this.state.persons.concat(response.data)})
           this.setState({persons: response.data})
            console.log('response getAll()', response)
            console.log('response.data', response.data)
        })
 
    }
 

      // addPerson() lisätään henkilön tiedot puhelinluetteloon

      handleAddPerson = (event) => {
        event.preventDefault()
        //debugger
        let indeksi = this.myFunctionA(this.state.persons, this.state.newName)
        //debugger
        if (indeksi === this.state.persons.length) {

        } else {
         if   (window.confirm('Korvataanko? ' + this.state.persons[indeksi].name +
            ' ' + this.state.persons[indeksi].number +
            '. Tällä uudella tiedolla: ' + this.state.newName +
            ' ' + this.state.newNumber )) {
            // jos korvataan niin poistetaan vanha alta pois
            personsService
            .remove(this.state.persons[indeksi].id)
            .catch(error => { console.log('remove error', error)})
            // TODO miksi sate ja db pitää pitää samassa tahdissa - 
            let taulu = this.setState({persons: this.myFunctionC(this.state.persons, 
                (this.myFunctionB(this.state.persons, this.state.persons[indeksi].id)))})
                console.log('taulu 004', taulu)
            }
        } 
        const newObject = {
            name: this.state.newName,
            number: this.state.newNumber,
            date: new Date().toISOString()
        }
        personsService
          .create(newObject)
          .then(response => {
              this.setState({
                  persons: this.state.persons.concat(response.data),
                  newName: '',
                  newNumber: ''
              })
          })
        
      }
  
      
      handleNameChange = (event) => {
      //  console.log(event.target.value)
        this.setState({ newName: event.target.value })
      }

      handleNumberChange = (event) => {
      //  console.log(event.target.value)
        this.setState({ newNumber: event.target.value })
      }

      handleFilterChange = (event) => {
        console.log(event.target.value)
        this.setState({ newFilter: event.target.value })
      }
      
      // remove poista
      // etsitään taulukon indeksi jotta voidaan ottaa pois taulukosta joka on talletettuna tilaan


      //function etsi name - palauttaa indeksin tai lengthin jos ei löydy
myFunctionA(taulu, value) {
   // console.log('myfunctionA ', taulu, ' ', value)
    let r = taulu.length;
for ( let i = 0; i < taulu.length; i++) {
console.log('nimi ', i, ' ', taulu[i].name, ' onko ' , value)
     if ( taulu[i].name === value ) {  // compare strings
                                r = i ;
                                i = taulu.length ;}
    };
return(r);
}


//function etsi id - palauttaa indeksin josta löytyy tai lengthin jos ei löydy
myFunctionB(taulu, value) {
    let r = taulu.length;
for ( let i = 0; i < taulu.length; i++)
    { if ( taulu[i].id === value ) {
                                r = i ;
                                i = taulu.length ;}
    };
return(r);
}



//function 
myFunctionC(taulu1, poista) {
// poisteaan alkio taulusta indeksin kohdasta poista
const taulu2 = taulu1.slice(0, poista).concat(taulu1.slice((poista + 1)))
console.log('taulu2 001', taulu2)
return(taulu2)
}

notify = (notification) => {
    console.log('notify 001', notification, this.state.notification)
    this.setState({ notification })
    console.log('notify 002', notification, this.state.notification)
    setTimeout(() => {
      this.setState({ notification: null })
    }, 5000)
}


// TODO miten välitetään arvo tähän poistoon valitusta rivistä
handleOnClickPoista = (arvo) => {
          // arvo on person.id
         // debugger
        if (window.confirm('poistetaanko: ' + arvo)) {
            let arvon =
            this.state.persons.filter(person=>person.id===arvo)
            personsService
            .remove(arvo)
            .then(response => {
              this.setState({ 
                persons: this.state.persons.filter(person=>person.id!==arvo) 
              })
              //debugger
              this.notify(`${arvo} ${arvon[0].name} removed`)
            })
        }
}

rajauksenL(){
          return(this.state.newFilter.length)
}

rajauksenT(){
          return(this.state.newFilter)
}

rajauksenFilter(){
          let result
          if ( this.rajauksenL() < 1 )
          { result = this.state.persons
            console.log('rejauksenFilter 001', result, this.state.persons) }
          //return(this.state.persons)}
          else
          {   //return(this.state.persons.filter( 
              result = this.state.persons.filter( 
                  p => p.name.toLowerCase().substring(0, 
                    this.rajauksenL()) === this.rajauksenT().toLowerCase())
                    //    )
                    console.log('rejauksenFilter 002') }
          console.log('rajauksenFilter 003', result)
          return (result)
}

        render(){
            console.log('render Puhelinluettelo')
// TODO miksi formin sisässä onClick ei toiminut counterissa ?
        return ( // return of render of App
           <div>
    <h2>Puhelinluettelo</h2>
<Clock />

    <Rajaa v={this.state.newFilter} oc={this.handleFilterChange}/>
    <form onSubmit={this.handleAddPerson}>
    <Notification message={this.state.notification}/>
    <Nimi  
    v={this.state.newName} 
    oc={this.handleNameChange} />
    <Numero 
    v={this.state.newNumber}
    oc={this.handleNumberChange}
    />
    <div>
    <button type="submit">lisää</button>
    </div>
    </form>
    <div>
        <h2>Numerot</h2>
        <table>
            <thead>
            </thead>
            <tbody>
{this.rajauksenFilter().map( (p) => 
<tr key = {p.id}> 
<td>{p.id}</td>
<td>{p.name}</td> 
<td>{p.number}</td>
<td>
<button onClick={this.handleOnClickPoista.bind(this, p.id)}>poista</button>
</td>
</tr> )}       
            </tbody>
        </table>
        </div>
    </div>
    ) // end return of render of App
} // end render of App
} // end component App

const Rajaa = (props) =>{
    return(
        <div>
        rajaa näytettäviä nimiä:<input value={props.v} 
        onChange={props.oc}/>
        </div>
    )
}

const Nimi = (props) => {
    return(
    <div>
    nimi:<input value={props.v} 
    onChange={props.oc}/>
    </div>
    )
}

const Numero = (props) => {
    return(
    <div>
    number:<input value={props.v} 
    onChange={props.oc}/>
    </div>
    )
}

export default AppP


// TODO (3)
// rivit tuplaantuvat (itse asiassa kertaanuvat) näytöllä 
/* 
Puhelinluettelo
Hello, react!
It is 15:06:33.
rajaa näytettäviä nimiä:
nimi:
number:
lisää
Numerot
36	Kissa	12	poista
24	Koira	23	poista
13	Paviaani	34	poista
16	Kaniini	56	poista
36	Kissa	12	poista
24	Koira	23	poista
13	Paviaani	34	poista
16	Kaniini	56	poista
85	Ilves	67	poista
*/