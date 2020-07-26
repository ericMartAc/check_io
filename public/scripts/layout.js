'use stricts'
try {//asignacion de valores
  var arr_toSelenium = [];
  var t = "";
} catch (error) { console.log('error en asignaciones') }

//-------final de asignaciones-----------------------------------------------------


//____----------------------------------PAGINA

try {//evento escuchador para agregar archivo txt desde explorador de archivos
  document.getElementById('file-input')
    .addEventListener('change', leerArchivo, false);
} catch (error) { console.log('error en carga de archivo') }

try {//funcionalidades de menu lateral
  $(document).ready(function () {
    //activar desactivar sidebar
    $("#sidebarCollapse").on("click", function () {
      $("#sidebar").toggleClass("active");
    });
    //mostrar nombre de usuario activo
    const storage = window.localStorage;
    const inforPersona = JSON.parse(storage.getItem('usuario'));
    $('#nombreUser')[0].textContent = inforPersona.username;

  });
} catch (error) { console.log('no user activated') }


//____----------------------------------PAGINA



//____----------------------------------MOSTRAR CONTENIDO COMPROBADO
//funciones de operación----------------------------------------------------------

function leerArchivo(e) {//funcion para leer archivo txt
  limpiar();
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function (e) {
    var contenido = e.target.result;
    mostrarContenido(contenido);
  };
  lector.readAsText(archivo);
}

function mostrarContenido(contenido) {//mostar contenido de datos a procesar
  let elemento = document.getElementById('contenido-archivo');
  elemento.innerHTML = contenido;
}

function mostrarContenido1_1(contenido) {//mostar contenido de datos a procesar

  var elemento = document.getElementById('contenido-archivo');

  if (contenido == 0) {//evitando lineas en blanco
    console.log(contenido, ' descartado: no cumple condiciones: ', contenido.length, ' es cero');
  } else {
    if (contenido.length > 29) {//evitando valores excesivos
      console.log(contenido, ' descartado: no cumple condiciones: ', contenido.length, 'datos excesivos');
    } else {
      if (contenido == '0000000000000000') {// evitando el 0000000000000 en numero de tartjeta
        console.log(contenido, ' descartado: no cumple condiciones: ', contenido, 'erroneo');
      } else {
        if (contenido < 6) {//evitando numero de tarjeta excesivos dígitos
          console.log(contenido, ' descartado: no cumple condiciones: ', contenido, 'numeros excesivos');
        } else {
          let fecha = new Date();
          let año = fecha.getFullYear();
          try {
            elemento.innerHTML += contenido + '\n';
          } catch (error) {
            console.log('error enviando datos al servidor: ', error);
          }
        }
      }
    }
  }

}

function mostrarContenido2(contenido, fechaQ) {//mostar contenido de bin consultado
  let elemento = document.getElementById('contenido-archivo2');

  if (contenido == 0) {//evitando lineas en blanco
    console.log(contenido, ' descartado: no cumple condiciones: ', contenido.length, ' es cero');
  } else {
    if (contenido.length > 29) {//evitando valores excesivos
      console.log(contenido, ' descartado: no cumple condiciones: ', contenido.length, 'datos excesivos');
    } else {
      if (contenido == '0000000000000000') {// evitando el 0000000000000 en numero de tartjeta
        console.log(contenido, ' descartado: no cumple condiciones: ', contenido, 'erroneo');
      } else {
        if (contenido < 6) {//evitando numero de tarjeta excesivos dígitos
          console.log(contenido, ' descartado: no cumple condiciones: ', contenido, 'numeros excesivos');
        } else {
          let fecha = new Date();
          let año = fecha.getFullYear();
          try {
            elemento.innerHTML += contenido + ' ' + fechaQ + '\n';
            elemento.style.color = 'rgb(93, 253, 72)';
          } catch (error) {
            console.log('error enviando datos al servidor: ', error);
          }
        }
      }
    }
  }
}

