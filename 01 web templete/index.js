//alert('Hej Simon du er fed')

let currentPage = 1 

let pages //array med alle elemtner med class = page
function setup(){
    
 pages = selectAll('.page') 
    setInterval( ()=> {
        let hourZero = minute() < 10 ? "0" : "" 
        let minuteZero = minute() < 10 ? "0" : "" 
        select('#timer_hours').html(hourZero + hour())
        select('#timer_minutes').html(minuteZero + minute())
        select('#timer_seconds').html(second())
    }, 1000)
}

function ShiftPage(num){
    if(num == "ArrowLeft"){
        num = currentPage - 1 
        
    }
    if(num == "ArrowRight"){
        num = currentPage + 1  
        
    }
    if(isNaN(num) || num > pages.length || num == 0){
        return 
    } 
    select("#page" + currentPage ).removeClass("visible")
    currentPage = num
    select("#page" + currentPage ).addClass("visible")
    console.log(currentPage)
}
function keyPressed(){
    ShiftPage(key)
    console.log(key)
}