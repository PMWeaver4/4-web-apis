// /*
// ?   Challenge:
//     - Grab a hold of the HTML elements that are necessary
//     - Use the https://pokeapi.co/ to retrieve the information of a pokemon
//     - The using the input field, a user should be able to type in the pokemon name or number.

//     *HINT There is a mtheod you can use to grab a hold of the value contained within the input field

//     - The button with the text of "Look", should execute a fetch to the Pokemon API
//     The API should return the exact data for the pokemon-name/# that was provided to the input field

//     * You will only need to fetch to one endpoint

//     Display the results within each respected html element

//     * Be suyre to understand the data you are working with to display the results correctly

//     - Name
//     - Image
//     - Stats
//     - Moves

//     Bonus* 
//     - When a user goes and types in another pokeon-name/#, the moves and stats keep stacking on top of the previous dfata.
//     Handle clearing out the past data to present the new data.
// */






// const PokemonSearchButton = document.getElementsByClassName("btn");
// const PokemonSearch = document.getElementsByClassName("search");
// let cardImg = document.getElementsByClassName("img-avatar");


// todoForm.addEventListener("submit", (e) => {
//     // Prevent default refresh of the page, ex, clicking submit on a form
//     e.preventDefault();

//     if(PokemonSearch.value.length === 0){
//         alert('Please provide a name!');
//     } else if (PokemonSearch.value.length > 45) {
//         alert('name too long!');
//         todosInputField.value = "";
//     } else {
//         const pokeName = PokemonSearch;

  
//     }

// })


// const drawCard = async (pokeName) => {
//     try{
//         let url = `https://pokeapi.co/api/v2/pokemon/${pokeName}`;
//         let response = await fetch(url);
//         let json = await response.json();

//         if(json.error) throw new Error(json.error);

//         let myCardData = {
//             img:json.sprites.front_default,
//             name:json.forms[0].name
//             // remaining: json.remaining,
//         };
//         return myCardData;

//     } catch(err){
//         console.log(err);
//         cardRemaining.textContent = err;
//     }
// }

// const start = async() => {
//     let cardId = await createDeckAndGiveId();
//     let card = await drawCard(cardId);

//     cardButton.onclick = async () => {
        
//         let {img, name} = await drawCard(cardId);
        
//         cardImg.src = img;

    

//     }
// };

// start();


// ? Grabbing a hold of our HTML elements
// Grabbing a hold of input + button
let searchInput = document.querySelector(".search");
let searchButton = document.querySelector(".btn");

// Grabbing a hold of our display HTML elements
let pokeName = document.querySelector(".name");
let pokeImg = document.querySelector("#img-avatar");
let pokeStats = document.querySelector(".stats");
let pokeMoves = document.querySelector(".moves");

const displayPokemon = (pokemonObj) => {
    
    pokeName.textContent = pokemonObj.name;
    pokeImg.src = pokemonObj.img;

    //clears out the cache/stacking each time we click the button
    while(pokeStats.firstChild) {
        pokeStats.removeChild(pokeStats.firstChild);
    }
    while(pokeMoves.firstChild){
        pokeMoves.removeChild(pokeMoves.firstChild);
    }

    pokemonObj.stats.forEach((i) => {
        let statName = document.createElement("p");
        statName.textContent = i.stat.Name + " " + i.base_stat;
        pokeStats.appendChild(statName);
    });

    pokemonObj.moves.forEach((i) => {
        let moveName = document.createElement("li");
        moveName.textContent = i.move.name;
        pokeMoves.appendChild(moveName);
    })

};

const getPokemon = async(pokemon) => {
// Storing our fetch URL in a variable
let url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

// ? Using async/await
let res = await fetch(url);
let json = await res.json();
let jsonObj = {
    name: json.name,
    img: json.sprites.front_default,
    moves: json.moves,
    stats: json.stats
};
console.log(jsonObj);
// Call a function to display the data we received - Passing our custom object

displayPokemon(jsonObj);

//?Using .then syntax
// fetch(url)
// .then((res)=> res.json())
// .then((json) => console.log(json));
// };
};

// ? Adding click event to our button
searchButton.addEventListener("click", () => {
    //Grabbing the input field's value
    let input = searchInput.value;
    getPokemon(input);
});

