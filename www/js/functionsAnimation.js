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
	ambulancia.style.display = 'none';
	policia.style.display = 'none';
	bomberos.style.display = 'none';
}

function llamar(entidad)
{
	switch(entidad)
	{
		case 1: location.href='tel:5540674021';
		break;
		case 2: location.href='tel:5573461063';
		break;
		case 3: location.href='tel:';
		break;
	}
	location.href = '#paginaMapa';
}