function mostrarContenido3(contenido) {//mostar contenido de datos con bin inexistentes
  var elemento = document.getElementById('contenido-archivo3');

  if (contenido == 0) {//evitando lineas en blanco
    console.log(contenido, ' descartado: no cumple condiciones: ', contenido.length, ' es cero');
  } else {
    if (contenido.length > 29) {//evitando valores excesivos
      console.log(contenido, ' descartado: no cumple condiciones: ', contenido.length, 'datos excesivos');
    } else {
      if (contenido == '0000000000000000') {// evitando el 0000000000000 en numero de tartjeta
        console.log(contenido, ' descartado: no cumple condiciones: ', contenido, 'erroneo');
      } else {
        if (contenido < 6) {//evitando numero de tarjeta excesivos dígitos
          console.log(contenido, ' descartado: no cumple condiciones: ', contenido, 'numeros excesivos');
        } else {
          let fecha = new Date();
          let año = fecha.getFullYear();
          try {
            elemento.innerHTML += contenido + '\n';
            elemento.style.color = 'red';
          } catch (error) {
            console.log('error enviando datos al servidor: ', error);
          }
        }
      }
    }
  }
}


//____----------------------------------MOSTRAR CONTENIDO COMPROBADO



//____----------------------------------LIMPIAR DATOS

function limpiarDATOS() {
  console.log('limpiar CONTENIDO DATOS')
  let elementoo = document.getElementById('contenido-archivo');
  elementoo.innerHTML = '';
}
function limpiarCont2() {
  console.log('limpiar CONTENIDO DATOS EXISTENTES')
  let elementoo = document.getElementById('contenido-archivo2');
  elementoo.innerHTML = '';
}
function limpiarBlacklist() {
  console.log('limpiar Blacklist')
  let elementoo = document.getElementById('contenido-archivo3');
  elementoo.innerHTML = '';
}
function limpiarContQ() {
  let cont = document.getElementById('cont');
  let cont_datos_tbl = document.getElementById('cont_datos_tbl');//hijo a eliminar del cont
  cont.removeChild(cont_datos_tbl);
}
function limpiar() {
  try { limpiarDATOS(); } catch (error) { console.log(error) }
  try { limpiarCont2(); } catch (error) { console.log(error) }
  try { limpiarBlacklist(); } catch (error) { console.log(error) }
  try { limpiarContQ(); } catch (error) { console.log(error) }
  setTimeout(() => {
    console.clear();
  }, 1000);
}

//____----------------------------------LIMPIAR DATOS


//___---------------------------------COMPORBAR

