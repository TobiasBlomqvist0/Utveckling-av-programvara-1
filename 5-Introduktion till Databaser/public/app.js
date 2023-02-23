const table = document.querySelector("table")

fetchGames()

async function fetchGames() {
    const response = await fetch("/api/games")
    const data = await response.json()

    data.map(game =>
    table.innerHTML += `
    <tr>
        <td>${game.name}</td>
        <td>${game.genre}</td>
        <td>${game.release_date.split(":")[0]}</td>
        <td>${game.publisher}</td>
    </tr>
    `
    )
}