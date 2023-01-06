//Webbtjänster - Grupp 1 - Made by Eric Malmström and Anita Olsson

//pokemon cards for the human
const HUMANPOKEMONLINKS = ["https:pokeapi.co/api/v2/pokemon/pikachu", "https:pokeapi.co/api/v2/pokemon/ditto","https:pokeapi.co/api/v2/pokemon/bulbasaur","https:pokeapi.co/api/v2/pokemon/turtwig","https:pokeapi.co/api/v2/pokemon/charmander","https:pokeapi.co/api/v2/pokemon/charizard","https:pokeapi.co/api/v2/pokemon/raichu","https:pokeapi.co/api/v2/pokemon/bruxish","https:pokeapi.co/api/v2/pokemon/magikarp","https:pokeapi.co/api/v2/pokemon/hitmonlee","https:pokeapi.co/api/v2/pokemon/lickilicky","https:pokeapi.co/api/v2/pokemon/garbodor"];
//pokemon cards for the computer
const COMPUTERPOKEMONLINKS = ["https:pokeapi.co/api/v2/pokemon/natu", "https:pokeapi.co/api/v2/pokemon/paras","https:pokeapi.co/api/v2/pokemon/flapple","https:pokeapi.co/api/v2/pokemon/jynx"];
//computer and human variables which are equal to the string of their name
const COMPUTER = "COMPUTER", HUMAN = "HUMAN";

function generateRandomNumber(humanOrComputer) {
    /*
    * generates a random number based on the array length of the computer/human arraay
    * @param {humanOrComputer} a var which is either HUMAN or COMPUTER 
    * @return {randomIndex} the random number of the array index
    */

    if (humanOrComputer == "COMPUTER") {
        return COMPUTERPOKEMONLINKS[Math.floor(Math.random() * COMPUTERPOKEMONLINKS.length)];
    }
    else if (humanOrComputer == "HUMAN") {
        return HUMANPOKEMONLINKS[Math.floor(Math.random() * HUMANPOKEMONLINKS.length)];
    }
}

function setPokemonCard(randomIndex, humanOrComputer) {
    /*
    * gets all the data from the pokemon api for the computer and  sets the card data to the HTML
    * @param {randomIndex} the index for the pokemon in the array, which is randomly generated
    * @param {humanOrComputer} a var which is either HUMAN or COMPUTER 
    */

    //initializing local variables
    var pokemonImage = "", pokemonName = "", pokemonHPStats = "", pokemonAttackStats = "", pokemonDefenseStats = "";

    if (humanOrComputer == "COMPUTER") {
        pokemonImage = "computerPokemonImage";
        pokemonName = "computerPokemonName";
        pokemonHPStats = "computerHPStats";
        pokemonAttackStats = "computerAttackStats";
        pokemonDefenseStats = "computerDefenseStats";
    }
    else if (humanOrComputer == "HUMAN") {
        pokemonImage = "humanPokemonImage";
        pokemonName = "HumanPokemonName";
        pokemonHPStats = "HumanHPStats";
        pokemonDefenseStats = "HumanDefenseStats";
        pokemonAttackStats = "HumanAttackStats";
    }

    //fetches data from the array index which is a link to the pokemon page 
    fetch(randomIndex)
        .then((response) => response.json()).then((data) => {
            //console.log(data);

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

            //set the pokemon type 
            if (humanOrComputer == "HUMAN") {
                localStorage.setItem("pokemonType", data.types[0].type.name)
                //console.log(data.types[0].type.name);
            }
        })
}

function createComputerPokemon() {
    /*
    * All things related to generating the computer pokemon card gets done here
    */

    //generates random array number
    var randomIndex = generateRandomNumber(COMPUTER);
    //generates the pokemon data
    setPokemonCard(randomIndex, COMPUTER);
}

function createHumanPokemon() {
    /*
    * All things related to creating the human pokemon card happens here
    */

    var randomIndex = generateRandomNumber(HUMAN);
    //generates pokemon data
    setPokemonCard(randomIndex, HUMAN);
}

function main() {
    /*
    * main of the pokemon battle, here the cards for the human and computer are generated when loading the page
    */

    //creates the computers pokemon card
    createComputerPokemon();
    //creates the humans pokemon card
    createHumanPokemon();
}

function pokemonAttack(hp, defensepoints, attackpoints) {
    /* 
    * One pokemon attacks the other here 
    * @param {hp} the hp of the  defending pokemon that is to be attacked
    * @param {defensepoints} the defense points of the defending pokemon
    * @param {attackpoints} the offensive pokemons attack points
    */

    //console.log("PARAMETERS-hp: " + hp + " d: " + defensepoints + " a:" + attackpoints);

    //random integers for both attack and defense are made here
    var newAttackPoints = Math.floor(Math.random() * attackpoints);
    var newDefensePoints = Math.floor(Math.random() * defensepoints);

    if (newDefensePoints >= newAttackPoints) {
        //if the defense is greater than the attackpoints then no damage is taken
        //console.log("no damage");
        return hp;
    }
    else {
        //if it isnt then the attack points are subtracted by the defense points and then minused by the hp
        //console.log("fight: " + hp + " " + newAttackPoints + " " + newDefensePoints);
        //  console.log( hp - (newAttackPoints - newDefensePoints));

        return hp - (newAttackPoints - newDefensePoints);
    }
}

