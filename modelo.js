
var generoUsuario=0;
var edadUsuario=0;
var estadoCivilUsuario=0;
var educacionUsuario=0;
var experienciaUsuario=0;
var salariosUsuario=[];



function obtenerGeneroSeleccionado() {
  // Obtener elementos de radio
  const radioHombre = document.getElementById('generoHombre');
  const radioMujer = document.getElementById('generoMujer');

  // Verificar cuál está seleccionado
  if (radioHombre.checked) {
    return generoUsuario=1;
  } else if (radioMujer.checked) {
    return generoUsuario=0;
  } else {
    return generoUsuario=1;
  }
}



  function obtenerEstadoSeleccionado() {
    // Obtener elementos de radio
    const radioCasado = document.getElementById('estadoCasado');
    const radioSoltero = document.getElementById('estadoSoltero');
  
    // Verificar cuál está seleccionado
    if (radioCasado.checked) {
      return estadoCivilUsuario=1;
    } else if (radioSoltero.checked) {
      return estadoCivilUsuario=0;
    } else {
      return generoUsuario=0;
    }
  }

  function obtenerZonaSeleccionado() {
    // Obtener elementos de radio
    const radioUrbana = document.getElementById('estadoUrbano');
    const radioRural = document.getElementById('estadoRural');
  
    // Verificar cuál está seleccionado
    if (radioRural.checked) {
      return zonaUsuario=0;
    } else if (radioUrbana.checked) {
      return zonaUsuario=1;
    } else {
      return zonaUsuario=1;
    }
  }



  function obtenerSectorSeleccionado() {
    // Obtener elementos de radio
    const radioPublico = document.getElementById('estadoPublico');
    const radioPrivado = document.getElementById('estadoPrivado');
  
    // Verificar cuál está seleccionado
    if (radioPrivado.checked) {
      return sectorUsuario=0;
    } else if (radioPublico.checked) {
      return sectorUsuario=1;
    } else {
      return sectorUsuario=1;
    }
  }



/**
 * Modelo de la ecuación de Mincer
 */

/**
 * ecuacionMincer
 * @description Cálculo del ingreso por la ecuación de Mincer
 * @author Jennebier Esther Alvarado López
 * @date 26/11/2023
 * @param {int} edad Edad de la persona
 * @param {int} genero Masculino 0, femenino 1
 * @param {int} estadoCivil Casado(a) 1, soltero(0)
 * @param {int} educacion Años de educación
 * @param {int} experiencia Años de experiencia laboral
 * @param {Float32Array} coeficientes coeficientes de la regresión lineal de acuerdo a la categoría ocupacional
 * @returns {float} ingresos Ingreso calculado
 */
function ecuacionMincer(edad, genero, estadoCivil, educacion, zona, sector, coeficientes) {
    // Ecuación de Mincer con coeficientes dados
    const ingresos = coeficientes[0] + coeficientes[2] * edad + coeficientes[1] * genero + coeficientes[3] * estadoCivil + coeficientes[4] * zona + coeficientes[5] * educacion + coeficientes[6] * sector;
    return ingresos;
  }


  /**
   * proyeccionFutura
   * @description Cálculo del ingresos por la ecuación de Mincer por cada año proyectado
   * @author Jennebier Esther Alvarado López
   * @date 26/11/2023
   * @param {int} edad Edad de la persona
   * @param {int} genero Género de la persona
   * @param {int} educacion Años de educación base o actuales
   * @param {Int16Array} estadoCivil Arreglo de 1's y 0's para indicar el estado civil por año
   * @param {Float32Array} coeficientes Coeficientes base para la categoría ocupacional seleccionada
   * @param {int} aniosProyeccion Cantidad de años a proyectar
   * @param {Int16Array} aumentoEducacion Años de educación a aumentar por año
   * @returns {Float32Array} Ingresos proyectados para cada año
   */
  function proyeccionFutura(edad, genero, educacion, estadoCivil, coeficientes, aniosProyeccion, aumentoEducacion, zona, sector) {
    const ingresosProyectados = [];
  
    for (let i = 0; i < aniosProyeccion; i++) {
      // Aplicar tasas de crecimiento a los coeficientes para la proyección
      const coeficientesProyectados = coeficientes.map(coef => coef * (1 + 0.01));
  
      // Aplicar aumento en educación, experiencia y edad
      educacion += aumentoEducacion[i];
      experiencia += 1;
      edad +=1;
  
      // Calcular ingresos proyectados
      const ingresos = ecuacionMincer(edad, genero, estadoCivil[i], educacion, zona, sector, coeficientesProyectados);
      ingresosProyectados.push(ingresos);
    }
  
    return ingresosProyectados;
  }
  
  
  // Interfaz de usuario simulada
