var app = {
 
    initialize: function() {
		this.bindEvents();
    },
         
    bindEvents: function() {
		var takePhoto = document.getElementById('takePhoto');
        takePhoto.addEventListener('click', app.takePhoto, false);
	},
 
    sendPhoto: function() {
		//alert('Reporte Enviado... ');
        mostrarMensaje("servicios", "", "&Eacute;xito", "Reporte enviado...", 1, 0);
    },
 
    takePhoto: function(){
		navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { 
			quality: 20, 
			destinationType: navigator.camera.DestinationType.DATA_URL,
			encodingType: navigator.camera.EncodingType.JPEG,
			saveToPhotoAlbum:true
		});
	},
 
    onPhotoDataSuccess: function(imageData) {
		var photo;
		if(imageCameraClicked == 1){
			photo = document.getElementById('fotoEdit_img1');
			photo.src = "data:image/jpeg;base64," + imageData;

			photoEnv = document.getElementById('fotoEdit_img1Env');
            photoEnv.src = "data:image/jpeg;base64," + imageData;
		}else if (imageCameraClicked == 2){
			photo = document.getElementById('fotoEdit_img2');
			photo.src = "data:image/jpeg;base64," + imageData;

			photoEnv = document.getElementById('fotoEdit_img2Env');
            photoEnv.src = "data:image/jpeg;base64," + imageData;
		}else if(imageCameraClicked == 3){
			photo = document.getElementById('fotoEdit_img3');
			photo.src = "data:image/jpeg;base64," + imageData;

			photoEnv = document.getElementById('fotoEdit_img3Env');
            photoEnv.src = "data:image/jpeg;base64," + imageData;
		}else if(imageCameraClicked == 4){
			photo = document.getElementById('fotoEdit_img4');
			photo.src = "data:image/jpeg;base64," + imageData;

			photoEnv = document.getElementById('fotoEdit_img4Env');
            photoEnv.src = "data:image/jpeg;base64," + imageData;
		}
    },
 
    onFail: function(message) {
		//alert('Failed because: ' + message);
        mostrarMensaje("servicios", "", "Error", "Failed because: " + message, 1, 0);
	}
};