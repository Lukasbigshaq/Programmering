let m5Name, m5Status

//denne variabel bruges til at håndtere mqtt

let client 

function setup() {
    //vi kan bruge mqtt.connect fordi vi har inkluderet mqtt.js i HTML filen 
    client = mqtt.connect('wss://mqtt.nextservcies.dk')

    //on er en asynkron EVENT, som kaldes når vi får 
    client.on ('connect', function(svar){
        console.log(svar, 'serveren er klar til mqtt kommunikation')
    })

    //nu vil vi gerne subscribe på et emne 
    client.subscribe('programmering')

    //og så skal vi sætte den LISTNER op som skal modtage input fra MQTT 
    client.on('message', function(emne, besked){
        //emnet kommer en strin
        console.log(emne)
        //bsekeden skal vi lige parse før vi kan læse den 
        console.log(besked.toString())
    })
}