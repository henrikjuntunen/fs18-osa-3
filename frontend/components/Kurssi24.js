import React from 'react'
// Osa2 tehtävä 2.4
// Osa2 tehtävä 2.5
const Kurssi = ({ kurssiTa }) => {
    console.log('Kurssi24')
    console.log(kurssiTa)

    const tutki = (kt) => {
        console.log('kt')
        console.log(kt)
        // tehdään kurssiTaulukko taulukosta yksiuloitteisia taulukoita
        // kurssi[].nimi
        // kurssi[].id
        // kurssi[].osat[].nimi
        // kurssi[].osat[].tehtavia
        // kurssi[].osat[].id
        const kurssiNimiTaulukko = kt.map( (n) => n.nimi)
        const kurssiIdTaulukko = kt.map( (n) => n.id)
        const kurssiOsatTaulukko = kt.map( (n) => n.osat)
        console.log(kurssiNimiTaulukko)
        console.log(kurssiIdTaulukko)
        console.log('ko', kurssiOsatTaulukko)
        let kotn = kurssiOsatTaulukko[0].map( (n) => n.nimi) 
        let kott = kurssiOsatTaulukko[0].map( (n) => n.tehtavia) 
        let koti = kurssiOsatTaulukko[0].map( (n) => n.id) 
        console.log('kotn', kotn)
        console.log('kott', kott)
        console.log('koti', koti)
         kotn = kurssiOsatTaulukko[1].map( (n) => n.nimi) 
         kott = kurssiOsatTaulukko[1].map( (n) => n.tehtavia) 
         koti = kurssiOsatTaulukko[1].map( (n) => n.id) 
        console.log('kotn', kotn)
        console.log('kott', kott)
        console.log('koti', koti)    
        return(<p>kurssiy</p>) 
    }

    const laske2 = (osatN) => {
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        console.log('laske2', osatN)
        const kurssinOsatT = osatN.map( (T) => T.tehtavia)
    return(kurssinOsatT.reduce(reducer, 0))
    }

    const väli = ' ... '

    const käsitteleOsat = (osatN) => {
        console.log('käsitteleOsat', osatN)
        return(<div>
        <ul>
        <li> .. nimi ..............   tehtäviä  .. id</li>
        {osatN.map( (l) => <li key = {l.id} > 
        { l.nimi + väli + l.tehtavia + väli + l.id } </li> )}
        <li>yhteensä ... tehtäviä .. {laske2(osatN)}</li>
        </ul> 
        </div>
        )
    }
    
    const kaikkiKurssit = (kt) => {
        tutki(kt) // consolitulostusta
        /*
        procissa otetaan kurssit taulukko vastaan ja jokaiselle kurssille
        toteutetaan kt.map rivillä oleva jsx
        kurssin osat käsitellään procissa käsitteleOsat
        */
        return(
        <div>
        {kt.map( (n) => <ul key = {n.id} > {n.nimi} {käsitteleOsat(n.osat)} </ul> )}
        </div>
        )
    }

    return (
        <div>
        <h1>Opetusohjelma 2.4</h1>
        {kaikkiKurssit(kurssiTa)}
        </div>
    )
} 
export default Kurssi