//funcion para enviar datos a consultar en redis --------------------------------
function comprobar() {
  console.clear();
  limpiarCont2();
  limpiarBlacklist();
  let arr_dato = []; //arreglo para obtener numeros
  let cant_tarj = 0;
  var val_cont2 = [];//arreglo a mostar en el recuadro bin consultados
  var val_cont3 = [];//arreglo a mostar en el recuadro bin lista negra
  var arr_mostrar = [];


  // tomando valores ingresados por usuario
  var lines = $('#contenido-archivo').val().split('\n');

  for (var i = 0; i < lines.length; i++) {

    //numero de cada linea para enviar a procesar
    let dato = lines[i][0] + lines[i][1] + lines[i][2] + lines[i][3] +
      lines[i][4] + lines[i][5] + lines[i][6] + lines[i][7] +
      lines[i][8] + lines[i][9] + lines[i][10] + lines[i][11] +
      lines[i][12] + lines[i][13] + lines[i][14] + lines[i][15];
    //numero de cada linea para enviar a procesar
    let datoMes = lines[i][17] + lines[i][18];
    //numero de cada linea para enviar a procesar
    let datoAño = lines[i][20] + lines[i][21] + lines[i][22] + lines[i][23];
    //numero de cada linea para enviar a procesar
    let datoCVC = lines[i][25] + lines[i][26] + lines[i][27];

    if (lines[i].length == 0) {//evitando lineas en blanco
      console.log(lines[i], ' descartado: no cumple condiciones: ', lines[i].length, ' es cero');
    } else {
      if (lines[i].length > 28) {//evitando valores excesivos
        console.log(lines[i], ' descartado: no cumple condiciones: ', lines[i].length, 'datos excesivos');
      } else {
        if (dato == '0000000000000000') {// evitando el 0000000000000 en numero de tartjeta
          console.log(lines[i], ' descartado: no cumple condiciones: ', dato, 'erroneo');
        } else {
          if (dato < 17) {//evitando numero de tarjeta excesivos dígitos
            console.log(lines[i], ' descartado: no cumple condiciones: ', dato, 'numeros excesivos');
          } else {
            let fecha = new Date();
            let año = fecha.getFullYear();
            //evitando error en dato fecha de tarjeta
            if (parseInt(datoMes) < 01 || parseInt(datoMes) > 12 || parseInt(datoAño) < 1910 || parseInt(datoAño) > 2100) {
              console.log(lines[i], ' descartado: no cumple condiciones: ', parseInt(datoMes), '-',
                parseInt(datoAño), 'fecha errónea a año: ');
            } else {
              if (parseInt(datoCVC) < 1 || parseInt(datoCVC) > 999) {
                console.log(lines[i], ' descartado: no cumple condiciones: ', datoCVC, 'errado');
              } else {//ENVIANDO EL NUMERO
                try {
                  //let dato = lines[i][0] + lines[i][1] + lines[i][2] + lines[i][3] + lines[i][4] + lines[i][5] + lines[i][6] + lines[i][7] + lines[i][8] + lines[i][9] + lines[i][10] + lines[i][11] + lines[i][12] + lines[i][13] + lines[i][14] + lines[i][15];
                  arr_dato.push(lines[i]);// cragamos linea por linea al arreglo
                  cant_tarj = i;
                } catch (error) {
                  console.log('error enviando datos al servidor: ', error);
                }
              }
            }
          }
        }
      }
    }
  }
  let data = {//lista con valores a enviar
    r: "comprobar_enRedis", // damos clave del proceso
    c: cant_tarj,
    d: arr_dato //arreglo con datos de numeros cargados
  };

  let json_arr_data = JSON.stringify(data);

  //socket para conectarse a microservicio de registro
  let ws = new WebSocket("ws://localhost:5000");

  ////enviamos los datos en modo texto
  ws.onopen = () => {//manejador websocket cambia de estado a abierto
    ws.send(json_arr_data);
    console.log('enviado a servidor: ', json_arr_data);
  };

  //evento que espera respuesta del socket a causa de la consulta
  //existente BIN/IIN o no existente BIN/IIN
  ws.addEventListener("message", function (event) {
    try {//RECIBE LISTA CON b:datos de consulta y h:estado historial de consulta
      //PROPIO

      limpiar()
      let rpta = JSON.parse(event.data);//se recoge paquete en modo string
      console.log(rpta);
      let hist = rpta.h; //historial de estado de consulta --- valor a usar
      //DESCOMPUESTO LISTA
      try {
        var reslt_conslt = JSON.parse(rpta.b);//resultado de consulta para consultados



        let card = reslt_conslt.card;//no tarjeta --- valor a usar
        let valor = reslt_conslt.v;//result valor --- valor a usar
        let dateQ = reslt_conslt.dateQ;//result valor --- valor a usar

        if (hist == 'consultado previo' && valor == 'existente BIN/IIN') {//si ha sido consultado 
          //cargemos el dato en un arreglo
          //mostremoslo en el recuadro datos consultados
          let arr_mostrarr = [];
          let arr_fecha = [];
          arr_mostrarr.push(rpta.a);
          arr_fecha.push(dateQ);
          console.log(rpta.a, ' desde: ', dateQ)

          setTimeout(() => {
            mostrarContenido2(arr_mostrarr[0].trim(), arr_fecha[0].trim());
          }, 6000)
        }
        if ((hist == 'consultado previo' && valor == 'no existente BIN/IIN') || valor == 'no existente BIN/IIN') {//si es lista negra de redis
          //cargemos el dato en un arreglo
          //mostremoslo en el recuadro lista negra
          let arr_mostrarr = [];
          arr_mostrarr.push(rpta.a);
          console.log(rpta.a, ' desde: ', dateQ)

          setTimeout(() => {
            mostrarContenido3(arr_mostrarr[0].trim());
            console.log(arr_mostrarr[0]);
          }, 6000)
        }
        if (reslt_conslt == 0) {//nunca ha sido consultado
          //proceder a consultar en selenium

          let arr_mostrarr = [];
          arr_mostrarr.push(rpta.a);
          console.log(rpta.a, 'resp')

          setTimeout(() => {
            mostrarContenido1_1(arr_mostrarr[0].trim());
            console.log(arr_mostrarr[0]);
          }, 6000)



        }
      } catch (error) {
        var reslt_conslt = rpta.b;//resultado de consulta para no consultados
      }
    } catch (error) {
      console.log('error recibiendo datos:', error);
    }
  });




};

