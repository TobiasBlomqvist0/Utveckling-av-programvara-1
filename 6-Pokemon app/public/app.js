const divPokemons = document.querySelector("#pokemons")
const btn = document.querySelector("button")

fetchPokemons()

let allPokemons;

async function fetchPokemons() {
    const response = await fetch("/api/pokemons")
    const data = await response.json()
    
    allPokemons = data
    writePokemons(data)
}

function writePokemons(data) {
    divPokemons.innerHTML = ""
    data.map(pokemons =>
        divPokemons.innerHTML += `
        <div class="pokemon">
            <span class="pokemonName">${pokemons.name}</span>

            <div class="pokemonImage">
                <img src="https://img.pokemondb.net/artwork/large/${pokemons.name}.jpg" alt="${pokemons.name} 'Picture'">
            </div>
        </div>
        `
    )
}

btn.addEventListener("click", () => {
    findPokemon()
})

function findPokemon() {
    const searchName = document.querySelector("#searth").value
    const data = {value: searchName}
    console.log(data)

    fetch("/api/pokemon/searth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    .then((response) => response.json())
    .then((data) => {
        console.log("Success:", data)
        writePokemons(data)
    })
    .catch((error) => {
        console.log("Error", error)
    })
}

//Sort id From 1 to 151

const sortTop = document.querySelector("#Top")

sortTop.addEventListener("click", () => {
    sortIdTop()
})

function sortIdTop() {
    allPokemons.sort( compareTop )
    writePokemons(allPokemons)
}

function compareTop( a,b ) {
    if( a.id < b.id) {
        return -1;
    }
    if( a.id > b.id) {
        return 1;
    }
    return 0;
}

//Sort from 151 to 1

const sortBottom = document.querySelector("#Down")

sortBottom.addEventListener("click", () => {
    sortIdBottom()
})

function sortIdBottom() {
    allPokemons.sort( compareBottom )
    writePokemons(allPokemons)
}

function compareBottom( a,b ) {
    if( a.id > b.id) {
        return -1;
    }
    if( a.id < b.id) {
        return 1;
    }
    return 0;
}