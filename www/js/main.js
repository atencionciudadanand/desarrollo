var imageCameraClicked;

function validaLogin(){
    var flEmail = $("#text-CorreoLogin").val();
    var flPass = $("#text-PassLogin").val();
    if(validaAcceso()){
        re= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
		if(!re.exec($.trim(flEmail)) || $.trim(flPass).length < 6){
         //alert("Error: Favor de validar sus datos");
        mostrarMensaje("login", "", "Error", "Favor de validar sus datos", 1, 0);
        }else{
            jQuery.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "http://189.210.245.211:7080/WSAtnCiu/getUserByNameAndPass/" + flEmail + "/" + flPass,
                dataType: "json",
                success: function (data, jqXHR, status) {
                    if(data != null){
						if(data.estatus == 1000){

							//alert("Error: Contraseña incorrecta, favor de verificar datos");
							//window.location.href ="#login";
                            mostrarMensaje('login', 'login', 'Error', 'Contrase&ntilde;a incorrecta, favor de verificar datos', 1, 1);

						}else if(data.estatus == 1001){

							//alert("Error: No se obtuvo respuesta del servidor. Favor de intentar más tarde");
							//window.location.href ="#acceso";
                            mostrarMensaje('login', 'acceso', 'Error', 'No se obtuvo respuesta del servidor, favor de intentar m&aacute;s tarde', 1, 1);

						}else if(data.estatus == 1002){
                            //alert("Error: El Usuario no existe, favor de verificar datos");
							//window.location.href ="#login";
                            mostrarMensaje('login', 'login', 'Error', 'El Usuario no existe, favor de verificar datos', 1, 0);
                        }else{

							//alert("&Eacute;xito: Acceso correcto");

							sessionStorage.setItem("IdUsuario", data.usuarioId);
							//window.location.href ="#home";
                            mostrarMensaje('login', 'home', '&Eacute;xito', 'Acceso correcto', 1, 1);
						}
                    }
                },
                error: function (data, jqXHR, status) {
                    //alert("Error: No se obtuvo respuesta del servidor. Favor de intentar más tarde");
                    //window.location.href ="#acceso";
                    mostrarMensaje('login', 'acceso', 'Error', 'No se obtuvo respuesta del servidor, favor de intentar m&aacute;s tarde', 1, 1);

                },
                done: function (e) {
                    console.log("DONE");
                }
            });
        }
    }
}

function validaAcceso()
{
    var flEmail = $("#text-CorreoLogin").val().trim();
    var flPass = $("#text-PassLogin").val();
    if(flEmail == "" || flEmail == null)
    {

        //alert("El campo \"Correo electr&oacute;nico\" no puede estar vac&iacute;o");
         mostrarMensaje("login", "", "Error", "El campo \"Correo electr&oacute;nico\" no puede estar vac&iacute;o", 1, 0);

        return false;
    }else{
        for(var i = 0; flEmail.length > i; i++)
        {
            if(isSpacing(flEmail.charCodeAt(i))){

                //alert("No se permiten espacios en el campo \"Correo electr&oacute;nico\"");
                mostrarMensaje("login", "", "Error", "No se permiten espacios en el campo \"Correo electr&oacute;nico\"", 1, 0);

                return false;
            }
        }
    }
    if(flPass == "" || flPass == null){

        //alert("El campo \"Contraseña\" no puede estar vac&iacute;o");
        mostrarMensaje("login", "", "Error", "El campo \"Contrase&ntilde;a\" no puede estar vac&iacute;o", 1, 0);

        return false;
    }
    return true;
}

