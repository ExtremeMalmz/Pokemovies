//Webbtjänster - Grupp 1 - Made by Eric Malmström and Anita Olsson

const HUMANPOKEMONLINKS = [];
//as a general rule the computer should have worse pokemon than the human 
const COMPUTERPOKEMONLINKS = ["https:pokeapi.co/api/v2/pokemon/pikachu", "https:pokeapi.co/api/v2/pokemon/ditto"];

const COMPUTER = "COMPUTER", HUMAN = "HUMAN";

function generateRandomNumber(humanOrComputer){
    /*
    * generates a random number based on the array length of the computer/human arraay
    * @param {humanOrComputer} a var which is either HUMAN or COMPUTER 
    * @return {randomIndex} the random number of the array index
    */

    if(humanOrComputer == "COMPUTER"){
        return COMPUTERPOKEMONLINKS[Math.floor(Math.random()*COMPUTERPOKEMONLINKS.length)];
    }
    else if(humanOrComputer == "HUMAN"){
        //todo
        return 0;
    }

}

function setPokemonCard(randomIndex, humanOrComputer){
    /*
    * gets all the data from the pokemon api for the computer and  sets the card data to the HTML
    * @param {randomIndex} the index for the pokemon in the array, which is randomly generated
    * @param {humanOrComputer} a var which is either HUMAN or COMPUTER 
    */

    if(humanOrComputer == "COMPUTER"){
        //fetches data from the array index which is a link to the pokemon page 
        fetch(randomIndex)
        .then((response) => response.json()).then((data) =>{
            console.log(data);

            //this is the pokemon image
            document.getElementById("computerPokemonImage").src = data.sprites.other["official-artwork"].front_default;
            //pokemon name
            document.getElementById("computerPokemonName").innerHTML = "Name: " + data.forms[0].name;
            //pokemon HP
            document.getElementById("computerDefenseStats").innerHTML = "HP stats: " + data.stats[0].base_stat;
            //pokemon attack stats
            document.getElementById("computerAttackStats").innerHTML = "Attack stats: " + data.stats[1].base_stat;
            //pokemon defense stats
            document.getElementById("computerAttackStats").innerHTML = "Defense stats: " + data.stats[2].base_stat;
        })
    }
    else if(humanOrComputer == "HUMAN"){
        //todo  
    }
}



function createComputerPokemon(){
    /*
    * All things related to generating the computer pokemon card gets done here
    */

    //generates random array number
    var randomIndex = generateRandomNumber(COMPUTER);
    //generates the pokemon data
    setPokemonCard(randomIndex, COMPUTER);
}

function main(){
    /*
    * main of the pokemon battle, here the cards for the human and computer are generated when loading the page
    */


    createComputerPokemon();
    
    //this is how we will send data to the others
    //localStorage.setItem("serialNumber", "abc123def456")
}

main();