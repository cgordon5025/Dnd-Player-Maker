// curl -X GET "https://www.dnd5eapi.co/api/ability-scores/cha" -H "Accept: application/json"
//save of all these in database if/when i want to convert and adapt this
//button elements 
var saveAbilBtn = document.getElementById('saveAbilScores')
var rollAbilBtn = document.getElementById('rollAbilScores')
var randomizeBioBtn = document.getElementById('randomizeBio')
var saveBioBtn = document.getElementById("saveBio")
var saveProfBtn = document.getElementById('saveProf')
var HPBtn = document.getElementById('HPBtn')
var levelUpBtn = document.getElementById('levelUp')
var invBtn = document.getElementById('saveInv')
var moreInv = document.getElementById('addMore')

//containers
var abilityScoreEl = document.getElementsByClassName('scoreInput')
var rollContainer = document.getElementById('diceContainer')
var diceTextEl = document.getElementById('diceRollContainer');
var rerollContainer = document.getElementById('rerollButtonContainer')
var invContainer = document.getElementById('invContainer')
//there should be 24 of these
var profEl = document.querySelectorAll('.proficiency')
var profBonusEl = document.querySelectorAll('.profBonus')
var profBonusVal = parseInt(document.getElementById("profValue").innerHTML)

//input variables
var raceInputEl = document.getElementById("raceInput");
var classInputEl = document.getElementById("classInput");
var alignmentInputEl = document.getElementById("alignmentInput");
var backgroundInputEl = document.getElementById("backgroundInput")
var levelEl = document.getElementById('level')
var speedEl = document.getElementById('speed')
var weapons = document.getElementById('weaponsContainer').querySelectorAll('input')
// var inventoryEl = document.getElementById('inventory')
// console.log(inventoryEl)
var inventoryEl = document.getElementById('invContainer').children
//text elements
var modsEl = document.getElementsByClassName('mod')
var bioEl = document.getElementsByClassName("info")
var initiativeEl = document.getElementById('initiative')
var HPEl = document.getElementById('HP')
var hitDie = document.getElementById('hitDie')

//empty arrays for later
var savedScores = []
var mods = [];
var bioArray = [];
var prevBio = [];
var profArray = [];
var profModArray = [];
var weaponsArray = [];
var savedWeapons = [];
var inventory = []
var savedInv = []
//etc
rollContainer.style.visibility = 'hidden'
console.log(rollContainer.innerHTML)
console.log(diceTextEl)

//event listeners
saveBioBtn.addEventListener("click", saveBioInfo)
saveAbilBtn.addEventListener('click', SaveAbilScore)
rollAbilBtn.addEventListener('click', function () {
    rollContainer.style.visibility = 'visible';
    rollContainer.innerHTML = ''
    for (let i = 0; i < 6; i++) {
        //this acutally 'rolls' the die and shows them to the user
        var singleRollContainer = document.createElement('section')
        singleRollContainer.classList.add('d-flex', 'flex-column')
        var oneRollEl = document.createElement('section')
        var diceRoll = document.createElement('p')
        diceRoll.textContent = (rollDice(1, 20))
        diceRoll.setAttribute('data-rollnum', i)
        var d20Img = document.createElement('img')
        d20Img.src = './assets/images/d20_base.png'

        // console.log(d20Img)
        oneRollEl.appendChild(d20Img)
        oneRollEl.appendChild(diceRoll)
        singleRollContainer.appendChild(oneRollEl)
        rollContainer.appendChild(singleRollContainer)

        //now lets add in the buttons
        var rerollBtn = document.createElement('button')
        //set up attributes and class for each reroll button
        rerollBtn.textContent = ('Reroll')
        rerollBtn.className = "redoroll"
        rerollBtn.setAttribute('data-rerollbtn', (i))
        //now lets put them all togehter
        singleRollContainer.appendChild(rerollBtn)
        rerollBtn.addEventListener('click', redoRoll)
    }
});