/*const edadUsuario = parseFloat(prompt("Ingrese su edad:"));
const generoUsuario = parseFloat(prompt("Ingrese su género (0 Masculino, 1 Femenino):"));
const estadoCivilUsuario = parseFloat(prompt("Ingrese su estado Civil (1 Casado, 0 Soltero):"));
const educacionUsuario = parseFloat(prompt("Ingrese años de educación:"));
const experienciaUsuario = parseFloat(prompt("Ingrese años de experiencia laboral:"));
const educacionAniosProyeccion=[];
const estadoCivilProyeccion=[];*/
/*
  const aniosProyeccionUsuario = parseInt(prompt("Ingrese años a proyectar al futuro:"));
  for (let i=0; i<aniosProyeccionUsuario;i++){
    const aumentoEducacionUsuario = parseFloat(prompt(`Ingrese el aumento de sus años de educación para el año ${i}:`));
    educacionAniosProyeccion[i]=aumentoEducacionUsuario;
    estadoCivilProyeccion[i]=0;
  }*/

  
  
  // Coeficientes iniciales de la ecuación de Mincer
  //const coeficientesIniciales = [-1.60, 1.8, -1.74, 0.55, 0.55, 0.018];
  //const coeficientesPrueba =[10, 1.8, 3, 2, 5, 6];
  /**
   * Salario
   * Genero
   * edad
   * casado
   * urbano
   * años de estudio
   * público
   * 
   */
  const coeficientesIniciales=[-10062.17, 2514.00, 167.27, 1651.80, 1401.99, 1000.38, 485.81];
  
  //const ingresosActuales = ecuacionMincer(edadUsuario, generoUsuario, estadoCivilUsuario, educacionUsuario, experienciaUsuario, coeficientesIniciales);
  
  //console.log(`Los ingresos actuales son: ${ingresosActuales}`);

 // const ingresosProyectados = proyeccionFutura(edadUsuario, generoUsuario, edadUsuario, estadoCivilProyeccion, coeficientesIniciales, aniosProyeccionUsuario, educacionAniosProyeccion, experienciaUsuario);
  
 // console.log(`Los ingresos proyectados en ${aniosProyeccionUsuario} años son: ${ingresosProyectados}`);


 function verSalario(){
  var generoUsuario=obtenerGeneroSeleccionado();
  var edadUsuario=parseInt(document.getElementById('inputEdad').value);
  var estadoCivilUsuario=obtenerEstadoSeleccionado();
  var educacionUsuario=parseInt(document.getElementById('educacion').value);
  var zonaUsuario=obtenerZonaSeleccionado();
  var sectorUsuario=obtenerSectorSeleccionado();
  
/**
 * (edad, genero, estadoCivil, educacion, zona, sector, coeficientes)
 */
  const ingresosActuales = ecuacionMincer(edadUsuario, generoUsuario, estadoCivilUsuario, educacionUsuario, zonaUsuario, sectorUsuario, coeficientesIniciales);
  console.log('género '+ generoUsuario);
  console.log('Edad '+edadUsuario);
  console.log('Estado civil ' +estadoCivilUsuario);
  console.log('Educación '+educacionUsuario);
  console.log('Zona '+zonaUsuario);
  console.log('Sector '+sectorUsuario);
  var resultadoElemento = document.getElementById('respuesta');

  resultadoElemento.innerHTML = 'Salario Calculado: ' + ingresosActuales;

  if (generoUsuario==0){
    generoTemporal='Femenino';

  }else{
    generoTemporal='Masculino';
  }

  if (estadoCivilUsuario==0){
    estadoCivilTemporal='Soltero (a)';

  }else{
    estadoCivilTemporal='Casado (a)';
  }

  if (zonaUsuario==0){
    zonaTemporal='Rural';

  }else{
    zonaTemporal='Urbana';
  }

  if (sectorUsuario==0){
    sectorTemporal='Privado';

  }else{
    sectorTemporal='Público';
  }

  document.getElementById('edadModal').innerHTML = 'Edad ' + edadUsuario;
  document.getElementById('generoModal').innerHTML = 'Género ' + generoTemporal;
  document.getElementById('educacionModal').innerHTML = 'Años de educación ' + educacionUsuario;
  document.getElementById('estadoModal').innerHTML = 'Estado Civil: ' + estadoCivilTemporal;
  document.getElementById('zonaModal').innerHTML = 'Habitando en zona ' + zonaTemporal;
  document.getElementById('sectorModal').innerHTML = 'Trabajando en el sector ' + sectorTemporal;

  localStorage.clear();
  var salario={
    anio: 2023,
    genero: generoUsuario,
    edad: edadUsuario,
    estadoCivil: estadoCivilUsuario,
    educacion: educacionUsuario,
    zona: zonaUsuario,
    sector: sectorUsuario,
    valor: ingresosActuales
  }

  salariosUsuario.push(salario);
  console.log(salariosUsuario);
  console.log(salario);
  localStorage.setItem('salariosGuardados', JSON.stringify(salariosUsuario));

  document.getElementById('generoHombre').checked=false;
  document.getElementById('generoMujer').checked=false;
  document.getElementById('inputEdad').value='';
  document.getElementById('estadoCasado').checked=false;
  document.getElementById('estadoSoltero').checked=false;
  document.getElementById('educacion').value='';
  document.getElementById('estadoUrbano').checked=false;
  document.getElementById('estadoRural').checked=false;
  document.getElementById('estadoPublico').checked=false;
  document.getElementById('estadoPrivado').checked=false;

  return false;
  
}



