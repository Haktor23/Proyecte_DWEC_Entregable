import { comprobarGanador } from './comprobacion.js';
import { createData , updateData} from "../supabase/connectahttp.js";
export { guardarEstado, crearTablaDesdeMatriz,iniciarJuego };



const jugadores = ["Jugador 1", "Jugador 2"];
let jugadorActual = 0;


function iniciarJuego(filas,columnas) {
  let arrayJoc = [];
  for (let i = 0; i < filas; i++) {
    arrayJoc[i] = new Array(columnas);
    for (let j = 0; j < columnas; j++) {
      arrayJoc[i][j] = 0;
    }
  }
  return arrayJoc;
}
function guardarEstado(arrayJoc) {
  const estadoJuego = {
    arrayJoc: arrayJoc, 
  };
  return estadoJuego;
}

function createGameServer(arrayJoc) {
  let estadoActual= guardarEstado(arrayJoc);
  return createData(localStorage.getItem("access_token"), estadoActual);

  
}


function crearTablaDesdeMatriz(matriz) {
  let juegoTerminado = false;
  const titulo = document.createElement('h1');
  titulo.classList.add('titulo');
  titulo.textContent = 'Connecta 4';
  document.body.appendChild(titulo);
  const tabla = document.createElement('form');
  tabla.classList.add("tablero");

  matriz.forEach((fila, y) => {
    const filaElemento = document.createElement('tr');

    fila.forEach((valor, x) => {
      const celda = document.createElement('td');
      
      filaElemento.append(celda);

      celda.addEventListener("click", () => {
        if (!juegoTerminado && !columnaCompleta(matriz, x)) {
          matriz = modificarArray(matriz, x, jugadorActual);
          actualizarTabla(tabla, matriz,6);

         let estadoActual= guardarEstado(matriz);
         updateData(localStorage.getItem("gameId"),localStorage.getItem("access_token"), estadoActual);
         console.log("Estado:", guardarEstado(matriz));

          if (comprobarGanador(matriz)) {
            alert(`¡El Jugador ${jugadorActual + 1} ha ganado!`);
            juegoTerminado = true;
            return;
          }

          cambiarJugador(matriz);
        }
      });

      cambiarColorCelda(celda, valor);
    });

    tabla.append(filaElemento);
  });

  

  const botonReinicio = document.createElement('button');
  botonReinicio.classList.add('botonReinicio');
  botonReinicio.textContent = 'Restart';

botonReinicio.addEventListener("click",async ()=>{
  let iniciador =iniciarJuego(7,6);
  let gameCreate= await createGameServer(iniciador);
  console.log(gameCreate[0].id);
  localStorage.setItem("gameId",gameCreate[0].id)

})
  
  document.body.appendChild(tabla);
  document.body.appendChild(botonReinicio);
  return tabla;
}



function columnaCompleta(matriz, columna) {
  return matriz[0][columna] !== 0;
}

function modificarArray(matriz, columna, jugador) {
  let matrizcopia = [...matriz];
  for (let i = matrizcopia.length - 1; i >= 0; i--) {
    if (matrizcopia[i][columna] === 0) {
      matrizcopia[i][columna] = jugador + 1;
      return matrizcopia;
    }
  }
}

function actualizarTabla(tabla, matriz,columnas) {
  const celdas = tabla.querySelectorAll('td');
  celdas.forEach((celda, i) => {
    const fila = Math.floor(i / columnas);
    const columna = i % columnas;
    cambiarColorCelda(celda, matriz[fila][columna]);
  });
}

function cambiarJugador(arrayJoc) {
  jugadorActual = jugadorActual === 0 ? 1 : 0;
  console.log("Turno de " + jugadores[jugadorActual]);

  if (comprobarGanador(arrayJoc)) {
    alert(`¡El Jugador ${jugadorActual + 1} ha ganado!`);
    return;
  }
}


function cambiarColorCelda(celda, valor) {
  if (valor === 1) {
    celda.style.backgroundColor = "red";
  } else if (valor === 2) {
    celda.style.backgroundColor = "blue";
  } else {
    celda.style.backgroundColor = "white";
  }
}


// Ejemplo de cómo usar la función guardarEstado
const estadoInicial = guardarEstado();
console.log("Estado Inicial:", estadoInicial);

// Simular un cambio en el juego
jugadorActual = 1;

// Guardar el estado después del cambio
const estadoDespuesCambio = guardarEstado();
console.log("Estado Después del Cambio:", estadoDespuesCambio);