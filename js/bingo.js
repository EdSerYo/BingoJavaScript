// Variables

// Lista para saber las bolas que han salido
let bolasFuera = []
// Contador del carton
let numeroCarton = 0
// array para guardar si has acertado los números en los cartones
let resulCarton =[]

// Funciones

// Función para crear las bolas del bingo
function bola(){
    // localización del div donde se pondrá la bola
    const barraBolas = document.getElementById("bolas")
    // paramos el timpo cuando alcancemos el límite de las bolas fueras
    if (bolasFuera.length > 87){clearInterval(tiempo)}
    // creamos un número aleatorio dentre del número de bolas que tenemos en los cartones
    num = Math.floor(Math.random()*75 + 1)
    // Si la bola está dentro del array que ya ha salido buscamos otro número
    while(bolasFuera.includes(num)){
        num = Math.floor(Math.random()*75 + 1)
    }
    // Introducimos la bola dentro del array de las bolas que han salido
    bolasFuera.push(num)

    // Damos color a la bola según el número y la metemos en la barra
    if (num <= 15){
        barraBolas.insertAdjacentHTML('afterbegin',`<div class="bola" style="background-color:yellow"><div class="numero">${num}</div></div>`)
    }
    if (num > 15 && num <= 30){
        barraBolas.insertAdjacentHTML('afterbegin',`<div class="bola" style="background-color:red"><div class="numero">${num}</div></div>`)
    }
    if (num > 30 && num <= 45){
        barraBolas.insertAdjacentHTML('afterbegin',`<div class="bola" style="background-color:green"><div class="numero">${num}</div></div>`)
    }
    if (num > 45 && num <= 60){
        barraBolas.insertAdjacentHTML('afterbegin',`<div class="bola" style="background-color:blue"><div class="numero">${num}</div></div>`)
    }
    if (num > 60){
        barraBolas.insertAdjacentHTML('afterbegin',`<div class="bola" style="background-color:gray"><div class="numero">${num}</div></div>`)
    }
    
    // buscamos y marcamos el carton. Esto es solo para marcar en el carton la bola que ha salido de forma automática
    // document.querySelectorAll(`.n${num}`).forEach(function(e){e.style.backgroundColor = 'green'})

    // ayuda al número. Sombreamos el td del número
    document.querySelectorAll(`.n${num}`).forEach(function(e){e.style.boxShadow = 'inset 0px 0px 4px black'})

    // solo dejamos en pantalla 6 bolas las demás las borramos
    if (bolasFuera.length > 6){
        document.getElementById("bolas").lastChild.remove()
    }
}

// Función para crear un cartón, pero sin interacción del usuario, es necesario tener la tabla creada en el html
function cartonNuevo2(){
    // Buscar los elementos tr del Html. Obtenemos un array con las filas
    const carton = document.getElementsByTagName('tr')
    // Bucle para recorrer el array de las filas
    for (let i = 0; i < carton.length; i++) {
        // Dentro de cada fila buscamos los elementos td. Obtenemos un array con las columnas
        const td = carton[i].getElementsByTagName('td')
        // Bucle para recorrer el array de las columnas
        for (let j = 0; j < td.length; j++) {
            // El elemento del centro lo bloqueamos para que no aparezca un número y lo pintamos de negro
            if (i === 2 && j === 2){
                td[j].getElementsByTagName('div')[0].style.backgroundColor = 'black'
                continue
            }
            // creamos un número aleatorio dentre del número de bolas que tenemos en los cartones
            num = Math.floor(Math.random()*90 + 1)
            // Si la bola está dentro del array que ya ha salido buscamos otro número
            while(numerosCarton.includes(num)){
                num = Math.floor(Math.random()*90 + 1)
            }
            // Lo introducimos en el array de los números que contiene el carton
            numerosCarton.push(num)
            // introducimos dentro del div que contendra el númeor de la columna  el valor del número aleatorio
            td[j].getElementsByTagName('div')[0].innerHTML = num
        }
    }
}

// Función para crear un carton nuevo. Este cartón interactuará el usuario
function cartonNuevo(){
    // creación del array de los posibles números
    let ncarton = []
    let numero = 1
    for (let i = 0; i < 5; i++){
        let fila = []
        for (let j = 0; j < 15; j++){
            fila.push(numero)
            numero ++
        }
        ncarton.push(fila)
    }
    // Creamos un nuevo array donde vamos a guardar los aciertos
    resulCarton.push([])
    // Array donde vamos a guardar los números que contendrá el carton
    let numerosCarton = []
    // Creamos la tabla para formar el carton
    let tabla = document.createElement("table")
    // Creamos el div que contendrá el cartón y el botón inferior
    let carton = document.createElement("div")
    // sumamos el valor del cartón
    numeroCarton += 1
    // Al div le introducimos la clase carton para que carge los estilos del mismo
    carton.className = 'carton'
    // Introducimos el ID para identificar el carton
    carton.id = 'carton' + numeroCarton
    // Recorremos las filas del carton
    for (let i = 0; i < 5; i++) {
        // Creamos el array fila para guardar los aciertos
        let filaResulCarton = []
        // creamos un elemento tr
        let fila = document.createElement("tr")
        // Bucle para recorrer las columnas
        for (let j = 0; j < 5; j++) {
            // Creamos el elemnento td para crear la columna
            let columna = document.createElement("td")
            // buscamos un número aleatorio dentro del número de elementos que contiene el array de los números posibles por columnas
            pos = Math.floor(Math.random()*ncarton[j].length)
            // obtenemos ese número dentro del aray
            num = ncarton[j][pos]
            // eliminamos ese número del array para que no se pueda buscar de nuevo
            ncarton[j].splice(pos, 1)
            // introducimos el valor dentro de los números que contendrá el carton
            numerosCarton.push(num)
            // crear un div con un onclick que llamará la función pulsar y nos mandará el carton, el número del div, la fila y columna
            let divManual = `<div onclick="pulsar(${numeroCarton}, ${num}, ${i}, ${j})">${num}</div>`
            // introduciremos a la casilla una clase con el número, ponemos n al principio para que funcione
            // con esto podemos localizar el número cuando lo busquemos 
            columna.className = 'n' + num
            // insertamos el div al final del elemento de la columna
            columna.insertAdjacentHTML("beforeend", divManual)
            // añadimos el elemento de la columna a la fila
            fila.appendChild(columna)
            // creamos el espacio dentro del array para los aciertos
            filaResulCarton.push("")
        }
        // añadimos la fila a laa columna
        tabla.appendChild(fila)
        // añadimos al array principal que guarda los resultados la fila con los espacios creados
        resulCarton[numeroCarton-1].push(filaResulCarton)
    }
    // añadimos la tabla al div que contendrá el carton
    carton.appendChild(tabla)
    // creamos un botón para comprobar el cartón
    let boton = `<button onclick="bingo('${numeroCarton}')">BINGO</button>`
    // lo añadimos al final del div que contiene el carton
    carton.insertAdjacentHTML("beforeend", boton)
    // añadimos el carton al html
    document.getElementById("cartones").appendChild(carton)
    
}

