function mostrar()
{
	var ambulancia = document.getElementById('ambulancia');
	var policia = document.getElementById('policia');
	var bomberos = document.getElementById('bomberos');
	if(document.getElementById('ambulancia').style.display == 'block')
	{
		$("#policia").removeClass("policia");
		$("#bomberos").removeClass("bomberos");
		$("#policia").addClass("policiaR");
		$("#bomberos").addClass("bomberosR");
		
		policia.addEventListener("animationend",ocultar,false);
	}
	else
	{
		policia.removeEventListener("animationend",ocultar,false);
		$("#policia").removeClass("policiaR");
		$("#bomberos").removeClass("bomberosR");
		ambulancia.style.display = 'block';
		policia.style.display = 'block';
		bomberos.style.display = 'block';
		$("#ambulancia").addClass("ambulancia");
		$("#policia").addClass("policia");
		$("#bomberos").addClass("bomberos");
	}
}

function ocultar(e)
{
    var ambulancia = document.getElementById('ambulancia');
	var policia = document.getElementById('policia');
	var bomberos = document.getElementById('bomberos');
	ambulancia.style.display = 'none';
	policia.style.display = 'none';
	bomberos.style.display = 'none';
}

function llamar(entidad)
{
	switch(entidad)
	{
		case 1: location.href='call:5540674021';
		break;
		case 2: location.href='call:5573461063';
		break;
		case 3: location.href='call:';
		break;
	}
    mostrarBtnTerminarEmergencia();
	location.href = '#paginaMapa';
}

function muestraMenu()
{
   var menu = null; 
   menu = document.getElementsByName('desplegable');
    console.log("length = " + menu.length);
    console.log(menu);
    for(var i = 0; menu.length > i; i++)
    {
        console.log("i = " + i);
        console.log("menu");
        console.log(menu[i]);
        if(menu[i].style.display == 'block')
        {
            $(menu[i]).removeClass("desplegable");
            menu[i].style.display = 'none';
            $(menu[i]).addClass("desplegableR");
        }
        else
        {
            $(menu[i]).removeClass("desplegableR");
            menu[i].style.display = 'block';
            $(menu[i]).addClass("desplegable");
        }
    }
}

function ocultarMenu(e)
{
    var menu = document.getElementById('desplegable');
    menu.style.display = none;
}