//___---------------------------------COMPORBAR



//____----------------------------------generar BIN


//funcion para enviar datos a consultar con selenium --------------------------------
function GenerarBin1() {
  console.clear();
  let arr_dato = []; //arreglo para obtener numeros para enviar a seleium
  var cant_tarj = 0;

  // tomando valores ingresados por usuario
  var lines = $('#contenido-archivo').val().split('\n');

  for (var i = 0; i < lines.length; i++) {

    //numero de cada linea para enviar a procesar
    let dato = lines[i][0] + lines[i][1] + lines[i][2] + lines[i][3] +
      lines[i][4] + lines[i][5] + lines[i][6] + lines[i][7] +
      lines[i][8] + lines[i][9] + lines[i][10] + lines[i][11] +
      lines[i][12] + lines[i][13] + lines[i][14] + lines[i][15];
    //numero de cada linea para enviar a procesar
    let datoMes = lines[i][17] + lines[i][18];
    //numero de cada linea para enviar a procesar
    let datoAño = lines[i][20] + lines[i][21] + lines[i][22] + lines[i][23];
    //numero de cada linea para enviar a procesar
    let datoCVC = lines[i][25] + lines[i][26] + lines[i][27];

    if (lines[i].length == 0) {//evitando lineas en blanco
      console.log(lines[i], ' descartado: no cumple condiciones: ', lines[i].length, ' es cero');
    } else {
      if (lines[i].length > 35) {//evitando valores excesivos
        console.log(lines[i], ' descartado: no cumple condiciones: ', lines[i].length, 'datos excesivos');
      } else {
        if (dato == '0000000000000000') {// evitando el 0000000000000 en numero de tartjeta
          console.log(lines[i], ' descartado: no cumple condiciones: ', dato, 'erroneo');
        } else {
          if (dato < 17) {//evitando numero de tarjeta excesivos dígitos
            console.log(lines[i], ' descartado: no cumple condiciones: ', dato, 'numeros excesivos');
          } else {
            let fecha = new Date();
            let año = fecha.getFullYear();
            if (parseInt(datoMes) < 01 || parseInt(datoMes) > 12 ||
              parseInt(datoAño) < 1910 || parseInt(datoAño) > 2100) {//evitando error en dato fecha de tarjeta
              console.log(lines[i], ' descartado: no cumple condiciones: ', parseInt(datoMes), '-',
                parseInt(datoAño), 'fecha errónea a año: ');
            } else {
              if (parseInt(datoCVC) < 1 || parseInt(datoCVC) > 999) {
                console.log(lines[i], ' descartado: no cumple condiciones: ', datoCVC, 'errado');
              } else {
                setTimeout(() => {
                  try {
                    let datoC = dato + '|' + datoMes + '|' + datoAño + '|' + datoCVC;
                    //let dato = lines[i][0] + lines[i][1] + lines[i][2] + lines[i][3] + lines[i][4] + lines[i][5] + lines[i][6] + lines[i][7] + lines[i][8] + lines[i][9] + lines[i][10] + lines[i][11] + lines[i][12] + lines[i][13] + lines[i][14] + lines[i][15];
                    let data = {//lista con valores a enviar
                      r: "verificar_tarjeta_wSelenium", // damos clave del proceso
                      card: dato, //numero a consultar en selenium
                      a: datoC
                    };

                    //socket para conectarse a microservicio de registro
                    let ws = new WebSocket("ws://localhost:5000");

                    ////enviamos los datos en modo texto
                    ws.onopen = () => {//manejador websocket cambia de estado a abierto
                      ws.send(JSON.stringify(data));
                      console.log('enviado a servidor: ', data);
                    };

                    //evento que espera respuesta del socket a causa de la consulta


                    //evento que espera respuesta del socket a causa de la consulta
                    //existente BIN/IIN o no existente BIN/IIN
                    ws.addEventListener("message", function (event) {
                      try {//RECIBE LISTA CON b:datos de consulta y h:estado historial de consulta
                        //PROPIO

                        let rpta = JSON.parse(event.data);//se recoge paquete en modo string
                        console.log(rpta);
                        if (rpta.v == 'existente BIN/IIN') {
                          var datosM = '<div id="cont_datos_tbl" class="cont-datos-tbl"><span class="cd-3"><span id="numeroCart">' +
                            rpta.card[0] + rpta.card[1] + rpta.card[2] + rpta.card[3] + ' ' +
                            rpta.card[4] + rpta.card[5] + rpta.card[6] + rpta.card[7] + ' ' +
                            rpta.card[8] + rpta.card[9] + rpta.card[10] + rpta.card[11] + ' ' +
                            rpta.card[12] + rpta.card[13] + rpta.card[14] + rpta.card[15] +
                            '</span></span><span class="cd-1">' + rpta.card[17] + rpta.card[18] +
                            '</span><span class="cd-1">' + rpta.card[20] + rpta.card[21] + rpta.card[22] + rpta.card[23] +
                            '</span><span class="cd-2">' + rpta.card[25] + rpta.card[26] + rpta.card[27] +
                            '</span><span class="cd-3">' + rpta.marca +
                            '</span><span class="cd-2">' + rpta.tipo +
                            '</span><span class="cd-2">' + rpta.nivel +
                            '</span><span class="cd-5">' + rpta.banco +
                            '</span><span class="cd-1">' + rpta.pais +
                            '</span><div class="cd-3"> <button class="btn-success">Detalle</button></div></div>';
                          let cont = document.getElementById('cont');
                          cont.innerHTML += datosM;
                          limpiarDATOS();
                        } else {
                          if (rpta.v == 'no existente BIN/IIN') {
                            //agregar a lista negra
                            mostrarContenido3(rpta.card);
                            limpiarDATOS();

                          }
                        }



                      } catch (error) {
                        console.log('error recibiendo datos:', error);
                      }
                    });





                  } catch (error) {
                    console.log('error enviando datos al servidor: ', error);
                  }
                }, i*30000);
              }
            }
          }
        }
      }
    }
  }

};

