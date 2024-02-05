export {home};

function home(){
    let mainWindowRow = document.createElement("div");
   // mainWindowRow.classList.add("row", "gx-2", "gy-2", "row-cols-3");

  
   mainWindowRow.innerHTML = `
   <div class="container mt-5">
    <div class="jumbotron text-center">
      <h1 class="display-4">¡Bienvenido al Juego de Connecta4!</h1>
      <p class="lead">¿Estás listo para jugar?</p>
      <hr class="my-4">
      <p>Haz clic en el botón de abajo para comenzar.</p>
      <a class="btn btn-primary btn-lg"  href="#/game" role="button">Comenzar Juego</a>
    </div>
  </div>
   `;



      return mainWindowRow;
}