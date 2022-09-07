

const info = document.getElementById("info")
const anterior = document.getElementById("anterior")
const siguiente = document.getElementById("sig")
var next = ""
var previous = ""
var url = "https://pokeapi.co/api/v2/pokemon"

siguiente.addEventListener('click', ()=>{
    info.innerHTML = ""
    obtenerPokemones(next)
})

anterior.addEventListener('click', () =>{
    info.innerHTML = ""
    obtenerPokemones(previous)
})

const obtenerPokemones = async (url) => {


    var data = []
    var habilidades = ""
    data = await fetch(url)
    var json = await data.json()
    next = json.next
    previous = json.previous
    console.log(previous)

    
    if(previous == undefined){
        anterior.hidden = true
    }else{
        anterior.hidden = false
    }

    for (var pokemon of json.results) {

        var res = await fetch(pokemon.url)
        var jsonInfo = await res.json()

       for(var hab of jsonInfo.abilities){
        habilidades += `<p class="card-text" >${hab.ability.name}</p>`
       }

       info.innerHTML += `<div class="card mb-3 ">
       <div class="row g-0">
           <div class="col-md-4">
               <img src=${jsonInfo.sprites.front_shiny} class="rounded mx-auto d-block" alt=${pokemon.name}">
           </div>
           <div class="col-md-8">
               <div class="card-body">
                   <h3 class="card-title">${pokemon.name}</h3>
                   <h5>Habilidades :</h5>
                   <p >${habilidades}</p>
               </div>
           </div>
       </div>
   </div>`

   habilidades = ""

    }

}

obtenerPokemones(url)