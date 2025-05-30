
const pokemonContainer = document.getElementById("pokemonList")
const pokemonSprites =document.getElementById("selectedPokemonImg")
const pokemonInfo =document.getElementById("pokemonDescription")
const pokemonType =document.getElementById("pokemonType")
let pokemonSelected;
let pokemon; 

//get the first 300 pokem, change limit to get diffenret amount.



async function getData() {
    let pokemonIndex=1;
    fetch("https://pokeapi.co/api/v2/pokemon?limit=300&offset=0").then(Response => Response.json())
    .then(data=>{
        console.log(data)
        data.results.forEach(element => {
            //simply for the event listener so closure doesn't keep triggering same balue
            let currentIndex = pokemonIndex;
           pokemon = document.createElement(`p`)
           pokemon.textContent = (pokemonIndex  + ". " + element.name)
           pokemon.classList.add("pokemonListEntry")
           pokemonContainer.appendChild(pokemon);
           pokemon.addEventListener("click", ()=>{
            displayPokemon(currentIndex);
           })
           
            pokemonIndex = pokemonIndex +1;
        });
    })

}


async function displayPokemon(pokemonIndex){
    //clears last pokemon type
    pokemonType.innerHTML =""
    fetch("https://pokeapi.co/api/v2/pokemon/" +pokemonIndex).then(Response=>Response.json())
    .then(data=>{
        console.log(data)
        pokemonSprites.src=data.sprites.front_shiny
        pokemonSprites.alt="img of shinny " + data.name;
data.types.forEach(type=>{
    console.log(type)
let typeToBeInputter = document.createElement("p")
typeToBeInputter.textContent=type.type.name;
    pokemonType.appendChild(typeToBeInputter)
    typeToBeInputter.classList.add(type.type.name)


})


        fetch(data.species.url).then(Response => Response.json()).then(data=>{
          
            pokemonInfo.textContent=data.flavor_text_entries[9].flavor_text 
        
       
        
    })
    })

}

getData();