function startPokemonBattle() {
    /*
    * Starts the pokemon battle. Puts all the data into local storage and then redirects to battleresults.html
    */

    //takes whats on the corresponding HTML element and transforms it into a number
    var humanPokemonName = document.getElementById("HumanPokemonName").textContent;
    var humanPokemonHP = parseInt(document.getElementById("HumanHPStats").textContent.replace(/\D/g, ''));
    var humanPokemonDefense = parseInt(document.getElementById("HumanDefenseStats").textContent.replace(/\D/g, ''));
    var humanPokemonAttack = parseInt(document.getElementById("HumanAttackStats").textContent.replace(/\D/g, ''));

    var computerPokemonHP = parseInt(document.getElementById("computerHPStats").textContent.replace(/\D/g, ''));
    var computerPokemonDefense = parseInt(document.getElementById("computerAttackStats").textContent.replace(/\D/g, ''));
    var computerPokemonAttack = parseInt(document.getElementById("computerDefenseStats").textContent.replace(/\D/g, ''));

    var originalHumanPokemonHP = humanPokemonHP;

    //original health of the pokemon
    if (localStorage.getItem("originalHealth") == "null") {
        //console.log("OG HP set");   
        localStorage.setItem("originalHealth", originalHumanPokemonHP);
    }


    //--- `***GAME STARTS HERE*** ---
    var victory = false;

    //the human pokemon attacks the computers
    computerPokemonHP = pokemonAttack(computerPokemonHP, computerPokemonDefense, humanPokemonAttack);
    document.getElementById("computerHPStats").innerHTML = "HP: " + computerPokemonHP;

    //checks to see if computers pokemons health is greater than 0
    console.log("Computer hp: " + computerPokemonHP + " Human HP: " + humanPokemonHP);
    if (computerPokemonHP <= 0) {
        //console.log("HUMAN WON");
        localStorage.setItem("winOrLose", "WIN");
        localStorage.setItem("totalHealthLeft", humanPokemonHP / originalHumanPokemonHP);
        localStorage.setItem("pokemonName", humanPokemonName);
    }

    //the computer pokemon attacks the humans
    humanPokemonHP = pokemonAttack(humanPokemonHP, humanPokemonDefense, computerPokemonAttack);
    document.getElementById("HumanHPStats").innerHTML = "HP: " + humanPokemonHP;

    //if the human pokemon loses this happens
    if (humanPokemonHP <= 0) {
        localStorage.setItem("winOrLose", "LOSE");
        console.log("COMPUTER WON");
    }

    //this is just a sort of visual metaphor for the attacks
    //if computer pokemon image is its original color 
    if (document.getElementById("HumanPokemonImage").style.backgroundColor == "cornsilk") {
        //set HTML elements for the human pokemon
        document.getElementById("HumanHPStats").style.color = "red";
        document.getElementById("HumanPokemonImage").style.backgroundColor = "black";
        //reset the computers HTML elements
        document.getElementById("computerHPStats").style.color = "black";
        document.getElementById("ComputerPokemonImage").style.backgroundColor = "greenyellow";
    }
    //if the computers pokemon is black background
    else {
        //set the HTML elements to their updated values for the computer
        document.getElementById("computerHPStats").style.color = "red";
        document.getElementById("ComputerPokemonImage").style.backgroundColor = "black";
        //reset the humans image background color
        document.getElementById("HumanHPStats").style.color = "black";
        document.getElementById("HumanPokemonImage").style.backgroundColor = "cornsilk";
    }

    //if the computer pokemon faints
    if (computerPokemonHP <= 0) {
        console.log("HUMAN WINS");

        localStorage.setItem("winOrLose", "WIN");
        
        originalHumanPokemonHP = localStorage.getItem("originalHealth");
        //console.log("ORIGINAL HP: " + originalHumanPokemonHP + " NEWHP: " + humanPokemonHP );
        //console.log((humanPokemonHP / originalHumanPokemonHP) * 100);
        //this is the score, *100 to make it into a good integer
        localStorage.setItem("totalHealthLeft", (humanPokemonHP / originalHumanPokemonHP) * 100);
        localStorage.setItem("pokemonName", humanPokemonName);
        
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        location.href = "./../movie_reccomendation/goodmovies/goodmovies.html";
        victory = true;

        //need to set this to null for the game to work properly
        localStorage.setItem("originalHealth","null");
    }
    else if (humanPokemonHP <= 0) {
        //need to set this to null for the game to work properly
        localStorage.setItem("originalHealth","null");
                //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

        location.href = "./../movie_reccomendation/badmovies/badmovies.html";
    }


}

main();