
const pokemonContainer = document.getElementById("pokemonList")
const pokemonSprites = document.getElementById("selectedPokemonImg")
const pokemonInfo = document.getElementById("pokemonDescription")
const pokemonType = document.getElementById("pokemonType")
const SelectedPokemonContainer = document.getElementById("SelectedPokemonInfo")

let pokemonSelected;
//holder for each pokemon in the list
let pokemon;

//get the first 300 pokemon, change limit to get different amount.
async function getData() {
    let pokemonIndex = 1;
    fetch("https://pokeapi.co/api/v2/pokemon?limit=300&offset=0").then(Response => Response.json())
        .then(data => {

            data.results.forEach(element => {
                //simply for the event listener so closure doesn't keep triggering same value
                let currentIndex = pokemonIndex;
                //creating the list entried
                pokemon = document.createElement(`p`)
                pokemon.textContent = (pokemonIndex + ". " + element.name)
                pokemon.classList.add("pokemonListEntry")
                pokemonContainer.appendChild(pokemon);
                pokemon.addEventListener("click", () => {
                    displayPokemon(currentIndex);

                    for (const child of SelectedPokemonContainer.children) {
                        //so cant spam it and turn it off by clicking multiple pokemon else do toggle
                        if (child.id == "spinningWheel") {
                            child.classList.remove("hide")
                        } else {
                            child.classList.add("hide")
                        }

                    }

                })

                pokemonIndex = pokemonIndex + 1;
            });
        })

}


async function displayPokemon(pokemonIndex) {
    //clears last pokemon type
    pokemonType.innerHTML = ""
    fetch("https://pokeapi.co/api/v2/pokemon/" + pokemonIndex).then(Response => Response.json())
        .then(data => {

            pokemonSprites.src = data.sprites.front_shiny
            pokemonSprites.alt = "img of shiny " + data.name;

            //so when img is loaded it show all the content
            pokemonSprites.onload = () => {
                for (const child of SelectedPokemonContainer.children) {
                    //so cant spam it and turn it off by clicking multiple pokemon else do toggle
                    if (child.id == "spinningWheel") {
                        child.classList.add("hide")
                    } else {
                        child.classList.remove("hide")
                    }

                }
            }



            data.types.forEach(type => {

                let typeToBeInputter = document.createElement("p")
                typeToBeInputter.textContent = type.type.name;
                pokemonType.appendChild(typeToBeInputter)
                typeToBeInputter.classList.add(type.type.name)


            })


            fetch(data.species.url).then(Response => Response.json()).then(data => {

                pokemonInfo.textContent = data.flavor_text_entries[9].flavor_text



            })
        })

}

getData();