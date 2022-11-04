// curl -X GET "https://www.dnd5eapi.co/api/ability-scores/cha" -H "Accept: application/json"
//save of all these in database if/when i want to convert and adapt this
var saveAbilBtn = document.getElementById('saveAbilScores')
var abilityScoreEl = document.getElementsByClassName('scoreInput')
var modsEl = document.getElementsByClassName('mod')
var rollAbilBtn = document.getElementById('rollAbilScores')
var bioEl = document.getElementsByClassName("info")
console.log(bioEl)
var initiativeEl = document.getElementById('initiative')
// console.log(modsEl)
// console.log(abilityScoreEl)
var savedScores = []
var mods = [];
var rollContainer = document.getElementById('diceContainer')
var diceTextEl = document.getElementById('diceRollContainer');
var rerollContainer = document.getElementById('rerollButtonContainer')
saveAbilBtn.addEventListener('click', SaveAbilScore)
rollContainer.style.visibility = 'hidden'
// maybe vanilla would work better with bootstrap
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
        rerollBtn.setAttribute('data-rerollbtn', (i + 1))
        //now lets put them all togehter
        redoEl.appendChild(rerollBtn)
        rerollContainer.appendChild(redoEl)
        // console.log(rerollBtn)
        document.querySelector('.table').addEventListener('click', redoRoll)

        // rerollBtn.addEventListener('click', redoRoll)


    }
});
var dexModEl = document.getElementById('dexMod')
var redoRollEl = $('.redoroll')

// swap out jquery call
//call upon first tr, then datanum have each button refer to specific data num to replace text

//note to self fix the reroll, need to be able to reference the dice which are not siblings to the buttons anymore
// redoRollEl.addEventListener('click','button',reRoll)
// redoRollEl.on('click', "button", reRoll)
function redoRoll(event) {
    //need to do a find where the button data num can equal the text rollnum data attribute, but how do?
    // var btn1 = document..dataset.rollnum
    // console.log(event.target)

    if (event.target.matches('button')) {
        const myRerollBtn = event.target.dataset.rerollbtn
        const rerollEl = document.querySelector(`#diceRollContainer :nth-child(${myRerollBtn})`)
        rerollEl.children[1].textContent = (rollDice(1, 20))
        // console.log(myRerollBtn)
        // console.log(rerollEl.children[1])
        // console.log(event.target)
        //for loop to find mathcing rollnum
        //if on matching rollnum
        event.target.style.display ='none'
    }
    console.log('clicked')
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

    localStorage.setItem("mySavedScore", JSON.stringify(savedScores))
}
bioArray = [];
prevBio = [];
//having a way to clear the bio would be nice
function saveBioInfo() {
    for (let i = 0; i < bioEl.length; i++) {
        bioArray.push(bioEl[i].value)
    }
    // console.log(bioArray)

    localStorage.setItem("mySavedBio", JSON.stringify(bioArray))
}

if (!localStorage.getItem("mySavedBio")) {
    bioArray = []
} else {
    prevBio = JSON.parse(localStorage.getItem("mySavedBio"))
    console.log("else statement")
    console.log(prevBio)
    renderBio()
    //lets render right away
    //will change if we have multiple characters

}
function renderBio() {
    console.log("rendering bio")
    console.log(bioArray)
    for (let i = 0; i < prevBio.length; i++) {
        console.log("in for loop")
        bioEl[i].value = prevBio[i]
    }
}

var raceInputEl = document.getElementById("raceInput");
var classInputEl = document.getElementById("classInput");
var alignmentInputEl = document.getElementById("alignmentInput");
var backgroundInputEl = document.getElementById("backgroundInput")
var randomizeBioBtn = document.getElementById('randomizeBio')
var saveBioBtn = document.getElementById("saveBio")
saveBioBtn.addEventListener("click", saveBioInfo)
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
    await DndAPI()
    // console.log(classArray)
    // console.log(raceArray)
    // console.log(alignmentArray)
    // console.log(backgroundArray)
}
init()