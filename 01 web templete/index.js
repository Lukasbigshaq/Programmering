//alert('Hej Simon du er fed')

let currentPage = 1 

let pages //array med alle elemtner med class = page
function setup(){
    
 pages = selectAll('.page') 

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