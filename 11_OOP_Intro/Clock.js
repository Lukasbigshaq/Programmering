console.log('Clock is here') 

//Når en klasses objekter kan opføre sig forskelliget afhæning af argumenter i contructoren
//kaldes det POLYMORFI
class Clock { 
    //constructorien er klassens "setup" funktion som kaldes når vi opretter nye objekter med klassen 
    constructor(div, style){ 
        this.div = div
        this.style = style
        // div´s for hours,minutes,seconds
        this.hDiv = createDiv()
        this.mDiv = createDiv()
        this.sDiv = createDiv()

        this.div.child(this.hDiv)
        this.div.child(this.mDiv)
        this.div.child(this.sDiv)
        //interval til at sætte tiden ind 
        this.interval
        //this.start er en intern funktion som starter uret 
        
        //styles 
        this.div.style('width', '16rem')
        this.div.style('height', '5rem')
        this.div.style('border', '4 px dotted gray')
        this.div.style('display', 'grid')
        this.div.style('display', 'grid')
        this.div.style('place-items', 'center')
        this.div.style('padding', '1rem') 
        this.div.style('border-radius', '2rem')
        //reager på argumentet style fra constructoren 
        switch(style){
            case 'pink' : 
            this.div.style('background', 'hotpink')
            return
            case 'black' : 
            this.div.style('background', 'black')
            this.div.style('color', 'white')
            return
            
        }


    }
    start(){
        this.interval = setInterval( ()=>{
            //den her kompakte linje kode betyder at vi SPØGER om hour() 
            //et tal UNDER ti - hvis ja sætter vi et nul foran
            this.hDiv.html( hour() < 10 ? '0' + hour() : hour() )
            this.mDiv.html( minute() < 10 ? '0' + minute() : minute() )
            this.sDiv.html( second() < 10 ? '0' + second() : second() )
        }, 1000)
    }
    stop(){
        clearInterval(this.interval)
    }
}