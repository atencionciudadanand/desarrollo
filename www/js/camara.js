var app = {
 
    initialize: function() {
		this.bindEvents();
    },
         
    bindEvents: function() {
		var takePhoto = document.getElementById('takePhoto');
        takePhoto.addEventListener('click', app.takePhoto, false);
	},
 
    sendPhoto: function() {
		alert('Imagen enviada al servidor');
    },
 
    takePhoto: function(){
		navigator.camera.getPicture(app.onPhotoDataSuccess, app.onFail, { 
			quality: 20, 
			allowEdit: true,
			destinationType: navigator.camera.DestinationType.DATA_URL,
			saveToPhotoAlbum: true
		});
	},
 
    onPhotoDataSuccess: function(imageData) {
		$(imageCameraClicked).attr("src", imageData);
    },
 
    onFail: function(message) {
		alert('Failed because: ' + message);
	}
};