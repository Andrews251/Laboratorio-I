//Esercitazione
//Classi per gli errori
import * as fs from "fs";
class InvalidCreditsError extends Error {}
class InvalidValueError extends Error {}
class DuplicatedGradeError extends Error {}
class MissingCreditsError extends Error {}

class Grade {
    #name
    #credits
    #date
    #grade
    #honors
    constructor(name,credits,grade,date,honors = false) {
        if(credits <= 0)
            throw new InvalidCreditsError(`Il numero di crediti deve essere positivo`);
        if(grade < 18 || grade > 30)
            throw new InvalidValueError(`Il voto deve essere compreso tra 18 e 30`);
        if(honors && grade !== 30)
            throw new InvalidValueError("Per inserire la lode il voto deve essere 30!")

        this.#name = name;
        this.#credits = credits
        this.#grade = grade
        this.#date = new Date(date).toISOString().split('T')[0];
        this.#honors = honors;

    }
    //getters
    get name(){return this.#name}
    get credits(){return this.#credits}
    get grade(){return this.#grade}
    get date(){return this.#date}
    get honors(){return this.#honors}

    equals(g){
        return  this.name === g.name &&
                this.credits === g.credits &&
                (this.date - g.date) === 0 &&
                this.grade === g.grade &&
                this.honors === g.honors

    }
    toString(){
        return `Esame: ${this.#name} (${this.#credits} CFU), sostenuto il: ${this.#date} con votazione ${this.#grade}${this.#honors? 'L':''}`
    }
    toJSON(){
        return{
            name: this.name,
            credits: this.credits,
            grade: this.grade,
            date: this.date,
            honors: this.honors
        }
    }
}

class GradeBook{
    #grades
    #totalCredits
    constructor(totalCredits) {
        this.#grades = []
        this.#totalCredits = totalCredits
    }
    get totalCredits(){return this.#totalCredits}
    get credits(){
        return this.#grades.reduce((tot, g) => tot + g.credits, 0)
    }
    get missingCredits(){
        return this.totalCredits - this.credits
    }
    get average() {
        return Number((this.#grades.reduce((tot, g) => tot + g.credits * (g.honors? g.grade + 2: g.grade),0))/this.credits).toFixed(2)
    }

    get startingGrade(){
        if(this.missingCredits !== 0)
            throw new MissingCreditsError("Non sono stati ancora raggiunti tutti i crediti")
        else
            return Math.round((this.average*11)/3)
    }

    register(grade){
        if(!(grade instanceof Grade))
            throw new TypeError('Questo non è un voto')
        if(this.#grades.some((g) => g.equals(grade)))
            throw new DuplicatedGradeError('Questo voto è già stato inserito')
        this.#grades.push(grade)
    }
    toString(){
        let s = "Registro: \n"
        for(let i of this.#grades){
            s += '\t' + i.toString() + '\n'
        }
        return s
    }
    exportJSON(f){
        let s = JSON.stringify({grades: this.#grades, totalCredits: this.#totalCredits})
        fs.writeFileSync(f, s)
    }
    static fromJSON(f){
        let s = fs.readFileSync(f)
        let o = JSON.parse(s)
        let gb = new GradeBook(o.totalCredits)
        gb.#grades = o.grades.map(gr => new Grade(gr.name,gr.credits, gr.grade, gr.date, gr.honors))
        return gb
    }
}

class BachelorGradeBook extends GradeBook{
    constructor() {
        super(180);
    }
}
class MasterGradeBook extends GradeBook{
    constructor() {
        super(120);
    }
}


export{
    Grade, GradeBook, BachelorGradeBook, MasterGradeBook,InvalidValueError, InvalidCreditsError, DuplicatedGradeError, MissingCreditsError
}