// curl -X GET "https://www.dnd5eapi.co/api/ability-scores/cha" -H "Accept: application/json"
var DndURL = "https://www.dnd5eapi.co/api/"
async function DndAPI() {
    let myData = fetch(DndURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
            return data
        })
    return myData
}
function init() {
    DndAPI().then(console.log(data))
}
init()