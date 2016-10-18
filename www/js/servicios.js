var valueSelectService;

$(document).ready(function() {
   $("#selFallas").hide();
   getServices();
});


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

    $("#selFallas").show();
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