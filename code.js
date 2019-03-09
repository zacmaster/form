const dqs = element => document.querySelector(element)
const url = 'http://192.168.1.54:4000/jugadores'

var jugadores = []

getJugadores().then(
    () => {
        console.log('cargando jugadores')
        let cadena = `<ul>`
        jugadores.map(jugador =>{
            cadena += `
                <li>${jugador.name}</li>

            `
        })
        dqs('#listaJugadores').innerHTML = cadena + '</ul>'
    }

)

const registrarJugador = (e) => {

    
    let jugadorObj = {}
    jugadorObj.name = dqs('#name').value
    jugadorObj.lastname = dqs('#lastname').value
    jugadorObj.age = parseInt(dqs('#age').value)
    jugadorObj.nationality = dqs('#nationality').value
    jugadorObj.number = parseInt(dqs('#number').value)
    console.log(jugadorObj)
    e.preventDefault() //que onda esto ? no va arriba ?
    console.log('Registrando jugador...')
    postJugador(jugadorObj)
}

function postJugador (jugador){
    fetch(url, {
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

function getJugadores(dorsal){
    return fetch(url)
    .then(r => r.json())
    .then(json => {
        jugadores = [...json]
    })
}
