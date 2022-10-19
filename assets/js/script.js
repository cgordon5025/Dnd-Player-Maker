// curl -X GET "https://www.dnd5eapi.co/api/ability-scores/cha" -H "Accept: application/json"
var saveAbilBtn = document.getElementById('saveAbilScores')
var abilityScoreEl = document.getElementById('scoreInput')
var modsEl = document.getElementsByClassName('mod')
var rollAbilBtn = document.getElementById('rollAbilScores')

console.log(modsEl)
// console.log(abilityScoreEl)
var savedScores = []
var mods = [];

var diceTextEl = document.getElementById('diceRollContainer');
var rerollContainer = document.getElementById('rerollButtonContainer')
saveAbilBtn.addEventListener('click', SaveAbilScore)

// maybe vanilla would work better with bootstrap
rollAbilBtn.addEventListener('click', function () {
    diceTextEl.innerHTML = ''
    rerollContainer.innerHTML = ''
    // diceTextEl.empty()
    for (let i = 0; i < 6; i++) {
        //this acutally 'rolls' the die and shows them to the user
        var oneRollEl = document.createElement('th')
        oneRollEl.setAttribute('scope', 'col')
        //need to add attribute scope = 'col' to properly format the table
        // oneRollEl.attributes(scope = 'col')
        var diceRoll = document.createElement('p')
        //set data attribute so that each button can refer to the specfic roll
        // li.setAttribute("data-index", i);
        diceRoll.textContent = (rollDice(1, 20))
        var d20Img = document.createElement('img')
        d20Img.src = './assets/images/d20_base.png'
        console.log(d20Img)
        oneRollEl.appendChild(d20Img)
        oneRollEl.appendChild(diceRoll)
        diceTextEl.appendChild(oneRollEl)

        //now lets add in the buttons
        var redoEl = document.createElement('td')
        var rerollBtn = document.createElement('button')
        rerollBtn.textContent = ('Reroll')
        rerollBtn.className = "redoroll"
        redoEl.appendChild(rerollBtn)
        rerollContainer.appendChild(redoEl)
    }
});
var dexModEl = $('#dexMod')
// swap out jquery call
//call upon first tr, then datanum have each button refer to specific data num to replace text
var table = document.getElementById('testContainer')
var tableOpt = $('<tr>')
var redoRollEl = $('.redoroll')
// redoRollEl.addEventListener('click','button',reRoll)
// redoRollEl.on('click', "button", reRoll)
function reRoll(event) {
    console.log('clicked')
    var rerollVal = event.target.previousElementSibling
    console.log(rerollVal)
    rerollVal.text(rollDice(1, 20))
}
function rollDice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1))
}

function SaveAbilScore() {
    for (let i = 0; i < abilityScoreEl.length; i++) {
        myScore = parseInt(abilityScoreEl[i].value)
        //need additional conditionals for if the val is less than 10, it must be negative
        if (myScore % 2 === 0) {
            mods.push((10 - myScore) / 2)
        } else {
            mods.push(((11 - myScore) / 2))
        }
        savedScores.push(myScore)
        modsEl[i].textContent = (mods[i])
        //going in order Dex should be at index 2, we want to add to the initiative text as well
        if (i == 2) {
            console.log("in the conditional")
            $('#initiative').text(mods[i])
        }
    }
    // console.log(dexModEl.innerText)
    // console.log(dexModEl)
    // $('#initiative').text(dexModEl.textContent)

    localStorage.setItem("mySavedScore", JSON.stringify(savedScores))
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