function guardaReg(){
    removeItemReg(1,0);
    var email = $("#text-CorreoReg").val();
    var clave = $("#text-PassReg").val();
    var claveConfirma = $("#text-CPassReg").val();
    var nombreUser = $("#text-Nombre").val();
    var aPaterno = $("#text-APaterno").val();
    var aMaterno = $("#text-AMaterno").val();
    var numCel = $("#text-Cel").val();
    if(validaRegistro()){
        re= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        if(!re.exec(email))    {

            //alert("Error: La direcci&oacute;n de correo " + email + " es incorrecta.");
            mostrarMensaje("registro", "", "Error", "La direcci&oacute;n de correo " + email + " es incorrecta.", 1, 0);

        }else{
            jQuery.ajax({
                type: "GET",
                contentType: "application/json; charset=utf-8",
                url: "http://189.210.245.211:7080/WSAtnCiu/getUserByEmail/" + email + "/",
                dataType: "json",
                success: function (data, jqXHR, status) {
                    if(data == false){
                        if (clave == claveConfirma){
                            if (clave.length == 6){
                                sessionStorage.setItem("Email", email);
                                sessionStorage.setItem("Clave", clave);
                                sessionStorage.setItem("Nombre", nombreUser);
                                sessionStorage.setItem("ApellidoP", aPaterno);
                                sessionStorage.setItem("ApellidoM", aMaterno);
                                sessionStorage.setItem("Cel", numCel);
                                window.location.href ="#terminos";
                            } else{

                                //alert("Error: La contraseña debe tener al menos 6 caracteres");
                                mostrarMensaje("registro", "", "Error", "La contrase&ntilde;a debe tener al menos 6 caracteres", 1, 0);

                            }
                        }else{
                            //alert("Error: La contraseñas no son iguales.");
                            mostrarMensaje("registro", "", "Error", "La contrase&ntilde;as no son iguales.", 1, 0);

                        }
                    }else{
                        /*alert("Error: El usuario ya se encuentra registrado");
                        window.location.href ="#registro";
                        window.location.reload();*/
                        mostrarMensaje("registro", "registro", "Error", "El usuario ya se encuentra registrado", 1, 1);
                    }
                },
                error: function (data, jqXHR, status) {
                    /*alert("Error: No se obtubo respuesta del servidor. Favor de intentar mas tarde");
                    window.location.href ="#acceso";*/
                    mostrarMensaje("registro", "acceso", "Error", "No se obtubo respuesta del servidor, favor de intentar m&aacute;s tarde", 1, 1);
                },
                done: function (e) {
                    console.log("DONE");
                }
            });
        }
    }
}

