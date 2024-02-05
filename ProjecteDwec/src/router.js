import { loginForm } from './js/login.js';
import { registerForm } from './js/register.js';
import { home } from './js/home.js';
import { guardarEstado, iniciarJuego } from "./js/programabase.js";
import { createData, getData } from "./supabase/connectahttp.js";
import { crearTablaDesdeMatriz } from './js/programabase.js';
//import { generateGameList } from "./js/partidas.js";
export { route };

function route(ruta) {
  console.log({ ruta });
  let params = ruta.split('?')[1];
  params = params ? new Map(params.split('&').map((param) => {
    const paramArray = param.split('=');
    return [paramArray[0], paramArray[1]];
  })) : new Map();
  console.log({ params });
  ruta = ruta.split('?')[0];
  const main = document.querySelector('#container');

  switch (ruta) {
    case '#/':
      main.innerHTML = '';
      main.append(home());

      break;
    case '#/login':
      main.innerHTML = '';
      main.append(loginForm());
      break;
    case '#/game':
      main.innerHTML = '';
      console.log(localStorage.getItem("gameId"), "gameId");
      if (!localStorage.getItem("gameId")) {
        main.innerHTML = '';
        console.log("Entra a if");
        const arrayJoc = iniciarJuego(7, 6);
        main.append(crearTablaDesdeMatriz(arrayJoc));

      } else {
        main.innerHTML = '';
        console.log("Entra a else");
        getData(localStorage.getItem('gameId'), localStorage.getItem('access_token')).then((data) => {
          const arrayJoc = data[0].partida.arrayJoc;
          main.append(crearTablaDesdeMatriz(arrayJoc));
        });
      }

      break;
    case '#/register':
      main.innerHTML = '';
      main.append(registerForm());
      break;
    case '#/logout':
      logout();
      window.location.hash = '#/';
      break;
    case '#/profile':
      main.innerHTML = '';
      main.append(profileForm());
      break;
    case '':
      window.location.hash = '#/login';
      break;
    default:
      window.location.hash = '#/login';
  }
}