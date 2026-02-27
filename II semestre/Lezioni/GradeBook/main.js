import * as gbook from './modules/gradebook.js'

let g1 = new gbook.Grade("Laboratorio 1", 12,30 , "27 February 2025 9:45", true)
let g2 = new gbook.Grade("Programmazione e Algoritmica", 15, 27,"15 July 2025 16:00" ,false)
let gb = new gbook.BachelorGradeBook()
gb.register(g1)
gb.register(g2)
gb.exportJSON("libretto.json")

function matricolaValida(m){
    return /[0-9]{6}/.test(m)

    // [0-9] prendo un numero tra 0 e 9
    // {6} questo numero deve esattamente essere di 6 cifre
}

function emailStudenteUnipiValida(e){
    return /[a-z]\.[a-z]+([1-9][0-9]*)?@studenti.unipi.it/.test(e)

    // [a-z] prendo una singola lettera minuscola da a-z
    // \. indico che lì ci deve essere un punto
    // [a-z]+ identico a prima ma il + mi garantisce di poter inserire una o più lettere (cognome)
    // (...) è un gruppo di cattura
    // [1-9] prendo una cifra tra 1 e 9
    // [0-9]* la seconda e quelle seguenti possono essere tra 0 e 9
    // ? indica che quello che c'è nel gruppo di cattura è opzionale
    // .test(e) restituisce true se i parametri assegnati vengono rispettati
}


//tests grade book
let gb2 = gbook.GradeBook.fromJSON("libretto.json")
console.log(gb2.toString())
console.log("Crediti sostenuti ", gb2.credits)
console.log("Media pesata", gb2.average)


/*
//tests matricola
console.log(matricolaValida("01234"))
console.log(matricolaValida("0m3433"))
console.log(matricolaValida("012345"))
//tests email
console.log(emailStudenteUnipiValida("g.rossi@studenti.unipi.it"))
console.log(emailStudenteUnipiValida("b.bianchi1@studenti.unipi.it"))
console.log(emailStudenteUnipiValida("j.marino13@studenti.unipi.it"))
console.log(emailStudenteUnipiValida("test"))
console.log(emailStudenteUnipiValida("k.costa@unipi.it"))
console.log(emailStudenteUnipiValida("c.ferrari0@studenti.unipi.it"))
console.log(emailStudenteUnipiValida("d.esposito@studenti.unifi.it"))
 */