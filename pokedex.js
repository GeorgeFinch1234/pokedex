
const pokemonContainer = document.getElementById("pokemonList")
let pokemonSelected;
let pokemon; 

//get the first 300 pokem, change limit to get diffenret amount.



async function getData() {
    let pokemonIndex=1;
    fetch("https://pokeapi.co/api/v2/pokemon?limit=300&offset=0").then(Response => Response.json())
    .then(data=>{
        console.log(data)
        data.results.forEach(element => {
            console.log(element.name)
           pokemon = document.createElement(`p`)
           pokemon.textContent = (pokemonIndex  + ". " + element.name)
           pokemon.classList.add("pokemonListEntry")
           pokemonContainer.appendChild(pokemon);
           
            pokemonIndex = pokemonIndex +1;
        });
    })

}

getData();