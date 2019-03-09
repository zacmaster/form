const dqs = element => document.querySelector(element)
const url = 'https://api-jugadores-jere.herokuapp.com/jugadores'

var jugadores = []

getJugadores().then(() => actualizarListaJugadores())

const actualizarListaJugadores = () => {
    console.log('cargando jugadores')
        let cadena = `<div class="cardsContainer">`
        jugadores.map((jugador,index) =>{
            cadena += card(jugador,index)

        })
        dqs('#cards').innerHTML = cadena + '</div>'
}

const registrarJugador = (e) => {

    
    let jugadorObj = {}
    jugadorObj.name = dqs('#name').value
    jugadorObj.lastname = dqs('#lastname').value
    jugadorObj.age = parseInt(dqs('#age').value)
    jugadorObj.nationality = dqs('#nationality').value
    jugadorObj.number = parseInt(dqs('#number').value)
    console.log(jugadorObj)

    dqs('#playerForm').reset()
    dqs('#navbarToggleExternalContent').className = 'collapse'


    e.preventDefault() //que onda esto ? no va arriba ?
    console.log('Registrando jugador...')
    postJugador(jugadorObj).then(() => {
        getJugadores().then(() => actualizarListaJugadores())
    })
}

function postJugador (jugador){
    return fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(jugador), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

}

const getJugador = (e) => {
    e.preventDefault()
    let dorsal = dqs('#input').value
    getJugadores(dorsal)
}

function getJugadores(){
    return fetch(url)
    .then(r => r.json())
    .then(json => {
        console.log('getting jugadores...')
        jugadores = [...json]
    })
}



const card = (jugador,index) => {
    const colorClass = index % 2 == 0 ? {header: 'hd1', body:'bd1' } : {header: 'hd2', body:'bd2' } 
    return `
    <div class="card m-2">
        <div class="card-header ${colorClass.header}">
            <span class="font-weight-bold">#${jugador.number}</span> ${jugador.lastname}
        </div>
        <div class="card-body ${colorClass.body} ">
            <h2 class="card-title">${jugador.name}</h2>
            <h6 class="card-subtitle letraCursiva">(${jugador.nationality})</h6>
            <div style="display: flex">
                <p class="card-text" style="flex-grow: 2">
                    Este jugador destaca por tener suerte y meter goles fantasma a último momento del partido.
                </p>
                <img src="https://pngimage.net/wp-content/uploads/2018/06/soccer-ball-icon-png-7.png" style="flex-grow: 1; height: 100%" />
            </div>
        </div>
    </div>
    
    `
} 