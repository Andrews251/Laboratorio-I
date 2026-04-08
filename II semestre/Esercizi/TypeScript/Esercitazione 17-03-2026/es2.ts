enum Level{
    info = "INFO",
    warning = "WARNING",
    error = "ERROR"
}

class UnknownLevel extends Error{}
class Logger{
    static reg : string[] = []
    static log(level:Level,message:string):void{
        if(!(level in Level))
            throw new UnknownLevel()
        Logger.reg.push(level + " : " + message)
        console.log(level + " : " + message)
    }
    static history():void{
        for(let i of Logger.reg)
            console.log(i)
    }
}

Logger.log(Level.info,"errore")
Logger.log(Level.info,"errore")
Logger.log(Level.warning,"errore")
Logger.log(Level.error,"errore")
Logger.history()