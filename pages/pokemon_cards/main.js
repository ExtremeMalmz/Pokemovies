//Webbtjänster - Grupp 1 - Made by Eric Malmström and Anita Olsson

//pokemon cards for the human
const HUMANPOKEMONLINKS = ["https:pokeapi.co/api/v2/pokemon/pikachu", "https:pokeapi.co/api/v2/pokemon/ditto"];
//pokemon cards for the computer
const COMPUTERPOKEMONLINKS = ["https:pokeapi.co/api/v2/pokemon/stunfisk", "https:pokeapi.co/api/v2/pokemon/paras"];
//computer and human variables which are equal to the string of their name
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
        return HUMANPOKEMONLINKS[Math.floor(Math.random()*HUMANPOKEMONLINKS.length)];
    }
}

function setPokemonCard(randomIndex, humanOrComputer){
    /*
    * gets all the data from the pokemon api for the computer and  sets the card data to the HTML
    * @param {randomIndex} the index for the pokemon in the array, which is randomly generated
    * @param {humanOrComputer} a var which is either HUMAN or COMPUTER 
    */

    //initializing local variables
    var pokemonImage = "", pokemonName = "", pokemonHPStats = "", pokemonAttackStats = "", pokemonDefenseStats = "";

    if(humanOrComputer == "COMPUTER"){
        pokemonImage = "computerPokemonImage";
        pokemonName = "computerPokemonName";
        pokemonHPStats = "computerHPStats";
        pokemonAttackStats = "computerAttackStats";
        pokemonDefenseStats = "computerDefenseStats";
    }
    else if(humanOrComputer == "HUMAN"){
        pokemonImage = "humanPokemonImage";
        pokemonName = "HumanPokemonName";
        pokemonHPStats = "HumanHPStats";
        pokemonDefenseStats = "HumanDefenseStats";
        pokemonAttackStats = "HumanAttackStats";
    }

    //fetches data from the array index which is a link to the pokemon page 
    fetch(randomIndex)
    .then((response) => response.json()).then((data) =>{
        console.log(data);

        //this is the pokemon image
        document.getElementById(pokemonImage).src = data.sprites.other["official-artwork"].front_default;
        //pokemon name
        document.getElementById(pokemonName).innerHTML = "Name: " + data.forms[0].name;
        //pokemon HP
        document.getElementById(pokemonHPStats).innerHTML = "HP stats: " + data.stats[0].base_stat;
        //pokemon attack stats
        document.getElementById(pokemonAttackStats).innerHTML = "Attack stats: " + data.stats[1].base_stat;
        //pokemon defense stats
        document.getElementById(pokemonDefenseStats).innerHTML = "Defense stats: " + data.stats[2].base_stat;
    })
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

function createHumanPokemon(){
    /*
    * All things related to creating the human pokemon card happens here
    */

    var randomIndex = generateRandomNumber(HUMAN);
    //generates pokemon data
    setPokemonCard(randomIndex,HUMAN);
}

function main(){
    /*
    * main of the pokemon battle, here the cards for the human and computer are generated when loading the page
    */

    //creates the computers pokemon card
    createComputerPokemon();
    //creates the humans pokemon card
    createHumanPokemon();
    
    //this is how we will send data to the others
    //localStorage.setItem("serialNumber", "abc123def456")
}

function startPokemonBattle(){
    /*
    * Starts the pokemon battle. Puts all the data into local storage and then redirects to battleresults.html
    */

    localStorage.setItem("fishsticks", "123");
    location.href = "./../pokemon_battle/battleresults.html";
}

main();