// Función para verificar si hemos acertado el bingo
// ev es el número del carton que se ha llamado a través de la función on-click
function bingo(ev){
    // si la verificación es correcta
    if (verificar(ev-1)){
        // cambiamos el fondo del carton a verde para identificar el carton ganador
        document.getElementById(`carton${ev}`).firstChild.style.backgroundColor='green'
        // paralizamos el tiempo, no permitiendo general más números
        clearInterval(tiempo)
    }
}

// función para añadir un carton nuevo al html
function anadir(){
    cartonNuevo()
}

// Función para marcar el número seleccionado si el número está en las bolas que han salidos
function pulsar(carton, numero, fila, columna){
    // Si en el array de las bolas que han salido está el número del carton que hemos pulsados
    if (bolasFuera.includes(numero)){
        // localizamos el botón dentro de su posición x e y del carton seleccionado
        const cartonBuscado = document.getElementById(`carton${carton}`)
        const trCarton = cartonBuscado.getElementsByTagName("tr")
        const tdCarton = trCarton[fila].getElementsByTagName("td")
        // ponemos el fondo del color del td en verde
        tdCarton[columna].style.backgroundColor = "green"
        // cambiamos el valor del array del cartón seleccionado a x que indicará que esa posición se ha acertado el número
        resulCarton[carton-1][fila][columna] = "x"
    }
}

// función para verificar si se ha compleatodo una fila, columna o diagonal
function verificar(num){
    // obtenemos un array con los resultados de acierto dentro del array que guarda todos los aciertos
    const probarCarton = resulCarton[num]
    // se comprueba las osibles solucines
    if (probarCarton[0][0] == "x" && probarCarton[0][1] == "x" && probarCarton[0][2] == "x" && probarCarton[0][3] == "x" && probarCarton[0][4] == "x"){return true}
    else if (probarCarton[1][0] == "x" && probarCarton[1][1] == "x" && probarCarton[1][2] == "x" && probarCarton[1][3] == "x" && probarCarton[1][4] == "x"){return true}
    else if (probarCarton[2][0] == "x" && probarCarton[2][1] == "x" && probarCarton[2][2] == "x" && probarCarton[2][3] == "x" && probarCarton[2][4] == "x"){return true}
    else if (probarCarton[3][0] == "x" && probarCarton[3][1] == "x" && probarCarton[3][2] == "x" && probarCarton[3][3] == "x" && probarCarton[3][4] == "x"){return true}
    else if (probarCarton[4][0] == "x" && probarCarton[4][1] == "x" && probarCarton[4][2] == "x" && probarCarton[4][3] == "x" && probarCarton[4][4] == "x"){return true}
    else if (probarCarton[0][0] == "x" && probarCarton[1][0] == "x" && probarCarton[2][0] == "x" && probarCarton[3][0] == "x" && probarCarton[4][0] == "x"){return true}
    else if (probarCarton[0][1] == "x" && probarCarton[1][1] == "x" && probarCarton[2][1] == "x" && probarCarton[3][1] == "x" && probarCarton[4][1] == "x"){return true}
    else if (probarCarton[0][2] == "x" && probarCarton[1][2] == "x" && probarCarton[2][2] == "x" && probarCarton[3][2] == "x" && probarCarton[4][2] == "x"){return true}
    else if (probarCarton[0][3] == "x" && probarCarton[1][3] == "x" && probarCarton[2][3] == "x" && probarCarton[3][3] == "x" && probarCarton[4][3] == "x"){return true}
    else if (probarCarton[0][4] == "x" && probarCarton[1][4] == "x" && probarCarton[2][4] == "x" && probarCarton[3][4] == "x" && probarCarton[4][4] == "x"){return true}
    else if (probarCarton[0][0] == "x" && probarCarton[1][1] == "x" && probarCarton[2][2] == "x" && probarCarton[3][3] == "x" && probarCarton[4][4] == "x"){return true}
    else if (probarCarton[0][4] == "x" && probarCarton[1][3] == "x" && probarCarton[2][2] == "x" && probarCarton[3][1] == "x" && probarCarton[4][0] == "x"){return true}
    return false
}

// parte principal del JavaScrip

// creamos por defecto un carton
cartonNuevo()

// Creamos una variable donde introduciremos un ciclo de repeticion
// llamaremos a la función bola cada 5 segundos que es la mostrará una bola aleatoria cada 5 segundos
let tiempo = setInterval(bola, 5000)