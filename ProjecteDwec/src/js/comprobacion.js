export { comprobarGanador };



function comprobarGanador(matriz) {
  let ganador;
  const filas = matriz.length;
  const columnas = matriz[0].length;



  // Comprobar horizontalmente
  for (let i = 0; i < filas; i++) {
    for (let j = 0; j <= columnas - 4; j++) {
      const jugador = matriz[i][j];
      if (jugador !== 0 && matriz[i][j + 1] === jugador && matriz[i][j + 2] === jugador && matriz[i][j + 3] === jugador) {
        ganador = jugador;
        return true;
      }
    }
  }

  // Comprobar verticalmente
  for (let i = 0; i <= filas - 4; i++) {
    for (let j = 0; j < columnas; j++) {
      const jugador = matriz[i][j];
      if (jugador !== 0 && matriz[i + 1][j] === jugador && matriz[i + 2][j] === jugador && matriz[i + 3][j] === jugador) {
        ganador = jugador;
        return true;
      }
    }
  }

  // Comprobar diagonalmente ascendente
  for (let i = 3; i < filas; i++) {
    for (let j = 0; j <= columnas - 4; j++) {
      const jugador = matriz[i][j];
      if (jugador !== 0 && matriz[i - 1][j + 1] === jugador && matriz[i - 2][j + 2] === jugador && matriz[i - 3][j + 3] === jugador) {
        ganador=jugador;
        return true;
      }
    }
  }

  // Comprobar diagonalmente descendente
  for (let i = 0; i <= filas - 4; i++) {
    for (let j = 0; j <= columnas - 4; j++) {
      const jugador = matriz[i][j];
      if (jugador !== 0 && matriz[i + 1][j + 1] === jugador && matriz[i + 2][j + 2] === jugador && matriz[i + 3][j + 3] === jugador) {
        ganador=jugador;
        return true;
      }
    }
  }


  
  return ganador;

}