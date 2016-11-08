function justNumbers(e)
{
   var keynum = window.event ? window.event.keyCode : e.which;
   if (keynum == 8)
        return true;
    return /\d/.test(String.fromCharCode(keynum));
}

function justCharacter(e,flag)
{
    var keychar = e;
    if((keychar == 8)
       || ((keychar == 32)&&(flag == 1))  
       || (keychar == 225)
       || (keychar == 250)
       || (keychar == 243)
       || (keychar == 241)
       || (keychar == 237)
       || (keychar == 233)
       || (keychar == 218)
       || (keychar == 211)
       || (keychar == 209)
       || (keychar == 205)
       || (keychar == 201)
       || (keychar == 193))
        return true;
    if(keychar == 164 || keychar == 165)
        return true;
    return /[A-Za-z]/.test(String.fromCharCode(keychar));
}

function isSpacing(e)
{
    var key = e;
    if(key == 32)
        return true;
}