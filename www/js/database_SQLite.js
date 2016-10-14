// JavaScript Document

/* 
* variables de la aplicación
*/
	var existe_db
	var db
	


/* 
* carga inicial de la app
*/
function onBodyLoad() {    
	document.addEventListener("deviceready", onDeviceReady, false);
}

function onDeviceReady(){
	alert("prueba de base de datos");
	existe_db = window.localStorage.getItem("existe_db");
	db = window.openDatabase("Database", "1.0", "prueba db", 200000);
	if(existe_db == null){
		creaDB();
	}else{
		cargarDatos();
		$("#resultados").css("display","block");
		$("#caja_name").css("display","none");
		$("#caja_apellido").css("display","none");
		$("#bt_guardar").css("display","none");
	}
}

function creaDB(){
	alert("crearDB");
	db.transaction(crearNuebaBD, errorCB, successCB);	
}


function crearNuebaBD(tx){
	tx.executeSql('DROP TABLE IF EXISTS CAT_TERMINOS_CONDICIONES');
	tx.executeSql('CREATE TABLE IF NOT EXISTS CAT_TERMINOS_CONDICIONES (TER_ID_TERMINOS INTEGER(10) PRIMARY KEY AUTOINCREMENT, TER_DESCRIPCION NVARCHAR(5000), TER_ESTATUS INTEGER(1))');
	tx.executeSql('DROP TABLE IF EXISTS CAT_PROTECCION_DATOS');
	tx.executeSql('CREATE TABLE IF NOT EXISTS CAT_PROTECCION_DATOS (PRT_ID_DATOS INTEGER(10) PRIMARY KEY AUTOINCREMENT, PRT_DESCRIPCION NVARCHAR(5000), PRT_ESTATUS INTEGER(1))');
	tx.executeSql('DROP TABLE IF EXISTS CAT_ERRORES');
	tx.executeSql('CREATE TABLE IF NOT EXISTS CAT_ERRORES (ERR_ID_ERROR INTEGER(10) PRIMARY KEY AUTOINCREMENT, ERR_DESCRIPCION VARCHAR(250), ERR_ESTATUS INTEGER(1))');
	tx.executeSql('DROP TABLE IF EXISTS CAT_SERVICIOS');
	tx.executeSql('CREATE TABLE IF NOT EXISTS CAT_SERVICIOS (SRV_ID_SERVICIO INTEGER(10) PRIMARY KEY AUTOINCREMENT, SRV_ID_PADRE INTEGER(10), SRV_DESCRIPCION VARCHAR(250),	SRV_FECHA_ALTA DATE, SRV_FECHA_MODIF DATE, SRV_USU_ALTA INTEGER(10), SRV_USU_MODIF INTEGER (10), SRV_ESTATUS INTEGER(1)');
	tx.executeSql('DROP TABLE IF EXISTS OP_PERSONAS');
	tx.executeSql('CREATE TABLE IF NOT EXISTS OP_PERSONAS (PER_ID_PERSONA INTEGER(10) PRIMARY KEY AUTOINCREMENT, PER_NOMBRE VARCHAR(30), PER_AP_PATERNO VARCHAR(30) ,PER_AP_MATERNO VARCHAR(30),  PER_NUM_TEL INTEGER(10) , PER_CORREO VARCHAR(20) ,PER_CONTRASENIA VARCHAR(6) ,PER_ESTATUS_SESION INTEGER(1) ,PER_FECH_ULT_SESION DATE, PER_ID_TERMINOS INTEGER(10) , PER_ESTATUS_TERMINOS INTEGER(1) ,PER_ID_PROTEC_DATOS INTEGER(10) ,PER_ESTATUS_PROTEC_DATOS INTEGER(1) ,PER_COD_ACTIVACION VARCHAR(6),PER_ESTATUS_COD_ACTIVA INTEGER(1) , PER_FECHA_ALTA DATE , PER_FECHA_MODIF DATE, PER_USU_ALTA INTEGER(10) , PER_USU_MODIF INTEGER(10),PER_ESTATUS INTEGER(1) )');
	tx.executeSql('DROP TABLE IF EXISTS OP_REL_PER_CAT_SERV');
	tx.executeSql('CREATE TABLE IF NOT EXISTS OP_REL_PER_CAT_SERV (RPC_ID_PER_CAT_SERV INTEGER(10) PRIMARY KEY AUTOINCREMENT, RPC_FOLIO_REPORTE VARCHAR(10), RPC_ID_PERSONA INTEGER(10),RPC_ID_SERVICIO INTEGER(10), RPC_GPS VARCHAR(100), RPC_FECHA_ALTA DATE,  RPC_FECHA_MODIF DATE, RPC_USU_ALTA INTEGER(10), RPC_USU_MODIF INTEGER(10),RPC_ESTATUS INTEGER(1),)');
	tx.executeSql('DROP TABLE IF EXISTS OP_ARCHIVOS');
	tx.executeSql('CREATE TABLE IF NOT EXISTS OP_ARCHIVOS (ARC_ID_ARCHIVO INTEGER(10) PRIMARY KEY AUTOINCREMENT, ARC_NOMBRE VARCHAR(30), ARC_TAMANIO INTEGER(10), 			   ARC_TIPO_DOCTO VARCHAR(20), ARC_ID_PER_CAT_SERV INTEGER(10), ARC_FECHA_ALTA DATE, ARC_FECHA_MODIF DATE, ARC_USU_ALTA INTEGER(10), ARC_USU_MODIF INTEGER(10),ARC_ESTATUS INTEGER(1))');
	tx.executeSql('DROP TABLE IF EXISTS OP_REPORTES');
	tx.executeSql('CREATE TABLE IF NOT EXISTS OP_REPORTES (RPT_ID_REPORTE INTEGER(10) PRIMARY KEY AUTOINCREMENT, RPT_NOMBRE VARCHAR(100), RPT_DESCRIPCION VARCHAR(250),RPT_TIPO_DOCTO VARCHAR(20), RPT_TAMANIO INTEGER(10), RPT_ID_PER_CAT_SERV INTEGER(10), RPT_FECHA_ALTA DATE, RPT_FECHA_MODIF DATE, RPT_USU_ALTA INTEGER(10),RPT_USU_MODIF INTEGER(10), RPT_ESTATUS INTEGER(1))');
}

