
const fetchTodo = (url) => {

	fetch(url, {
      method: "PUT",
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
        console.log(response.ok); // Será true (verdad) si la respuesta es exitosa.
        console.log(response.status); // el código de estado = 200 o código = 400 etc.
        console.log(response.text()); // Intentará devolver el resultado exacto como cadena (string)
        return response.json(); // (regresa una promesa) will try to parse the result as json as return a promise that you can .then for results
    })
    .then(data => {
        //Aquí es donde debe comenzar tu código después de que finalice la búsqueda
		
        console.log(data); //esto imprimirá en la consola el objeto exacto recibido del servidor
    })
    .catch(error => {
        //manejo de errores
        console.error(error);
    });


}