function validaRegistro()
{
    var email = $("#text-CorreoReg").val().trim();
    var clave = $("#text-PassReg").val().trim();
    var claveConfirma = $("#text-CPassReg").val().trim();
    var nombre = $("#text-Nombre").val().trim();
    var aPaterno = $("#text-APaterno").val().trim();
    var aMaterno = $("#text-AMaterno").val().trim();
    var numCel = $("#text-Cel").val().trim();
    for(var i = 0; nombre.length > i; i++)
        {
            console.log(nombre.charCodeAt(i));
            
        }
    //valida que el campo nombre no este vac\u00edo, ni contenga signos de puntuacion, y que no contenga numeros
    if(nombre == "" || nombre == null)
    {

        //alert("El campo \"Nombre\" no puede estar vacío");
        mostrarMensaje("registro", "", "Error", "El campo \"Nombre\" no puede estar vac&iacute;o", 1, 0);

        return false;
    }else{
        for(var i = 0; nombre.length > i; i++)
        {
            if(!justCharacter(nombre.charCodeAt(i),1))
            {
                //alert("Solo se permiten letras en el campo \"Nombre\"");
                mostrarMensaje("registro", "", "Error", "Solo se permiten letras en el campo \"Nombre\"", 1, 0);
                return false;
            }
        }
    }
    //valida que el campo apellido parterno no contenga numeros, ni signos de puntuacion, ni espacios
    if(aPaterno == "" || aPaterno == null)
    {

        //alert("El campo \"Apellido paterno\" no puede estar vacío");
        mostrarMensaje("registro", "", "Error", "El campo \"Apellido paterno\" no puede estar vac&iacute;o", 1, 0);

        return false;
    }else{
        for(var i = 0; aPaterno.length > i; i++)
        {
            if(!justCharacter(aPaterno.charCodeAt(i),0))
            {
                //alert("Solo se permiten letras y sin espacios en el campo \"Apellido paterno\"");
                mostrarMensaje("registro", "", "Error", "Solo se permiten letras y sin espacios en el campo \"Apellido paterno\"", 1, 0);
                return false;
            }
        }
    }
    //valida que el campo apellido marterno no contenga numeros, ni signos de puntuacion, ni espacios
    if(aMaterno == "" || aMaterno == null)
    {
        //alert("El campo \"Apellido materno\" no puede estar vacío");
        mostrarMensaje("registro", "", "Error", "El campo \"Apellido materno\" no puede estar vac&iacute;o", 1, 0);
        return false;
    }else{
        for(var i = 0; aMaterno.length > i; i++)
        {
            if(!justCharacter(aMaterno.charCodeAt(i),0))
            {
                //alert("Solo se permiten letras y sin espacios en el campo \"Apellido materno\"");
                mostrarMensaje("registro", "", "Error", "Solo se permiten letras y sin espacios en el campo \"Apellido materno\"", 1, 0);
                return false;
            }
        }
    }
    //valida que el campo correo electronico no contenga, espacios
    if(email == "" || email == null)
    {
        //alert("El campo \"Apellido materno\" no puede estar vacío");
        mostrarMensaje("registro", "", "Error", "El campo \"Apellido materno\" no puede estar vac&iacute;o", 1, 0);

        return false;
    }else{
        for(var i = 0; email.length > i; i++)
        {
            if(isSpacing(email.charCodeAt(i)))
            {
                //alert("No se permiten espacios en el campo \"Correo electrónico\"");
                mostrarMensaje("registro", "", "Error", "No se permiten espacios en el campo \"Correo electr&oacute;nico\"", 1, 0);

                return false;
            }
        }
    }
    //valida que los campo de contrase\u00f1a no sean vac\u00edos y que coincidan
    if(clave == "" || clave == null)
    {

        //alert("El campo \"Contraseña\" no puede estar vacío");
        mostrarMensaje("registro", "", "Error", "El campo \"Contrase&ntilde;a\" no puede estar vac&iacute;o", 1, 0);

        return false;
    }else{
        if(clave.length < 6){

            //alert("El campo \"Contraseña\" debe ser de 6 caracteres");
            mostrarMensaje("registro", "", "Error", "El campo \"Contrase&ntilde;a\" debe ser de 6 caracteres", 1, 0);

            return false;
        }
        if(claveConfirma == "" || claveConfirma == null){

            //alert("Confirme su contraseña");
            mostrarMensaje("registro", "", "Error", "Confirme su contrase&ntilde;a", 1, 0);
            return false;
        }
        if(clave != claveConfirma){

            //alert("Las contraseñas no coinciden, favor de verificar");
            mostrarMensaje("registro", "", "Error", "Las contrase&ntilde;as no coinciden, favor de verificar", 1, 0);

            return false;
        }
    }
    //valida que el campo Celular no sea vac\u00edo y que contenga los 10 digitos
    if(numCel == "" || numCel == null)
    {

        //alert("El campo \"Celular\" no puede estar vacío");
        mostrarMensaje("registro", "", "Error", "El campo \"Celular\" no puede estar vac&iacute;o", 1, 0);

        return false;
    }else{
        if(numCel.length < 10){

            //alert("Introduzca los diez dígitos del campo \"Celular\"");
            mostrarMensaje("registro", "", "Error", "Introduzca los diez d&iacute;gitos del campo \"Celular\"", 1, 0);

            return false;
        }
    }
    return true;
}

