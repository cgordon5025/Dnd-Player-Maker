// curl -X GET "https://www.dnd5eapi.co/api/ability-scores/cha" -H "Accept: application/json"
//save of all these in database if/when i want to convert and adapt this
//button elements 
var saveAbilBtn = document.getElementById('saveAbilScores')
var rollAbilBtn = document.getElementById('rollAbilScores')
var randomizeBioBtn = document.getElementById('randomizeBio')
var saveBioBtn = document.getElementById("saveBio")
var saveProfBtn = document.getElementById('saveProf')

//containers
var abilityScoreEl = document.getElementsByClassName('scoreInput')
var rollContainer = document.getElementById('diceContainer')
var diceTextEl = document.getElementById('diceRollContainer');
var rerollContainer = document.getElementById('rerollButtonContainer')
//there should be 24 of these
var profEl = document.querySelectorAll('.proficiency')
// .querySelector('input')
var profBonusEl = document.querySelectorAll('.profBonus')
var profBonusVal = parseInt(document.getElementById("profValue").innerHTML)

// profBonusEl[1].textContent = "hello"

console.log(profBonusEl)
// console.log(profEl)
//input variables
var raceInputEl = document.getElementById("raceInput");
var classInputEl = document.getElementById("classInput");
var alignmentInputEl = document.getElementById("alignmentInput");
var backgroundInputEl = document.getElementById("backgroundInput")

//text elements
var modsEl = document.getElementsByClassName('mod')
var bioEl = document.getElementsByClassName("info")
var initiativeEl = document.getElementById('initiative')

//empty arrays for later
var savedScores = []
var mods = [];
var bioArray = [];
var prevBio = [];
var profArray = [];
var profModArray = []

//etc
rollContainer.style.visibility = 'hidden'

//event listeners
saveBioBtn.addEventListener("click", saveBioInfo)
saveAbilBtn.addEventListener('click', SaveAbilScore)
rollAbilBtn.addEventListener('click', function () {
    rollContainer.style.visibility = 'visible';
    diceTextEl.innerHTML = '';
    rerollContainer.innerHTML = '';
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
        diceRoll.setAttribute('data-rollnum', i)
        var d20Img = document.createElement('img')
        d20Img.src = './assets/images/d20_base.png'

        // console.log(d20Img)
        oneRollEl.appendChild(d20Img)
        oneRollEl.appendChild(diceRoll)
        diceTextEl.appendChild(oneRollEl)

        //now lets add in the buttons
        var redoEl = document.createElement('td')
        var rerollBtn = document.createElement('button')
        //set up attributes and class for each reroll button
        rerollBtn.textContent = ('Reroll')
        rerollBtn.className = "redoroll"
        rerollBtn.setAttribute('data-rerollbtn', (i))
        //now lets put them all togehter
        redoEl.appendChild(rerollBtn)
        rerollContainer.appendChild(redoEl)
        // console.log(rerollBtn)
        document.querySelector('.table').addEventListener('click', redoRoll)

        // rerollBtn.addEventListener('click', redoRoll)


    }
});
console.log("testing", profEl.length)
saveProfBtn.addEventListener('click', function () {
    //this should go for the length of 24
    for (let i = 0; i < profEl.length; i++) {
        profArray.push(profEl[i].checked)
        //this loop is for the charisma prof
        if (i < 5) {
            console.log("prof is charisma")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[0].textContent)

                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)
                } else {
                    profBonusEl[i].textContent = `- ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                }
            } else {
                profBonusEl[i].textContent = `+ ${profBonusVal}`
            }

            //this is for constitution
        } else if (i == 5) {
            console.log("prof is constitution")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[1].textContent)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                } else {
                    profBonusEl[i].textContent = `- ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                }
            } else {
                profBonusEl[i].textContent = `+ ${profBonusVal}`
            }

        } else if (i > 5 && i <= 9) {
            console.log("prof is dex")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[2].textContent)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                } else {
                    profBonusEl[i].textContent = `- ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                }
            } else {
                profBonusEl[i].textContent = `+ ${profBonusVal}`
            }

        } else if (i > 9 && i <= 15) {
            console.log("prof is intelligence")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[3].textContent)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                } else {
                    profBonusEl[i].textContent = `- ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                }
            } else {
                profBonusEl[i].textContent = `+ ${profBonusVal}`
            }
        } else if (i > 15 && i <= 17) {
            console.log("prof is str")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[4].textContent)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                } else {
                    profBonusEl[i].textContent = `- ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                }
            } else {
                profBonusEl[i].textContent = `+ ${profBonusVal}`
            }
        } else if (i > 17) {
            console.log("prof is wis")
            if (profEl[i].checked == true) {
                let profBonus = profBonusVal + parseInt(modsEl[5].textContent)
                if (profBonus > 0) {
                    profBonusEl[i].textContent = `+ ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                } else {
                    profBonusEl[i].textContent = `- ${profBonus}`
                    profModArray.push(profBonusEl[i].textContent)

                }
            } else {
                profBonusEl[i].textContent = `+ ${profBonusVal}`
            }
        }
        else {
            console.log("done")
        }
        // if (profEl[i].checked == true) {
        //     console.log("button is clicked and boolean is true")
        //     profBonusEl[i].textContent = "hello"
        // } else {
        //     console.log("this button was not checked")
        // }
    }
    console.log(profArray)
    console.log(profModArray)
})

function redoRoll(event) {
    //need to do a find where the button data num can equal the text rollnum data attribute, but how do?
    // var btn1 = document..dataset.rollnum
    // console.log(event.target)

    if (event.target.matches('button')) {
        const myRerollBtn = event.target.dataset.rerollbtn
        console.log(myRerollBtn)

        const rerollEl = document.querySelector(`#diceRollContainer`).children.item(myRerollBtn)

        rerollEl.children[1].textContent = (rollDice(1, 20))
        // console.log(rerollEl)
        // console.log(rerollEl.children[1])
        // console.log(event.target)
        //for loop to find mathcing rollnum
        //if on matching rollnum
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
        modsEl[i].textContent = (mods[i])
        //going in order Dex should be at index 2, we want to add to the initiative text as well
        if (i == 2) {
            console.log("in the conditional")
            initiativeEl.textContent = (mods[i])
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
    console.log("rendering bio")
    console.log(bioArray)
    for (let i = 0; i < prevBio.length; i++) {
        console.log("in for loop")
        bioEl[i].value = prevBio[i]
    }
}
function renderScores() {
    console.log(modsEl)
    console.log(prevScores)

    for (let i = 0; i < modsEl.length; i++) {
        abilityScoreEl[i].value = prevScores[i]
        modsEl[i].textContent = prevMods[i]
    }
}

function renderProfs() {

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
    // console.log(classArray)
    // console.log(raceArray)
    // console.log(alignmentArray)
    // console.log(backgroundArray)
    if (!localStorage.getItem("mySavedBio")) {
        bioArray = []
    } else {
        prevBio = JSON.parse(localStorage.getItem("mySavedBio"))
        console.log("else statement")
        console.log(prevBio)
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
}
init()