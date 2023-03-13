const weatherYear = window.location.pathname.split("/")[2]
const table = document.querySelector("table")

const years = [2017, 2018, 2019, 2020, 2021]

fetchWeatherYear()
MakeYearOptions()

async function fetchWeatherYear() {
    const response = await fetch(`/api/temperature/${weatherYear}`)
    const data     = await response.json()

    
    data.map(weather => table.innerHTML += `
    <tr>
    <td>${weather.country}</td>
    <td>${weather.year}</td>
    <td>${weather.averageTemperature}</td>
    </tr>
    `).join("");
}

function MakeYearOptions() {
    years.map(year => inputs.innerHTML += `
        <div class="YearOptions">
            <label>${year}</label>
            <input type="checkbox" id="${year}" onclick="yearOption(${year})">
        </div>
    `)
}

function yearOption(year) {
    location.replace(`/api/temperature/${year}`)
    location.replace(`/temperature/${year}`)
}