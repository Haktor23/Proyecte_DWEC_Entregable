//Game view se encargara de devolver las funciones para inicializar el juego
//Crear funcion para llamar dependiendo la pagina a la que se haga click

import {  obtainAllGames, getData } from "../supabase/conectahttp.js";
export { generateGameList };


const generateGameList = () => {
  const containerDiv = document.createElement('div');

  const titleDiv = document.createElement('div');
  titleDiv.innerHTML = `<h2 class="games-title">Tus partidas</h2>`;
  containerDiv.appendChild(titleDiv);

  const gameListTable = document.createElement('table');
  gameListTable.classList.add('games-table');
  containerDiv.appendChild(gameListTable);

  /* Aqui pasamos el juego ya descargado */
  const generateTable = (games) => {
    gameListTable.innerHTML += games.map((games) => {
      // Convertir el objeto 'game_state' a una cadena JSON para visualización

      return `<tr class="games-row">
        <td>
          <pre>${(games.id)}</pre>
        </td>
        <td class="games-cell">
          <pre>${games.id}</pre>
        </td>
        <td class="login-btn-play"><button class="play" id="play_${games.id}">Play</button></td>
      </tr>`;
    }).join('');
    /*gameListTable.addEventListener('click', (event) => {
      const button = event.target;
      if (button.tagName === 'BUTTON') {
        const gameId = button.id.split('_')[1];
        /* Actualizar el id y volver a enviar el juego para repintar */
        //localStorage.setItem('id', id);
       // window.location.hash = `#/game?id=${id}`;
     // }
   // });
  };

  /* Cargar los juegos leidos para enviarlos a generar */
 
    obtainAllGames().then((games) => {
      generateTable(games);
    });
  
  return containerDiv;
}