saveProfBtn.addEventListener('click', function () {
    //this should go for the length of 24
    profArray = [];
    profModArray = [];
    for (let i = 0; i < profEl.length; i++) {
        profArray.push(profEl[i].checked)
        //this loop is for the charisma prof
        if (i < 5) {
            // console.log("prof is charisma")
            if (profEl[i].checked == true) {
                console.log(modsEl[0].textContent)
                let profBonus = profBonusVal + parseInt(modsEl[0].textContent)
                profModArray.push(profBonus)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`

                } else {
                    profBonusEl[i].textContent = `${profBonus}`
                }
            } else {
                //the prof must be the standard, if they are proficienct see above
                let profBonus = parseInt(modsEl[0].textContent)
                profBonusEl[i].textContent = `+ ${profBonus}`
                profModArray.push(profBonus)
            }

            //this is for constitution
        } else if (i == 5) {
            // console.log("prof is constitution")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[1].textContent)
                profModArray.push(profBonus)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                } else {
                    profBonusEl[i].textContent = `${profBonus}`
                }
            } else {
                let profBonus = parseInt(modsEl[1].textContent)
                profBonusEl[i].textContent = `+ ${profBonus}`
                profModArray.push(profBonus)
            }

        } else if (i > 5 && i <= 9) {
            // console.log("prof is dex")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[2].textContent)
                profModArray.push(profBonus)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                } else {
                    profBonusEl[i].textContent = `${profBonus}`
                }
            } else {
                let profBonus = parseInt(modsEl[2].textContent)
                profBonusEl[i].textContent = `+ ${profBonus}`
                profModArray.push(profBonus)
            }

        } else if (i > 9 && i <= 15) {
            // console.log("prof is intelligence")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[3].textContent)
                profModArray.push(profBonus)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                } else {
                    profBonusEl[i].textContent = `${profBonus}`
                }
            } else {
                let profBonus = parseInt(modsEl[3].textContent)
                profBonusEl[i].textContent = `+ ${profBonus}`
                profModArray.push(profBonus)
            }
        } else if (i > 15 && i <= 17) {
            // console.log("prof is str")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[4].textContent)
                profModArray.push(profBonus)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                } else {
                    profBonusEl[i].textContent = `${profBonus}`
                }
            } else {
                let profBonus = parseInt(modsEl[4].textContent)
                profBonusEl[i].textContent = `+ ${profBonus}`
                profModArray.push(profBonus)
            }
        } else if (i > 17) {
            // console.log("prof is wis")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[5].textContent)
                profModArray.push(profBonus)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                } else {
                    profBonusEl[i].textContent = `${profBonus}`
                }
            } else {
                let profBonus = parseInt(modsEl[5].textContent)
                profBonusEl[i].textContent = `+ ${profBonus}`
                profModArray.push(profBonus)
            }
        }
        else {
            // console.log("done")
        }
    }
    // console.log(profArray)
    // console.log(profModArray)
    localStorage.setItem("mySavedProf", JSON.stringify(profArray))
    localStorage.setItem("mySavedProfMods", JSON.stringify(profModArray))
})
levelUpBtn.addEventListener('click', function () {
    console.log("clicking")

    if (levelEl.textContent == 0) {
        if (classInputEl.value == "Wizard" || levelEl.value == "Sorcerer") {
            // console.log("hit die is d6")
            HPEl.textContent = 6 + parseInt(modsEl[1].textContent)
            levelEl.textContent = 1
            hitDie.textContent = "1d6"
            localStorage.setItem("myLevel", JSON.stringify(levelEl.textContent))
            localStorage.setItem("myHP", JSON.stringif(HPEl.textContent))
            console.log(levelEl.textContent)


        } else if (classInputEl.value == "Artificer" || classInputEl.value == "Bard" || classInputEl.value == "Cleric" || classInputEl.value == "Druid" || classInputEl.value == "Monk" || classInputEl.value == "Rogue" || classInputEl.value == "Warlock") {
            // console.log("Hit dice is d8")
            HPEl.textContent = 8 + parseInt(modsEl[1].textContent)
            levelEl.textContent = 1
            hitDie.textContent = "1d8"
            localStorage.setItem("myLevel", JSON.stringify(levelEl.textContent))
            localStorage.setItem("myHP", JSON.stringify(HPEl.textContent))
            console.log(levelEl.textContent)

        } else if (classInputEl.value == "Fighter" || classInputEl.value == "Paladin" || classInputEl.value == "Ranger") {
            console.log("hit die is d10")
            HPEl.textContent = 10 + parseInt(modsEl[1].textContent)
            levelEl.textContent = 1
            hitDie.textContent = "1d10"
            localStorage.setItem("myLevel", JSON.stringify(levelEl.textContent))
            localStorage.setItem("myHP", JSON.stringify(HPEl.textContent))
            console.log(levelEl.textContent)

        } else {
            console.log("hit die is d12")
            HPEl.textContent = 12 + parseInt(modsEl[1].textContent)
            levelEl.textContent = 1
            hitDie.textContent = "1d12"
            localStorage.setItem("myLevel", JSON.stringify(levelEl.textContent))
            localStorage.setItem("myHP", JSON.stringify(HPEl.textContent))
            console.log(levelEl.textContent)

        }
    } else if (levelEl.textContent == 20) {
        alert('Max level is 20')
        levelUpBtn.style.display = 'none'
    }
    else {//if its greater than 0 
        console.log("leveling higher than level 1")
        if (classInputEl.value == "Wizard" || levelEl.value == "Sorcerer") {
            // console.log("hit die is d6")
            HPEl.textContent = parseInt(currentHP) + rollDice(1, 6)
            levelEl.textContent = parseInt(currentLevel) + 1
            hitDie.textContent = `${parseInt(currentLevel)}d6`
            localStorage.setItem("myLevel", JSON.stringify(levelEl.textContent))
            localStorage.setItem("myHP", JSON.stringif(HPEl.textContent))
            console.log(levelEl.textContent)


        } else if (classInputEl.value == "Artificer" || classInputEl.value == "Bard" || classInputEl.value == "Cleric" || classInputEl.value == "Druid" || classInputEl.value == "Monk" || classInputEl.value == "Rogue" || classInputEl.value == "Warlock") {
            // console.log("Hit dice is d8")
            HPEl.textContent = parseInt(HPEl.textContent) + rollDice(1, 8)
            levelEl.textContent = parseInt(levelEl.textContent) + 1
            hitDie.textContent = `${parseInt(levelEl.textContent)}d8`
            localStorage.setItem("myLevel", JSON.stringify(levelEl.textContent))
            localStorage.setItem("myHP", JSON.stringify(HPEl.textContent))
            console.log(levelEl.textContent)

        } else if (classInputEl.value == "Fighter" || classInputEl.value == "Paladin" || classInputEl.value == "Ranger") {
            console.log("hit die is d10")
            HPEl.textContent = parseInt(HPEl.textContent) + rollDice(1, 10)
            levelEl.textContent = parseInt(levelEl.textContent) + 1
            hitDie.textContent = `${parseInt(levelEl.textContent)}d10`
            localStorage.setItem("myLevel", JSON.stringify(levelEl.textContent))
            localStorage.setItem("myHP", JSON.stringify(HPEl.textContent))
            console.log(levelEl.textContent)

        } else {
            console.log("hit die is d12")
            HPEl.textContent = parseInt(HPEl.textContent) + rollDice(1, 12)
            levelEl.textContent = parseInt(levelEl.textContent) + 1
            hitDie.textContent = `${parseInt(levelEl.textContent)}d12`
            localStorage.setItem("myLevel", JSON.stringify(levelEl.textContent))
            localStorage.setItem("myHP", JSON.stringify(HPEl.textContent))
            console.log(levelEl.textContent)

        }
    }
})
moreInv.addEventListener('click', function () {
    newInv = document.createElement('input')
    newInv.classList = ('inventory')
    newInv.placeholder = "Add new Item"
    invContainer.appendChild(newInv)
})
invBtn.addEventListener('click', function () {
    console.log(inventoryEl)
    weaponsArray = [];
    inventory = [];
    for (let i = 0; i < weapons.length; i++) {
        weaponsArray.push(weapons[i].value)
    }
    for (let i = 0; i < inventoryEl.length; i++) {
        inventory.push(inventoryEl[i].value)
    }
    localStorage.setItem('mySavedInv', JSON.stringify(inventory))
    localStorage.setItem('mySavedWeapons', JSON.stringify(weaponsArray))
})

function redoRoll(event) {

    if (event.target.matches('button')) {
        const myRerollBtn = event.target.dataset.rerollbtn
        console.log(myRerollBtn)
        console.log(document.querySelector(`#diceContainer`).querySelectorAll('p').item(myRerollBtn))
        const rerollEl = (document.querySelector(`#diceContainer`).querySelectorAll('p').item(myRerollBtn))

        rerollEl.textContent = (rollDice(1, 20))
        event.target.style.display = 'none'
    }
}
function rollDice(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function SaveAbilScore() {
    for (let i = 0; i < abilityScoreEl.length; i++) {
        myScore = parseInt(abilityScoreEl[i].value)
        //need additional conditionals for if the val is less than 10, it must be negative
        if (myScore % 2 === 0) {
            mods.push((myScore - 10) / 2)
        } else {
            mods.push(((myScore - 11) / 2))
        }
        savedScores.push(myScore)
        console.log(mods[i])
        if (mods[i] > 0) {
            modsEl[i].textContent = `+${mods[i]}`

        } else {
            modsEl[i].textContent = mods[i]
        }
        //going in order Dex should be at index 2, we want to add to the initiative text as well
        if (i == 2) {
            console.log("in the conditional")
            initiativeEl.textContent = `+ ${mods[i]}`
        }
    }
    localStorage.setItem("mySavedMods", JSON.stringify(mods))
    localStorage.setItem("mySavedScore", JSON.stringify(savedScores))
}

//having a way to clear the bio would be nice
function saveBioInfo() {
    for (let i = 0; i < bioEl.length; i++) {
        bioArray.push(bioEl[i].value)
    }
    // console.log(bioArray)

    localStorage.setItem("mySavedBio", JSON.stringify(bioArray))
}


function renderBio() {
    // console.log("rendering bio")
    // console.log(bioArray)
    console.log(currentLevel)
    for (let i = 0; i < prevBio.length; i++) {
        // console.log("in for loop")
        bioEl[i].value = prevBio[i]
    }
    if (raceInputEl.value == "Dragonborn" || raceInputEl.value == "Elf" || raceInputEl.value == "Half-Elf" || raceInputEl.value == "Half-Orc" || raceInputEl.value == "Human" || raceInputEl.value == "Tiefling") {
        speedEl.textContent = 30
    } else {
        speedEl.textContent = 25
    }
    levelEl.textContent = currentLevel
    HPEl.textContent = currentHP
    if (currentLevel == 20) {
        levelUpBtn.style.display = 'none'
    }
    if (classInputEl.value == "Wizard" || levelEl.value == "Sorcerer") {
        hitDie.textContent = `${currentLevel}d6`
    } else if (classInputEl.value == "Artificer" || classInputEl.value == "Bard" || classInputEl.value == "Cleric" || classInputEl.value == "Druid" || classInputEl.value == "Monk" || classInputEl.value == "Rogue" || classInputEl.value == "Warlock") {
        hitDie.textContent = `${currentLevel}d8`
    } else if (classInputEl.value == "Fighter" || classInputEl.value == "Paladin" || classInputEl.value == "Ranger") {
        hitDie.textContent = `${currentLevel}d10`

        console.log(levelEl.textContent)

    } else {
        hitDie.textContent = `${currentLevel}d12`
    }

}
function renderScores() {
    // console.log(modsEl)
    // console.log(prevScores)

    for (let i = 0; i < modsEl.length; i++) {
        abilityScoreEl[i].value = prevScores[i]
        modsEl[i].textContent = prevMods[i]
    }
    if (parseInt(modsEl[2].textContent) > 0) {
        initiativeEl.textContent = `+ ${modsEl[2].textContent}`
    } else {
        initiativeEl.textContent = modsEl[2].textContent
    }
}

function renderProfs() {
    // console.log(prevProf)
    // console.log(prevProfMods)
    for (let i = 0; i < profEl.length; i++) {
        // console.log(prevProfMods[i])
        profEl[i].value = prevProf[i]
        if (prevProfMods[i] > 0) {
            profBonusEl[i].textContent = `+ ${prevProfMods[i]}`
        } else {
            profBonusEl[i].textContent = `${prevProfMods[i]}`

        }
    }
}

function renderWeapons() {
    for (let i = 0; i < weapons.length; i++) {
        weapons[i].value = savedWeapons[i]
    }
    for (let i = 0; i < savedInv.length; i++) {
        newInv = document.createElement('input')
        newInv.value = savedInv[i]
        invContainer.appendChild(newInv)
    }
}

randomizeBioBtn.addEventListener("click", function () {
    if (!raceInputEl.value) {
        raceInputEl.value = raceArray[Math.floor(Math.random() * raceArray.length)];
    }
    if (!classInputEl.value) {
        classInputEl.value = classArray[Math.floor(Math.random() * classArray.length)];
    }
    if (!alignmentInputEl.value) {
        alignmentInputEl.value = alignmentArray[Math.floor(Math.random() * alignmentArray.length)];
    }
    if (!backgroundInputEl.value) {
        backgroundInputEl.value = backgroundArray[Math.floor(Math.random() * backgroundArray.length)];
    }
})


//the API
var DndURL = "https://www.dnd5eapi.co/api/"
const classArray = [];
const raceArray = [];
const alignmentArray = [];
const backgroundArray = ['Acolyte', 'Charlatan', 'Criminal/Spy', 'Entertainer', 'Folk Hero', 'Gladiator', 'Guild Artisan/Merchant', 'Hermit', 'Knight', 'Noble', 'Outlander', 'Pirate', 'Sage', 'Sailor', 'Soldier', 'Urchin'];
async function DndAPI() {
    // let allData = fetch(`${DndURL}/backgrounds`)
    //     .then(function (response) {
    //         return response.json()
    //     })
    //     .then(function (data) {
    //         console.log(data)
    //         return data
    //     })
    let classData = fetch(`${DndURL}/classes`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (let i = 0; i < data.results.length; i++) {
                classArray.push(data.results[i].name)
            }
            // console.log(data)
            return data
        })
    let raceData = fetch(`${DndURL}/races`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (let i = 0; i < data.results.length; i++) {
                raceArray.push(data.results[i].name)
            }
            return data
        })
    let alignmentData = fetch(`${DndURL}/alignments`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (let i = 0; i < data.results.length; i++) {
                alignmentArray.push(data.results[i].name)
            }
            return data
        })
    let backgroundData = fetch(`${DndURL}/backgrounds`)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            for (let i = 0; i < data.results.length; i++) {
                backgroundArray.push(data.results[i].name)
            }
            return data
        })
    return classData, raceData, alignmentData, backgroundData
}
async function init() {
    // await DndAPI()

    if (!localStorage.getItem("myLevel")) {
        currentLevel = 0
    } else {
        currentLevel = JSON.parse(localStorage.getItem("myLevel"))
    }
    if (!localStorage.getItem("myHP")) {
        currentHP = 0
    } else {
        currentHP = JSON.parse(localStorage.getItem("myHP"))
    }
    if (!localStorage.getItem("mySavedBio")) {
        bioArray = []
    } else {
        prevBio = JSON.parse(localStorage.getItem("mySavedBio"))
        renderBio()
    }
    if (!localStorage.getItem("mySavedScore") && !localStorage.getItem("mySavedMods")) {
        prevScores = [];
        prevMods = [];
    } else {
        prevScores = JSON.parse(localStorage.getItem("mySavedScore"))
        prevMods = JSON.parse(localStorage.getItem("mySavedMods"))
        renderScores()
    }
    if (!localStorage.getItem("mySavedProf") && !localStorage.getItem("mySavedProfMods")) {
        prevProf = [];
        prevProfMods = [];
    } else {
        prevProf = JSON.parse(localStorage.getItem("mySavedProf"))
        prevProfMods = JSON.parse(localStorage.getItem("mySavedProfMods"))
        renderProfs()
    }
    if (!localStorage.getItem('mySavedWeapons')) {
        savedWeapons = [];
    } else {
        savedWeapons = JSON.parse(localStorage.getItem('mySavedWeapons'))
        savedInv = JSON.parse(localStorage.getItem('mySavedInv'))
        renderWeapons()
    }

}
init()