//____----------------------------------generar BIN






//___---------------------------------salir


salirSesion = () => {
  const storage = window.localStorage;
  storage.removeItem('estadoSesion');
  storage.removeItem('usuario');
  window.location = `../login/Login.pug`;
}














/*//MODAL
//menu lateral
var state_modal_add = 0;

//INICIO MODAL ADD----------------------------
//abrir modal add
$(document).ready(function () {
  $("#add_txt").on("click", function () {
    if (state_modal_add == 1) {
      $("#cont-modal").css("display", "none");
      $("#modal-add").css("display", "none");
      state_modal_add = 0;
    } else {
      if (state_modal_add == 0) {
        $("#cont-modal").css("display", "block");
        $("#modal-add").css("display", "block");
        state_modal_add = 1;
      }
    }
  });
});
//cerrar modal add
$(document).ready(function () {
  $("#btn-close").on("click", function () {
    if (state_modal_add == 1) {
      $("#cont-modal").css("display", "none");
      $("#modal-add").css("display", "none");
      state_modal_add = 0
    } else {
      if (state_modal_add == 0) {
        $("#cont-modal").css("display", "block");
        $("#modal-add").css("display", "block");
        state_modal_add = 1
      }
    }
  });
});
//FINAL MODAL ADD-----------------------------


*/
