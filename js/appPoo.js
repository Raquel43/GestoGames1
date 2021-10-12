import {Juego} from './Juego.js';
const button = document.querySelector("#btn-guardar");

   
let jJedi = new Juego("Star Wars Jedi:Fallen Order","Five start Studio","aventures", 13, "12/12/2019");
let jTermi = new Juego("Terminator","Marvel Studio","aventures", 13, "12/12/2019");
let jHalo = new Juego("Halo","Pixel Studio","dibuixos", 5, "12/12/2019");

//Carga los datos del localStorage y si no hay datos coge los que hay fijos
let juegoList =  JSON.parse(localStorage.getItem("juegosPoo")) || [jJedi, jTermi, jHalo] ;


document.addEventListener("DOMContentLoaded",()=>{
    populateJuegos();
    button.addEventListener("click", addJuego);  
})
    



//Función que añade el juego introducido mediante el formulario
const addJuego = ()=>{

    let nameInput =  document.querySelector('#nombre').value;
    let desenvolupador = document.getElementById("desarrollador").value;
    let lanzamiento = document.getElementById("lanzamiento").value;
  
//Compara si el nombre introducido ya está en la lista de juegos
    if( juegoList.some(j => j.nom == nameInput)){
        alert("El nombre del juego ya ha sido introducido");
        return false;
    }
//Comprueba si hay algún campo vacio
    if (nameInput == "" || desenvolupador == "" || lanzamiento == "") {
        alert("Faltan dades obligatories");
        return false;
    }


    let juego = new Juego(
        document.querySelector('#nombre').value,
        document.querySelector('#desarrollador').value,
        document.querySelector('#genero').value,
        document.querySelector('#pegi').value,
        document.querySelector('#lanzamiento').value,
    );

    juegoList.push(juego);
    GuardarLocal();
    populateJuegos();
}

//Pintamos los datos en el HTML
function populateJuegos(){
    const tablaJuegos = document.querySelector('#juegos');
    tablaJuegos.innerHTML = "";
    juegoList.forEach((joc,index)=>{
        tablaJuegos.innerHTML+=`
        <tr>
      <th>${index+1}</th>
      <td>${joc.nom}</td>
      <td>${joc.desenvolupador}</td>
      <td>${convertDateFormat(joc.lanzamiento)}</td>
      <td>${joc.genere}</td>
    </tr>
     `
    })
}

function GuardarLocal() {
    // Comprovar en primer lloc si l'objecte Storage es troba definit al motor del navegador
    if (typeof Storage == "undefined") {
      alert("Localstore no soportado por el navegador");
    } else {
      console.log("Estoy guardando usuarios");
  
      // LocalStorage disponible
      // Guardar i extreure objectes json del Storage:
  
      let dadesNoves = juegoList;
  
      //Pasamos los datos a string para poder guardarlos en el localStorage
      localStorage.setItem("juegosPoo", JSON.stringify(dadesNoves));
      alert("objeto guardado");
    }
  }
  
  function convertDateFormat(fecha) {
    var info = fecha.split("-").reverse().join("/");
    return info;
  }