function errorCB(tx, err){
	alert("Error procesando SQL: " +err);	
}

function successCB(){
	alert("bien!");
	window.localStorage.setItem("existe_db",1);
}

function n(){
	alert("cargar Datos");
	db.transaction(getBD,errorCB);	
}

function getBD(tx){
	alert("haciendo la consulta");
	tx.executeSql('SELECT * FROM DEMO', [], querySuccess, errorCB);	
}

function querySuccess(tx, results){
	var len = results.rows.length;
	if(len == 0){
		alert("No se encontrarón registros");
	}
	
	alert("tabla Demo: " + len + " fila encontradas.");
	for (var i = 0; i < len; i++){
		alert("fila = " + i + " ID= " + results.rows.item(i).id + " nombre = " + results.rows.item(i).nombre + " apellido= " + results.rows.item(i).apellido);
	}
	
	var nombre = results.rows.item(0).nombre;
	var apellido = results.rows.item(0).apellido;
	$('#result1').html(nombre);
	$('#result2').html(apellido);
		
}

function guardar(){
	alert("guardar datos");
	db.transaction(guardarEnDB, errorCB);
}

function guardarEnDB(tx){
	alert("insert");	
	var terminos = 'ND Negocios digitales con domicilio en Insurgentes Sur 1524, Po-04 Piso 10, Col. Crédito Constructor, Delegación Benito Juárez, México D.F., C.P.03901, en cumplimiento por lo dispuesto a la Ley federal de datos personales en posesión de los particulares, hace de su conocimiento el presente aviso de privacidad:'+
			'Los datos personales proporcionados directa o indirectamente por el ciudadano, no serán trasferibles a terceros.'+
			'El ciudadano tendrá derecho de modificar todos y cada uno de sus datos.'+
			'En caso de modificar el presente aviso de privacidad se dará a conocer a los ciudadanos.'+
			'“Términos y condiciones en dispositivos móviles”'+
			'El uso del servicio de “Atención ciudadana”, en dispositivos móviles como Android e iOS, es parte del proyecto que desarrolla ND Negocios Digitales con el objetivo de poner a la disposición de la ciudadanía una herramienta tecnológica para realizar la denuncia de servicios públicos, facilitando de igual manera solicitar auxilio a las autoridades locales, en caso de una emergencia. '+
			'Aceptar términos y condiciones: '+
			'Para comenzar a utilizar la aplicación es necesario que como ciudadano lea cuidadosamente los términos y condiciones de uso. '+
			'La aplicación “Atención ciudadana”, puede descargarse desde cualquier equipo Android e iOS.'+
			'Descargando el aplicativo móvil, se deberá ejecutar la aplicación, la descarga y registro de la aplicación implica que el ciudadano confirma que ha leído, entendido y aceptado los términos y condiciones de uso presentes.'+
			'El uso de la aplicación solo podrá realizarse si está de acuerdo con los términos y condiciones de uso que se consigan  en este documento. '+
			'SI EL CIUDADANO NO ESTÁ DE ACUERDO EN LOS TÉRMINOS Y CONDICIONES QUE SE ESTABLECEN EN ESTÉ APARTADO, NO PODRÁ HACER USO DE LA APLICACIÓN. '+
			'Geolocalización'+
			'Para proporcionar el servicio de “Atención ciudadana”, a través de la aplicación, ND Negocios Digitales, deberá hacer uso de la información basada en la localización del dispositivo móvil, mediante la tecnología de GPS (Sistema de posicionamiento global), en los lugares que o ubicaciones que '+
			'se encuentre disponible dicha tecnología, por lo que es necesario utilizar, recabar, tratar, almacenar y transmitir los datos geográficos del dispositivo móvil e incluyendo de manera enunciativa más no limitativa, '+
			'la información personal como su nombre, apellido paterno, apellido materno, correo electrónico, número de teléfono del dispositivo, por lo que el ciudadano acepta y otorga su consentimiento para que ND Negocios Digitales lleve a cabo dichas actividades  '+
			'para prestar el servicio de la aplicación. '+
			'Es necesario que para el uso del servicio de la aplicación de “Atención ciudadana”, se permita el compartir la ubicación con su número de teléfono a los servicios públicos, con esto el ciudadano autoriza trasmitir dicha información. '+
			'Uso de la aplicación'+
			'El ciudadano no podrá hacer uso de aplicación para ningún fin que conlleve a inhabilitar, dañar, sobre cargar o afectar la aplicación. '+
			'El ciudadano no podrá acceder o tratar de acceder a las cuentas, sistemas o redes informáticas, conectadas a las mismas, por ningún medio, ni extraer contraseñas u otros medios informáticos. '+
			'El ciudadano no podrá utilizar la aplicación para fines de difamación, abuso, acoso, acecho, amenaza o violación de los derechos de otras personas. '+
			'Confidencialidad '+
			'El ciudadano está de acuerdo en mantener la información derivada de esta aplicación, como confidencial y a utilizarla únicamente para el propósito para la cual fue diseñada y creada. ';
	
	var datos = 'Los datos personales recabados serán protegidos, incorporados y tratados en el Sistema de Datos Personales “Atención ciudadana”, '+
				'el cual tiene su fundamento en los artículos 6, fracción II y 16, segundo párrafo, de la Constitución Política de los Estados Unidos Mexicanos; '+
				'17, fracción I, del Estatuto de Gobierno del Distrito Federal; 130 de la Ley General del Sistema Nacional de Seguridad Pública; 8 y 36, '+
				'de la Ley Orgánica de la Administración Pública del Distrito Federal; 1, 2, párrafos tercero y cuarto, décimo y décimo primero, 4, 5, 6, 7, 8, 9, 13, 14,15, 21 y 22, '+
				'de la Ley de Protección de Datos Personales para el Distrito Federal; 4, fracciones II, V, VII, XV, XVIII, 8, 10 y 12, fracciones V y VI, 36, 38, fracciones I y IV, '+
				'de la Ley de Transparencia y Acceso a la Información Pública del Distrito Federal; 1, 3, fracción IX, 30, Fracciones VI y VII, 31, 32, 33, 34, 35, fracción VIII, 37,38 y 40, '+
				'de la Ley de Archivos del Distrito Federal; numerales primero, segundo, fracción X y cuarto, fracción XV, del Decreto por el que se crea '+
				'el Centro de Atención a Emergencias y Protección Ciudadana de la Ciudad de México; 12, fracción VIII, del Reglamento del Secretariado Ejecutivo '+
				'del Sistema Nacional de Seguridad Pública; artículos 10, 11, 25 y 30, 31 y 32, del Reglamento de la Ley de Transparencia y Acceso a la Información Pública '+
				'de la Administración Pública del Distrito Federal; así como numerales 5, 10 y 11, de los Lineamientos para la Protección de Datos Personales en el Distrito Federal; '+
				'cuya finalidad es gestionar de manera eficiente la canalización de la emergencia ante la autoridad competente para su debida atención, a través del Servicio de “Atención ciudadana”; '+
				'los cuales podrán ser transmitidos a la Comisión de Derechos Humanos, para la investigación de quejas y denuncias por presuntas violaciones a los derechos humanos; '+
				'Instituto de Acceso a la Información Pública y Protección de Datos Personales del Distrito Federal, para la sustanciación de recursos de revisión y revocación, '+
				'denuncias y el procedimiento para determinar el probable incumplimiento a la Ley de Protección de Datos Personales para el Distrito Federal; '+
				'Contaduría Mayor de Hacienda de la Asamblea Legislativa del Distrito Federal, para el ejercicio de sus funciones de fiscalización; Órganos de Control, '+
				'para la realización de auditorías o desarrollo de investigaciones por presuntas faltas administrativas; Órganos Jurisdiccionales para la sustanciación '+
				'de los procesos tramitados ante ellos; Secretaría de Protección Civil; Secretaría de Seguridad Pública; Secretaría de Obras y Servicios; Secretaría de Salud; '+
				'Heroico Cuerpo de Bomberos; Procuraduría General de Justicia; Sistema de Aguas de la Ciudad de México; Red de Transportes de Pasajeros, Sistema de Transportes Eléctricos, '+
				'Metrobús y Sistema de Transporte Colectivo, todos del Distrito Federal; para la atención de emergencias en el ámbito de sus respectivas atribuciones;  '+
				'además de otras transmisiones previstas en la Ley de Protección de Datos Personales. '+
				'Los datos marcados con un asterisco (*) son obligatorios y sin ellos no podrá acceder al servicio o completar el trámite de atención ciudadana e involucrados con la emergencia.'+
				'Asimismo, se le informa que sus datos no podrán ser difundidos sin su consentimiento expreso, salvo las excepciones previstas en la Ley.';
	var fecha = new Date();
	

	tx.executeSql('INSERT INTO cat_terminos_condiciones (TER_DESCRIPCION,  TER_ESTATUS) VALUES ('+terminos+','+1+')');
	tx.executeSql('INSERT INTO cat_proteccion_datos (PRT_DESCRIPCION, PRT_ESTATUS) VALUES ('+datos+','+1+')');
	tx.executeSql('INSERT INTO cat_roles (ROL_DESCRIPCION, ROL_ESTATUS) VALUES ( 'Administrador',1)');
	tx.executeSql('INSERT INTO cat_estatus (EST_DESCRIPCION, EST_ESTATUS) VALUES ( 'Registrado',1)');	
	tx.executeSql('INSERT INTO cat_estatus (EST_DESCRIPCION, EST_ESTATUS) VALUES ( 'En proceso',1)');	
	tx.executeSql('INSERT INTO cat_estatus (EST_DESCRIPCION, EST_ESTATUS) VALUES ( 'Atendido',1)');	
	tx.executeSql('INSERT INTO cat_estatus (EST_DESCRIPCION, EST_ESTATUS) VALUES ( 'Sin iniciar',1)');	
	tx.executeSql('INSERT INTO cat_zonas (CZN_DESCRIPCION, CZN_ESTATUS) VALUES ( 'Ecatepec',1)');	
	
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 'Alumbrado','+fecha+',1,1)');
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 'Aguas y alcantarillado','+fecha+',1,1)');	
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 'Obras públicas','+fecha+',1,1)');
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 'Servicios públicos','+fecha+',1,1)');	
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 1,'Falla en luminarias','+fecha+',1,1)');	
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 1,'Luminarias faltantes','+fecha+',1,1)');	
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 1,'Daños a materiales de luminarias','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 2,'Fuga de agua','+fecha+',1,1)');	
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 2,'Suministro de agua (pipa)','+fecha+',1,1)');	
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 2,'Robo de coladera','+fecha+',1,1)');				
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 2,'Mantenimiento de coladera','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 2,'Desazolve','+fecha+',1,1)');	
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Colocación de banquetas','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Mantenimiento de banquetas','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Pintura de guarniciones','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Pintura de señalamientos','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Colocación de tope','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Demolición de tope','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Bacheo','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Re encarpetado','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Mantenimiento de puentes y estructuras','+fecha+',1,1)');									
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Semáforo dañado','+fecha+',1,1)');		
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 3,'Semáforo descompuesto','+fecha+',1,1)');					
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 4,'Poda de árbol','+fecha+',1,1)');					
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 4,'Limpieza de calle o avenida','+fecha+',1,1)');					
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 4,'Mantenimiento de parques','+fecha+',1,1)');					
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 4,'Mantenimiento de jardines','+fecha+',1,1)');					
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 4,'Recolección de basura','+fecha+',1,1)');					
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 4,'Recolección de animales muertos en vía pública','+fecha+',1,1)');					
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 4,'Recolección de muebles o autos abandonados en vía pública','+fecha+',1,1)');					
	tx.executeSql('INSERT INTO cat_servicios (SRV_DESCRIPCION, SRV_ID_PADRE, SRV_FECHA_ALTA,SRV_USU_ALTA,SRV_ESTATUS) VALUES ( 4,'Otro','+fecha+',1,1)');					
	

}

function newFormSuccess(tx, results){
	
	
		alert("los datos fuerón guardados con exito");
		$("#resultados").css("display","block");
		$("#caja_name").css("display","none");
		$("#caja_apellido").css("display","none");
		$("#bt_guardar").css("display","none");
		
		cargarDatos();
		
}