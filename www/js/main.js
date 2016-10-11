// JavaScript Document
$(document).ready(function(e) {
    $("#button_login").click(function(e) {
         var usuario = $("#text-CorreoLogin").val();
         var clave = $("#text-PassLogin").val();
         if(usuario != "" && clave != ""){
             re= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
             if(!re.exec(usuario)){
                 alert("Error: La dirección de correo " + email + " es incorrecta.");
             }else{
                  if(usuario == "fireluz@gmail.com" && clave == "12345678"){
                      window.location.href ="#principal";
                  }else{
                      alert("Error: El nombre de usuario o contraseña son incorrectos.");
                  }
             }
         }else{
             alert("Error: Los campos con * son obligatorios.");
         }
    });
});

function guardaReg(){
    removeItemReg();
    var email = $("#text-CorreoReg").val();
    var clave = $("#text-PassReg").val();
    var claveConfirma = $("#text-CPassReg").val();
    var nombreUser = $("#text-Nombre").val();
    var aPaterno = $("#text-APaterno").val();
    var aMaterno = $("#text-AMaterno").val();
    var numCel = $("#text-Cel").val();
    if(email != "" && clave != "" && claveConfirma != "" && nombreUser != "" && aPaterno != "" && aMaterno != "" && numCel != ""){
        re= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(!re.exec(email))    {
            alert("Error: La dirección de correo " + email + " es incorrecta.");
        }else{
            if (clave == claveConfirma){
                if (clave.length == 6){
                    sessionStorage.setItem("Email", email);
                    sessionStorage.setItem("Clave", clave);
                    sessionStorage.setItem("Nombre", nombreUser);
                    sessionStorage.setItem("ApellidoP", aPaterno);
                    sessionStorage.setItem("ApellidoM", aMaterno);
                    sessionStorage.setItem("Cel", numCel);
                    alert(sessionStorage.getItem("Email"));
                    window.location.href ="#terminos";
                } else{
                    alert("Error: La contraseña debe tener al menos 6 caracteres");
                }
            }else{
                alert("Error: La contraseñas no son iguales.");
            }
        }
    }else {
        alert("Error: Los campos con * son obligatorios.");
    }
}

function guardaTerm(){
    var aceptaTer = 1;
    sessionStorage.setItem("Terminos", aceptaTer);
    alert(sessionStorage.getItem("Email"));
    alert(sessionStorage.getItem("Terminos"));
    window.location.href ="#privacidad";
}
function guardaPriv(){
    var email2 = sessionStorage.getItem("Email");
    var clave2 = sessionStorage.getItem("Clave");
    var nombre2 = sessionStorage.getItem("Nombre");
    var aPaterno2 = sessionStorage.getItem("ApellidoP");
    var aMaterno2 = sessionStorage.getItem("ApellidoM");
    var numCel2 = sessionStorage.getItem("Cel");
    var f = new Date();
    var dd = f.getDate().toString;
    var mm = f.getMonth().toString;
    var yyy = f.getFullYear().toString;
    var fechaAlt = yyy + "-" + mm + "-" + dd;

    console.log("fechaAlt: ", fechaAlt);

    var contact = '{'+
        '"rolId":1,'+
        '"nombre":"'+nombre2+'",'+
        '"apPaterno":"'+aPaterno2+'",'+
        '"apMaterno":"'+aMaterno2+'",'+
        '"telefono":'+numCel2+','+
        '"email":"'+email2+'",'+
        '"estatusSesion":'+0+','+
        '"fechaUlSe":"1985-12-07",'+
        '"contrasenia":"'+clave2+'",'+
        '"fechaAlta":"'+fechaAlt+'",'+
        '"fechaModif":"'+fechaAlt+'",'+
        '"usuarioAlta":15,'+
        '"usuarioModif":14,'+
        '"estatus":'+1+''+
        '}';

    console.log("contact: ",contact)

    jQuery.ajax({
        type: "POST",
        url: "http://192.168.15.104:8080/WSAtnCiu/addUsuario",
        data: contact.toString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status, jqXHR) {
            alert("Exito: Registro Exitoso");
        },

        error: function (jqXHR, status) {
            alert("Error: Algo fallo.");
        }
    });

    //timeout: 100000,
}

function exitTermAcces(){
    removeItemReg();
    window.location.href ="#acceso";
}
function removeItemReg(){
    sessionStorage.removeItem("Email");
    sessionStorage.removeItem("Clave");
    sessionStorage.removeItem("Nombre");
    sessionStorage.removeItem("ApellidoP");
    sessionStorage.removeItem("ApellidoM");
    sessionStorage.removeItem("Cel");
}

/*function prueba(){
    a1=parseInt(document.getElementById('a').value);
    a2=parseInt(document.getElementById('b').value);
    var total=a1+a2;
    if(localStorage){
        localStorage.setItem("resultado",total);
        document.getElementById('c').value=localStorage.getItem("resultado")
    }else{
        alert("tu navegador no puede guardar nada XD");
    }
    //if(localStorage){
      //  alert(localStorage.getItem("resultado"));
    //}
}

function borrar(){
    alert(localStorage.getItem("resultado"));
    localStorage.removeItem("resultado");
    alert(localStorage.getItem("resultado"));
}*/

/*function addUsuario() {

	var txtNombre = $('#txtNombre').val();
	var txtApellPaterno = $('#txtApellPaterno').val();
	var txtApellMaterno = $('#txtApellMaterno').val();
	var txtEmail = $('#txtEmail').val();
	var rdSexo = $('input:radio[name=rdSexo]:checked').val();


	var contact = '{"nombre":"'+txtNombre+'","apPaterno":"'+txtApellPaterno+'","apMaterno":"'+txtApellMaterno+'","email":"'+txtEmail+'","sexo":"'+rdSexo+'"}';

    jQuery.ajax({
        type: "POST",
        url: "http://localhost:8080/WSAtnCiu/addUsuario",
        data: contact.toString(),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status, jqXHR) {
        	// rest
        },

        error: function (jqXHR, status) {
        	// rest
        }
    });
}*/