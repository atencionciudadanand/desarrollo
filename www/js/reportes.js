var arrayReports = [];
var idReport;

function showCheck(){
	$("#btnSeleccionar").hide();
	$("#btnEliminar").show();
	$("#btnRegresar").show();
	$(".hide").show();
}
function cargaReportes(){
	
	$("#btnEliminar").hide();
	$("#btnRegresar").hide();
	$("#btnSeleccionar").show();
	
    var js = '{"idUsuario": 2}';
    var idUser = sessionStorage.getItem("IdUsuario");
    jQuery.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
	    url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerByIdUser/" + idUser,
            data: js.toString(),
            dataType: "json",
            success: function (data, jqXHR, status) {
				if(data!= null){
					
					for(var i = 0; i<data.length; i++){
						if(data[i].rpcEstatus == 1000){
							/*alert("Error: No tiene Reportes Activos");
							window.location.href ="#home";*/
                            mostrarMensaje("reportes", "home", "Error", "No tiene reportes activos", 1, 1);
						}else if(data[i].rpcEstatus == 1001){
							/*alert("Error: Error Interno, favor de reportarlo con el administrador del sistema");
							window.location.href ="#home";*/
                            mostrarMensaje("reportes", "home", "Error", "Error interno, favor de reportarlo con el administrador del sistema", 1, 1);
						}else{
							removeItemReg(0,1);
							var flDatos = data;
							sessionStorage.setItem("Datos", flDatos);
							window.location.href ="#reportes";
							mostrarReportes(flDatos);
						}
					}
				}
            },
            error: function (data, jqXHR, status) {

                //alert("Error: No se obtuvo respuesta del servidor. Favor de intentar más tarde.");
                mostrarMensaje("reportes", "home", "Error", "No se obtuvo respuesta del servidor, favor de intentar m&aacute;s tarde.", 1, 1);

                console.log("data: " + data);
                //window.location.href ="#home";
            },
            done: function (e) {
                console.log("DONE");
            }
    });
}
function mostrarReportes(vlDatos){
    var flDatos = vlDatos;
    var tablaDatos= $("#tblDatos");

    var flFolio="";
    var flStatus="";
    var flServicio="";
    var flFalla="";
	var flIdReporte="";
	
	tablaDatos.empty();
	
    for(i=0; i<flDatos.length;i++){
        var regFila = flDatos[i];

        flFolio=regFila.rpcFolioReporte;
        flStatus=regFila.rpcIdEstatusServ.estDescripcion;
        flServicio=regFila.rpcIdServicio.padreId.descripcion;
        flFalla = regFila.rpcIdServicio.descripcion;
		flIdReporte = regFila.rpcIdusucatser;

        if(flStatus == "Registrado"){
            var color = "#DF0101"
        }
        if(flStatus == "Sin iniciar"){
            var color = "#DF0101"
        } 
        if(flStatus == "En proceso"){
            var color = "#DF7401"
        }
        if(flStatus == "Atendido"){
            var color = "#04B404"
        }
        tablaDatos.append("<tr><td style='display:none' class='hide'><input name='chReports' type='checkbox' value='"+flIdReporte+"'></td>" 
						+"<td> <table>"
						+ "<tr><td></td><td><strong>Reporte: </strong></td><td>"+flFolio+"</td></tr>"
                        + "<tr><td></td><td><strong>Servicio: </strong></td><td>"+flServicio+"</td> <td></td> <td style='color:"+color+"'><strong>"+flStatus+"</strong></td></tr>"
                        + "<tr><td></td><td><strong>Falla: </strong></td><td>"+flFalla+"</td></tr>"
						+"</table></td></tr>");
    }

}
function deleteReports(){	
	$.each($("input[name='chReports']:checked"), function(){
		idReport=($(this).val());

        var jsStatusId = 	'{'+
		'"rpcIdusucatser":'+idReport+
		'}';
					
		jQuery.ajax({
			type: "PUT",
			contentType: "application/json; charset=utf-8",
			url:"http://189.210.245.211:7080/WSAtnCiu/deleteReports/" + idReport,
			data: jsStatusId.toString(),
			dataType: "json",
			success: function (data, status, jqXHR) {

				//alert("Exito: Su reporte ha sido eliminado correctamente");
                mostrarMensaje("reportes", "", "&Eacute;xito", "Su reporte ha sido eliminado correctamente", 1, 1);

			},
			error: function (data, jqXHR, status) {

				console.log("Entro a la funci&oacute;n error pero si reliza los cambios");

				$("#btnEliminar").hide();
				$("#btnRegresar").hide();
				$("#btnSeleccionar").show();
				window.location.href ="#reportes";
				cargaReportes();
			}
		});
	});
}