// Obtiene el contexto del lienzo
var ctx = document.getElementById('myLineChart').getContext('2d');

// Define los datos del gráfico de línea
var data = {
    labels: ['0'],
    datasets: [{
        label: 'Ingreso anual',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        data: [0]
    }]
};

// Configuración del gráfico
var options = {
    scales: {
        y: {
            beginAtZero: true
        }
    },
    layout: {
        padding: 80
    }
};

// Crea el gráfico de línea
var myLineChart = new Chart(ctx, {
    type: 'line',
    data: data,
    options: options
});



// FIN DEL GRAFICO -------------------------------------------------------------------------------------------------------------------

//CREAR ESCENARIOS-------------------------------------------------------------------------------------------------------------------
/**
 * Definimos la función para generar contenido dinamico
 */

function generarContenido(){
  var cadenaSalariosUsuario=localStorage.getItem('salariosGuardados');
  var salariosUsuario = JSON.parse(cadenaSalariosUsuario);
  console.log(salariosUsuario);

  var anioTemporal=parseInt(document.getElementById('anioProyeccion').value);
  var estadoCivilUsuario=obtenerEstadoSeleccionado();
  var educacionUsuario=salariosUsuario[salariosUsuario.length-1].educacion + parseInt(document.getElementById('aniosEstudio').value)
  var zonaUsuario=obtenerZonaSeleccionado();
  var sectorUsuario=obtenerSectorSeleccionado();
  var edadTemporal=salariosUsuario[0].edad+(anioTemporal-salariosUsuario[0].anio);
  var generoTemporal =salariosUsuario[0].genero;

  const ingresosActuales = ecuacionMincer(edadTemporal, generoTemporal, estadoCivilUsuario, educacionUsuario, zonaUsuario, sectorUsuario, coeficientesIniciales);
  salarioTemporal={
    anio: anioTemporal,
    genero: generoTemporal,
    edad: edadTemporal,
    estadoCivil: estadoCivilUsuario,
    educacion: educacionUsuario,
    zona: zonaUsuario,
    sector: sectorUsuario,
    valor: ingresosActuales
  }

  salariosUsuario.push(salarioTemporal);
  myLineChart.data.labels.push(String(anioTemporal));
  myLineChart.data.datasets[0].data.push(ingresosActuales);
  myLineChart.update();
  localStorage.setItem('salariosGuardados', JSON.stringify(salariosUsuario));

  //Antes de cargar el contenido debemos borrar lo que había antes (Vaciar el contenedor) para que lo carguemos nuevamente
  document.getElementById('misTarjetas').innerHTML='';

  salariosUsuario.forEach(function(salario, index){
      //categoria representa el item  correspondiente de cada iteración del ciclo
      //El segundo parámetro index es el índice correspondiente al item que esta figurando en cada iteración
      //console.log(categoria.empresas);
      cantidadEscenarios = salariosUsuario.length;
      console.log(cantidadEscenarios);
      //empresasCategorias = categoria.empresas;    //Guardamos el arreglo de empresas de una categoría
      //cantidadEmpresas = empresasCategorias.length(); //Consultamos la cantidad de elementos en el arreglo de empresas
      if (salario.estadoCivil==0){
        estadoCivilTemporal='Soltero (a)';

      }else{
        estadoCivilTemporal='Casado (a)';
      }

      if (salario.zona==0){
        zonaTemporal='Rural';

      }else{
        zonaTemporal='Urbana';
      }

      if (salario.sector==0){
        sectorTemporal='Privado';

      }else{
        sectorTemporal='Público';
      }
      document.getElementById('misTarjetas').innerHTML += 
  `
          <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-2 m-3">
              <div class="card"  style="background-color:#F05941; cursor:pointer")">
                  <div class="card-body" id="tarjetaCategoria">
                      <h5 class="card-title" id="nombreCategoria">Salario: ${salario.valor}</h5>
                      <p class="card-text"> Año: ${salario.anio} </p>
                      <p class="card-text"> Estado Civil: ${estadoCivilTemporal} </p>
                      <p class="card-text"> Educación: ${salario.educacion} </p>
                      <p class="card-text"> Zona: ${zonaTemporal} </p>
                      <p class="card-text"> Sector: ${sectorTemporal} </p>
                      <p class="card-text">${cantidadEscenarios} escenarios</p>
                   </div>
              </div>
          </div>
  `;
  }
  );
 
  
}





