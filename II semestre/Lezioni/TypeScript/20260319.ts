//Lezione 19/03/2026 Laboratorio I - Corso B

//definizione di interfacce

interface LabeledValue{
    label: string
}

function printLable(labeledValue:LabeledValue){
    console.log(labeledValue.label)
}

let o = {size: 10, label: "ciao"}
//l'interfaccia fa il controllo solo sul campo label, non si interessa di size
//in questo caso il label passato è string quindi il controllo va a buon fine
printLable(o);

//la keyword extends funziona anche per le interfacce, le interfacce iniziano con la I maiuscola

interface IPerson{
    name: string
    surname: string
}

interface IEmployee extends IPerson{
    empCode: number
}

let emp: IEmployee = {name: "ciccio", surname: "ciao", empCode: 123456}

//le classi possono implementare con la keyword implements

interface ClockInterface{
    currentTime: Date
    setTime(d: Date): void //le interfacce possono anche includere metodi con i loro tipi
}

//quando uso implements devo necessariamente definire i tipi dell'interfaccia nella classe
class Clock implements ClockInterface{
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }

    constructor(h:number,m:number){}
}
//questo è il vantaggio di typescript, arriviamo a un codice javascript con un codice consistente
//tipo di una funzione

let add: (x:number, y:number) => number = function (x:number, y: number): number{
    return x + y;
}

let add2: (baseValue: number, increment: number) => number = function (x,y):number{
    return x + y
}

//tutti i parametri attuali della funzione vengono passati


//posso definire dei parametri opzionali

function buildName(firstName:string, lastName?:string):string {
    if(lastName) //va SEMPRE controllato che il parametro ci sia
        return firstName + " " + lastName;
    else return firstName;
}
// tipo (firstName: string, lastName?:string|undefined):string

//possiamo anche fare la stessa cosa dando un valore di default

function buildName2(firstName:string, lastName = "Woman") {
    if(lastName) //va SEMPRE controllato che il parametro ci sia
        return firstName + " " + lastName;
    else return firstName;
}

// tipo (firstName: string, lastName?:string):string qui il valore di lastName non sarà mai undefined perché prenderà almeno il valore di default

let res = buildName2("Wonder") //"Wonder Woman"
let res2 = buildName2("Wonder", undefined) //"Wonder Woman

//se ci sono troppi parametri il controllo fallisce



//ESEMPIO DA NON SEGUIRE -> perché spiegato sotto
function buildName3(firstName = "Wonder", lastName: string) {
    if(lastName) //va SEMPRE controllato che il parametro ci sia
        return firstName + " " + lastName;
    else return firstName;
}
//tipo (firstName: string | undefined, lastName: string):string
//i parametri opzionali vanno sempre messi per ULTIMI, altrimenti ts si aspetterà un parametro successivo



