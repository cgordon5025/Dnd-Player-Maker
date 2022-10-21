//removed jQuery code for reference
// var abilityScoreEl = $(".scoreInput");
// var modsEl = $(".mod")
var diceTextEl = $('#diceRollContainer');
var rollAbilBtn = $('#rollAbilScores')

//the roll stats button
rollAbilBtn.on('click', function () {
    diceTextEl.innerHTML = ''
    // diceTextEl.empty()
    for (let i = 0; i < 6; i++) {
        var oneRollEl = $('<li></li>')
        oneRollEl.text(rollDice(0, 20))

        var rerollBtn = $('<button></button>')
        rerollBtn.text('Redo roll Value')
        rerollBtn.addClass('redoroll')
        oneRollEl.append(rerollBtn)
        diceTextEl.append(oneRollEl)
        console.log(redoRollEl)
    }
});

var dexModEl = $('#dexMod')
