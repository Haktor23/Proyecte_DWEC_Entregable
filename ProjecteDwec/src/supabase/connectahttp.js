export {supaRequest, createData,updateData, getData, obtainAllGames};
//Postman
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJmYnd1a3J2cmtraGJ0dWF1a2RwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTkyNjY2MjAsImV4cCI6MjAxNDg0MjYyMH0.QKi09YKfXtx5RseUAYaE2zQwBEVw0ajJbEpCJXIgvJg';

const urlBase = 'https://rfbwukrvrkkhbtuaukdp.supabase.co';
const headers = {
  apiKey: SUPABASE_KEY,
  'Content-Type': 'application/json',
};

/// ////////
/// /////// Per a les peticions normals a dades de la base de dades
/// ///////
async function supaRequest(url, method, headers, body) {
  const response = await fetch(url, {
    method,
    headers,
    body: JSON.stringify(body), // En cas d'enviar dades per post, put patch...
  });
  if (response.status >= 200 && response.status <= 300) { // En cas d'error en el servidor
    if (response.headers.get('content-type')) { // Si retorna un JSON
      return await response.json();
    }
    return {}; // Si no contesta res no té content-type i cal retornar un objecte buit per a ser coherent en l'eixida.
  }

  return Promise.reject(await response.json()); // En cas de problemes en el servidor retornen un reject.
}

async function createData(token, data) {
  const url = `${urlBase}/rest/v1/games`;
  console.log(token, data);
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: 'return=representation',
  };
  const response = await supaRequest(url, 'post', headersAux, {partida : data });
  return response;
}

async function updateData(id,token, data) {
  const url = `${urlBase}/rest/v1/games?id=eq.${id}`;
  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
    Prefer: 'return=representation',
  };
  const response = await supaRequest(url, 'PATCH', headersAux, {partida : data });
  return response;
}

async function getData(id,token) {
  const url = `${urlBase}/rest/v1/games?id=eq.${id}&select=*`;

  const headersAux = {
    ...headers,
    Authorization: `Bearer ${token}`,
  };
  const response = await supaRequest(url, 'GET', headersAux);
  return response;
}

async function obtainAllGames() {
  const token = localStorage.getItem('access_token');
  return getData(`games?select=*&limit=5`, token);
}

