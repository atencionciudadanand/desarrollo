var app = {
 
    initialize: function() {
		this.bindEvents();
    },
         
    bindEvents: function() {
		var takePhoto = document.getElementById('takePhoto');
        takePhoto.addEventListener('click', app.takePhoto, false);
        var sendPhoto = document.getElementById('sendPhoto');
        sendPhoto.addEventListener('click', app.sendPhoto, false);		
	},
 
    sendPhoto: function() {
		alert('Reporte Enviado... ');
    },
 
    takePhoto: function(){
		navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { 
			quality: 20, 
			allowEdit: true,
			destinationType: navigator.camera.DestinationType.DATA_URL,
			encodingType: navigator.camera.EncodingType.JPEG,
			saveToPhotoAlbum:true
		});
	},
 
    onPhotoDataSuccess: function(imageData) {
		//$(imageCameraClicked).attr("src", imageData);
		var photo;
		if(imageCameraClicked == 1){
			photo = document.getElementById('fotoEdit_img1');
			photo.src = "data:image/jpeg;base64," + imageData;
		}else if (imageCameraClicked == 2){
			photo = document.getElementById('fotoEdit_img2');
			photo.src = "data:image/jpeg;base64," + imageData;
		}else if(imageCameraClicked == 3){
			photo = document.getElementById('fotoEdit_img3');
			photo.src = "data:image/jpeg;base64," + imageData;
		}else if(imageCameraClicked == 4){
			photo = document.getElementById('fotoEdit_img4');
			photo.src = "data:image/jpeg;base64," + imageData;
		}
    },
 
    onFail: function(message) {
		alert('Failed because: ' + message);
	}
};