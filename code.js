const dqs = element => document.querySelector(element)
const url = 'http://192.168.1.54/futbol'
const registrarJugador = (e) => {
   
    let jugadorObj = {}
    jugadorObj.name = dqs('#name').value
    jugadorObj.lastname = dqs('#lastname').value
    jugadorObj.age = parseInt(dqs('#age').value)
    jugadorObj.nationality = dqs('#nationality').value
    jugadorObj.number = parseInt(dqs('#number').value)
    console.log(jugadorObj)
    e.preventDefault()
    console.log('Registrando jugador...')
    postJugador(jugadorObj)
}

function postJugador (jugadorObj){
    fetch(url, {
    method: 'POST', // or 'PUT'
    body: JSON.stringify(jugadorObj), // data can be `string` or {object}!
    headers:{
        'Content-Type': 'application/json'
    }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));

}