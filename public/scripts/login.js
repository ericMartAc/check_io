//asignaciones del sistema
const port = '5000';

//si se presiona boton de registrar, levanta ventana de registro
const ver_ventana_registro = () => {
  window.location = "Register.pug";
};

//botón atrás en ventana de registro volver a ventana inicio de sesion
const varBack = document.getElementById("backArrow");
if (varBack !== null) {
  varBack.addEventListener("click", () => {
    window.history.back();
  });
}

//funcion para recuperar contraseña en redis
const recuperar = () => { };

//funcion para registrarse en redis ---------------------------------------
const registrarte = () => {
  // tomando valores ingresados por usuario
  const username = document.getElementById("username").value; 
  const email = document.getElementById("email").value;
  const pass = document.getElementById("password").value;

  //socket para conectarse a microservicio de registro
  let ws = new WebSocket("ws://localhost:5000");
  const storage = window.localStorage;//almacenar par de claves
  
  const data = {//lista con valores a registrar
    r: "create_user",
    d: [email, username, pass],
  };

  ////enviamos los datos en modo texto
  ws.onopen = () => {//manejador websocket cambia de estado a abierto
    ws.send(JSON.stringify(data)); 
  };

  //evento que espera respuesta del socket a causa del registro 
  ws.addEventListener("message", function (event) {
    let rpta = null;
    rpta = JSON.parse(JSON.stringify(JSON.parse(event.data)));
    let ans = rpta;
    if (ans.e === false) {
      storage.setItem("usuario", JSON.stringify(ans.d[1]));
      storage.setItem("estadoSesion", ans.d[2]);
      window.location = "../logued/Home.pug";
    } else {
      let msg = "";
      switch (parseInt(ans.d[1], 10)) {
        case 3:
          msg = "Datos Incompletos";
          break;
        case 2:
          msg = "Datos Incorrectos";
          break;
        case 7:
          msg = "Usuario Existente";
          break;
      }
      if (msg !== "") {
        alert(msg);
      }
    }
  });
};
//------------------------------------------------------------------------------


//funcion para iniciar sesion con datos en redis --------------------------------
const inicio_sesion = () => {
  // tomando valores ingresados por usuario
  const username = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  
  //socket para conectarse a microservicio de registro
  let ws = new WebSocket("ws://localhost:5000");
  const storage = window.localStorage;//almacenar par de claves

  const data = {//lista con valores a logear
    r: "verificar_user",
    d: [username, pass],
  };

  ////enviamos los datos en modo texto
  ws.onopen = () => {//manejador websocket cambia de estado a abierto
    ws.send(JSON.stringify(data));
  };

  //evento que espera respuesta del socket a causa de la consulta
  ws.addEventListener("message", function (event) {
    let rpta = null;
    rpta = JSON.parse(JSON.stringify(JSON.parse(event.data)));
    let ans = rpta;
    if (ans.e === false) {
      storage.setItem("usuario", JSON.stringify(ans.d[1]));
      storage.setItem("estadoSesion", ans.d[2]);
      window.location = "../logued/Home.pug";
    } else {
      let msg = "";
      switch (parseInt(ans.d[1], 10)) {
        case 3:
          msg = "Datos Incompletos";
          break;
        case 2:
          msg = "Datos Incorrectos";
          break;
        case 8:
          msg = "Clave errada";
          break;
      }
      if (msg !== "") {
        alert(msg);
      }
    }
  });
};



//------------------------------------------------------------------------------