function verMiUltimosDatos(){
  
  
  var cadenaSalariosUsuario=localStorage.getItem('salariosGuardados');
  var salariosUsuario = JSON.parse(cadenaSalariosUsuario);
  console.log(salariosUsuario);

  var anioTemporal=salariosUsuario[salariosUsuario.length-1].anio;
  var estadoCivilUsuario=salariosUsuario[salariosUsuario.length-1].estadoCivil;
  var educacionUsuario=salariosUsuario[salariosUsuario.length-1].educacion;
  var zonaUsuario=salariosUsuario[salariosUsuario.length-1].zona;
  var sectorUsuario=salariosUsuario[salariosUsuario.length-1].sector;
  var edadTemporal=salariosUsuario[0].edad+(anioTemporal-salariosUsuario[0].anio);
  var generoTemporal =salariosUsuario[0].genero;
  var ingresosTemporal=salariosUsuario[salariosUsuario.length-1].valor;

  if (generoTemporal==0){
    generoTemporal='Femenino';

  }else{
    generoTemporal='Masculino';
  }

  if (estadoCivilUsuario==0){
    estadoCivilTemporal='Soltero (a)';

  }else{
    estadoCivilTemporal='Casado (a)';
  }

  if (zonaUsuario==0){
    zonaTemporal='Rural';

  }else{
    zonaTemporal='Urbana';
  }

  if (sectorUsuario==0){
    sectorTemporal='Privado';

  }else{
    sectorTemporal='Público';
  }

  document.getElementById('edadOffCanva').innerHTML = 'Edad ' + edadTemporal;
  document.getElementById('generoOffCanva').innerHTML = 'Género ' + generoTemporal;
  document.getElementById('educacionOffCanva').innerHTML = 'Años de educación ' + educacionUsuario;
  document.getElementById('estadoOffCanva').innerHTML = 'Estado Civil: ' + estadoCivilTemporal;
  document.getElementById('zonaOffCanva').innerHTML = 'Habitando en zona ' + zonaTemporal;
  document.getElementById('sectorOffCanva').innerHTML = 'Trabajando en el sector ' + sectorTemporal;
  document.getElementById('respuestaCanva').innerHTML = 'Los ingresos son L.' + ingresosTemporal;

  return false;
  
}