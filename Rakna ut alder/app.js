const btn = document.querySelector("button")

btn.addEventListener("click", () => {
    CalcYearAndDays()
})


function CalcYearAndDays() {
    const Born = document.querySelector("#born").value

    const PersonBorn = new Date(Born)
    const currentDate = new Date()

    const Diffrence = currentDate.getTime() - PersonBorn.getTime()

    const days = Diffrence / (1000 * 60 * 60 * 24)

    const years = Math.floor(days / 365)

    const totalDays = Math.floor(days - (years * 365))

    console.log(years, totalDays)
}