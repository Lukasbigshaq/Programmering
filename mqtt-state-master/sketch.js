
//denne variabel bruges til at håndtere mqtt
let client 

function setup() {
  createCanvas(windowWidth, windowHeight)

  //vi kan bruge mqtt.connect fordi vi har inkluderet mqtt.js i HTML filen
  client = mqtt.connect('wss://mqtt.nextservices.dk')

  //on er en asynkron EVENT, som kaldes når vi får en besked fra mqtt serveren 
  client.on('connect', function(svar){
    console.log(svar, 'serveren er klar til mqtt kommunikation')
  })

  //nu vil vi gerne subscribe på et emne
  client.subscribe('state_machine') 

  //og så skal vi sætte den LISTENER op som skal modtage input fra MQTT
  client.on('message', function(emne, besked){
    //emnet kommer som en string 
    console.log(emne)
    //beskeden skal vi lige parse før vi kan læse den
    console.log(besked.toString())
    //det vi får fra m5'eren er i det her eksempel JSON format 
  })
}

function draw(){
  clear()
  if(state == 'setup'){
  }
  if(state == 'game'){
  }
  if(state == 'gameover'){
  }
}