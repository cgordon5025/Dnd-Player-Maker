// curl -X GET "https://www.dnd5eapi.co/api/ability-scores/cha" -H "Accept: application/json"
var saveAbilBtn = document.getElementById('saveAbilScores')
var abilityScoreEl = $(".scoreInput");
var modsEl = $(".mod")
console.log(modsEl)
console.log(abilityScoreEl)
var savedScores = []
var mods = []
saveAbilBtn.addEventListener('click', SaveAbilScore)

function SaveAbilScore() {
    for (let i = 0; i < abilityScoreEl.length; i++) {
        if (abilityScoreEl[i].value % 2 === 0) {
            mods.push(abilityScoreEl[i] / 2)
        } else {
            mods.push((abilityScoreEl[i] / 2) - 1)
        }
        savedScores.push(abilityScoreEl[i].value)
        modsEl[i].textContent = (mods[i])
    }

    localStorage.setItem("mySavedScore", JSON.stringify(savedScores))
}
function abilityMod() {
    for (let i = 0; i < abilityScoreEl.length; i++) {
        if (abilityScoreEl[i].value % 2 === 0) {
            mods.push(abilityScoreEl[i] % 2)
        } else {
            mods.push((abilityScoreEl[i] % 2) - 1)
        }
    }
}
// var DndURL = "https://www.dnd5eapi.co/api/"
// async function DndAPI() {
//     let myData = fetch(DndURL)
//         .then(function (response) {
//             return response.json()
//         })
//         .then(function (data) {
//             console.log(data)
//             return data
//         })
//     return myData
// }
// function init() {
//     DndAPI().then(console.log(data))
// }
// init()