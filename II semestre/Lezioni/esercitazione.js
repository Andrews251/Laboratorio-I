//Esercitazione

class Grade extends Error{
    name
    credits
    date
    grade
    honors
    constructor(name,credits,date,grade,honors) {
        this.name = name; //nome
        this.credits = credits; //crediti
        this.date = new Date(date); //data
        this.grade = grade; //voto
        this.honors = honors; //lode
    }
    if(this.credits < 0)
        throw new InvalidCreditsError("Credit must be greater than 0");
    equals(g){
        return this.grade === g;
    }
    toString(){
        return `Grade ${this.name} ${this.credits} ${this.date} ${this.grade}, ${this.honors? this.honors : ""}`;
    }

}

class InvalidCreditsError extends Error{

}
class InvalidValueError extends Error{

}

class GradeBook extends Grade{
    constructor(grades, totalCredits, credits, missingCredits, average, startingGrade) {
        super();
    }
}

class BachelorGradeBook extends Grade{

}
class MasterGradeBook extends Grade{

}


