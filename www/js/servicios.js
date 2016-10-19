var valueSelectService;

$(document).ready(function() {
   $("#btnGeo").hide();
   getServices();
});

function showBtnGeo(value){
	var option = value;
	if(option != 0){
		$("#btnGeo").show();
	}
}

function getServices(){
	$.ajax({
		url:"http://189.210.245.211:7080/WSAtnCiu/getServicios",
		type:"GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
        	for(var i = 0; i<data.length; i++){
        		$("#selServicios").append("<option value='" + data[i].servicioId + "'>" + data[i].descripcion + "</option>");
        	}
        },

        error: function () {
            alert("Error: No se cargaron los servicios correctamente.");
        }
	})
}

function getIdSelect(v){
	valueSelectService=v.value;
	getFails(valueSelectService);
}

function getFails(v) {
		$.ajax({
		url:"http://189.210.245.211:7080/WSAtnCiu/getFallas/" + v,
		type:"GET",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
			for(var i = 0; i<data.length; i++){
        		$("#selFallas").append("<option value='" + data[i].servicioId + "'>" + data[i].descripcion + "</option>");
        	}
        },

        error: function () {
			console.dialog("Error: No se cargaron las fallas correctamente.");
        }
	})
}

function sendReport(){
	
    var idServicio = $( "#selFallas option:selected" ).val();
    var GPS = sessionStorage.getItem("latlng");
    var idEstatusServicio;
    var idZona;
	var fecha = new Date();
    var fechaAlt = padStr(fecha.getFullYear()) + "-" +
                  padStr(1 + fecha.getMonth()) + "-" +
                  padStr(fecha.getDate());
	var descripcion = $$( "#textArea" ).val();

    var contact = 	'{'+
					'"rpcFolioReporte":"FOL001",'+
					'"rpcIdUsuario":15,'+
					'"rpcIdServicio":{'+'"servicioId":'+idServicio+'},'+
					'"rpcGps":"'+GPS+'",'+
					'"rpcIdEstatusServ":{'+'"estIdEstatus":'+1+'},'+
					'"rpcIdZona":1,'+
					'"rpcFechaAlta":"'+ fechaAlt +'",'+
					'"rpcUsuAlta":1,'+
					'"rpcEstatus":1,'+
					'"rpcDescripcion":'+descripcion+
					'}';
					
	jQuery.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "http://189.210.245.211:7080/WSAtnCiu/getRelPerSerAlert",
        data: contact.toString(),
        dataType: "json",
        success: function (data, status, jqXHR) {
            alert("Exito: Su reporte se a enviado correctamente");
            window.location.href ="#home";
        },
        error: function (data, jqXHR, status) {
			alert("Error: intente de nuevo mas tarde");
            window.location.href ="#servicios";
        },
        done: function (e) {
            console.log("DONE");
        }
    });
}