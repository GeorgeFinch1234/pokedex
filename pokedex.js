
const pokemonContainer = document.getElementById("pokemonList")
let pokemonSelected;
let pokemon; 

//get the first 300 pokem, change limit to get diffenret amount.



async function getData() {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=300&offset=0").then(Response => Response.json())
    .then(data=>{
        data.results.forEach(element => {
            console.log(element.name)
           pokemon = document.createElement(`p`)
           pokemon.textContent = (element.name)
           pokemonContainer.appendChild(pokemon);
        });
    })

}

getData();