function guardaTerm(){
    var aceptaTer = 1;
    sessionStorage.setItem("Terminos", aceptaTer);
    console.log("Terminos: ", sessionStorage.getItem("Terminos"));
    console.log("Email: ", sessionStorage.getItem("Email"));
    window.location.href ="#privacidad";
}
function guardaPriv(){
    var email2 = sessionStorage.getItem("Email");
    var clave2 = sessionStorage.getItem("Clave");
    var nombre2 = sessionStorage.getItem("Nombre");
    var aPaterno2 = sessionStorage.getItem("ApellidoP");
    var aMaterno2 = sessionStorage.getItem("ApellidoM");
    var numCel2 = sessionStorage.getItem("Cel");
    var fecha = new Date();
    var fechaAlt = padStr(fecha.getFullYear()) + "-" +
                  padStr(1 + fecha.getMonth()) + "-" +
                  padStr(fecha.getDate());
    console.log("fechaAlt: ", fechaAlt);

    var contact = '{'+
        '"rolId":1,'+
        '"nombre":"'+nombre2+'",'+
        '"apPaterno":"'+aPaterno2+'",'+
        '"apMaterno":"'+aMaterno2+'",'+
        '"telefono":'+numCel2+','+
        '"email":"'+email2+'",'+
        '"estatusSesion":'+0+','+
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
        contentType: "application/json; charset=utf-8",
        url: "http://189.210.245.211:7080/WSAtnCiu/addUsuario",
        data: contact.toString(),
        dataType: "json",
        success: function (data, status, jqXHR) {

            //alert("&Eacute;xito: Registro Exitoso");
            mostrarMensaje("privacidad", "login", "&Eacute;xito", "Registro exitoso", 1, 0);
            //window.location.href ="#login";

        },
        error: function (data, jqXHR, status) {
            window.location.href ="#login";
        },
        done: function (e) {
            console.log("DONE");
        }
    });

    //timeout: 100000,
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}

function exitTermAcces(){
    removeItemReg(1,1);
    window.location.href ="#acceso";
}

function exitAviso(){
    window.location.href ="#home";
    window.location.reload();
}

function exitReportes(obj){
    removeItemReg(1,1);
    window.location.href ="#home";
    window.location.reload();
}

function removeItemReg(idRegistro,idCReportes){
    if(idRegistro == 1){
        sessionStorage.removeItem("Email");
        sessionStorage.removeItem("Clave");
        sessionStorage.removeItem("Nombre");
        sessionStorage.removeItem("ApellidoP");
        sessionStorage.removeItem("ApellidoM");
        sessionStorage.removeItem("Cel");
    }
    if(idCReportes ==   1){
        sessionStorage.removeItem("data");
    }
}

function addClassImagePhoto(e){
    imageCameraClicked=e;
}

function logOut(){
    removeItemReg(1,1);
    window.location.href ="#acceso";
    window.location.reload();
}

/*
                var folio = data[0].rpcFolioReporte;
                var StatusReporte = data[0].rpcIdEstatusServ;
*/

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
function mostrarBtnTerminarEmergencia()
{
    //alert("entro al js");
    document.getElementById('terminarEmergencia').style.display = "inline";
}

function refrescarHome()
{
    location.href = "#home";
    location.reload();
}

function mostrarMensaje(idPagina, redireccionar, titulo, cuerpoMensaje, numButom, esReload){
    var div = document.createElement("div");
    var pagina = document.getElementById(idPagina).appendChild(div);
    div.setAttribute("id", "mensaje");
    div.setAttribute("class", "modal");
    var mensaje = $("#mensaje");
    var html = '<div id="popupDialog" class="ventana">' +
        '<div class="modalHead">' +
            '<p>' + titulo + '</p>' +
        '</div>' +
        '<div class="modalBody">' +
            '<p>' + cuerpoMensaje + '</p>';
    switch(numButom){
        case 1: html = html + 
            '<a href="javascript: redirectDestroy(' + "'" + redireccionar + "', " + esReload + ')" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b">Aceptar</a>' +
        '</div>' +
    '</div>';
        break;
        case 2: html = html + 
            '<a href="#' + redireccionar + '" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b">Aceptar</a>' +
            '<a href="#" class="ui-btn ui-corner-all ui-shadow ui-btn-inline ui-btn-b">Cancel</a>' +
        '</div>' +
    '</div>';
            break;
            
    }
    mensaje.append(html);
    
}

function redirectDestroy(redireccion, esReload){
    if(redireccion != ""){
        location.href = "#" + redireccion;
    }    
    esReload == 1 ? location.reload() : "";
    var mensaje = document.getElementById("mensaje");
    mensaje.parentNode.removeChild(mensaje);
}