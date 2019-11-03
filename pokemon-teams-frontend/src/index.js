const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

//add event listener to the whole page
 document.addEventListener("DOMContentLoaded", () => {
     let parentUl = document.getElementsByTagName('main')[0]  
     fetchTrainersAndPokes()

     parentUl.addEventListener('click', clickHandler)

     function clickHandler(e){
         e.stopPropagation()
         if(e.target.dataset.id && e.target.parentNode.getElementsByTagName('ul')[0].getElementsByTagName('li')<6){
         let trainer_id = {trainer_id:e.target.dataset.id} 
         let button_id = e.target.parentNode.getElementsByTagName("button")[0].dataset.id
         fetchNewPokemon(trainer_id, button_id)
     }else if (e.target.dataset.pokeid) {
         fetchDeletePokemon(e.target.dataset.pokeid)
         e.target.parentElement.remove()
     }
    
 }

//fetching new pokemon with post method
function fetchNewPoke(pokemon,button_id){
    fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            accepts: 'application/json'
        },
        body: JSON.stringify(id)
    })
    .then(resp => resp.json())
        .then(json => renderNewPoke(json, button_id))
    }


    function renderNewPoke(pokemon, button_id){
        let li = document.createElement('li')
        let ul = document.createElement('ul')
        li.innerHTML = `${pokemon.nickname}(${pokemon.species})`

        let releaseButton = document.createElement("button")
        releaseButton.dataset.pokeid = `${pokemon.id}`
        releaseButton.className = "release"
        releaseButton.innerText = "Release"
        
        new_li.appendChild(releaseButton)
        ul.appendChild(new_li)
    }




//fetching trainers and his pokemons
function fetchTrainersAndPokes(){
    fetch(TRAINERS_URL)
    .then(function(resp){
        return resp.json()})
        .then(function(resp){
            resp.forEach(renderTrainersAndPokes)
        })
}


function renderTrainersAndPokes(trainersPokemons){

//creating elements(stays the same)
let div = document.createElement('div')
let p = document.createElement('p')
let button = document.createElement('button')
let ul = document.createElement('ul')



//adding attributes(stays the same)
div.className = 'card'
div.setAttribute('data-id', `${trainersPokemons.id}`) 
p.innerText = `${trainersPokemons.name}`
button.dataset.id = `${trainersPokemons.id}`
button.innerText = 'Add Pokemon'

div.appendChild(p)
div.appendChild(button)

//rendering trainers cards with pokemons with itaration
trainersPokemons.pokemons.forEach(function(pokemon){
    let li = document.createElement('li')
    li.innerHTML = `${pokemon.nickname}(${pokemon.species})`
    let releaseButton = document.createElement('button')
    releaseButton.dataset.pokeid = `${pokemon.id}`
    releaseButton.className = 'release'
    releaseButton.innerText = 'Release'
    li.appendChild(releaseButton)
    ul.appendChild(li)

})

div.appendChild(ul)
parentUl.appendChild(div)

}

//deleting pokemon with the delete request
function fetchDeletePokemon(id){
    fetch(`${POKEMONS_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            accepts: "application/json"
        },
        body: JSON.stringify({id : id})
    })
}



 })


