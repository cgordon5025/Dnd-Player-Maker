// curl -X GET "https://www.dnd5eapi.co/api/ability-scores/cha" -H "Accept: application/json"
var saveAbilBtn = document.getElementById('saveAbilScores')
var abilityScoreEl = $(".scoreInput");
var modsEl = $(".mod")
var rollAbilBtn = $('#rollAbilScores')
// var rollAbilBtn = document.getElementById('rollAbilScores')
var diceModal = $('#myModal')
console.log(modsEl)
console.log(abilityScoreEl)
var savedScores = []
var mods = [];
var d20 = 20;
var modalTextEl = $('.modal-body');
saveAbilBtn.addEventListener('click', SaveAbilScore)
// rollAbilBtn.addEventListener('click', showDice)
var dialog = document.getElementById('dialog')
console.log(dialog)
// maybe vanilla would work better with bootstrap
$(function () {
    dialog.dialog();
});
rollAbilBtn.on('click', function () {
    diceModal.show()
    modalTextEl.empty()
    for (let i = 0; i < 6; i++) {
        var oneRoll = rollDice(0, 20)
        var oneRollEl = $('<li></li>')
        oneRollEl.text(oneRoll)
        modalTextEl.append(oneRollEl)
    }
});
function rollDice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1))
}
$('.close').on('click', function () {
    diceModal.hide()
})
// diceModal.draggable({
//     //handle is where i grab to drag it
//     handle: ".modal-header"
// });
// $('#rollAbilScores').on('shown.bs.modal', function () {
//     $('#myInput').trigger('focus')
// })
function showDice() {
    diceModal.modal()
}
// $(document).ready(function () {
//     $('#rollAbilScores').click(function () {
//         $("#myModal").modal();
//     });
// });
function SaveAbilScore() {
    for (let i = 0; i < abilityScoreEl.length; i++) {
        myScore = parseInt(abilityScoreEl[i].value)
        if (myScore % 2 === 0) {
            mods.push(myScore / 2)
        } else {
            mods.push((myScore / 2) - 1)
        }
        savedScores.push(myScore)
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