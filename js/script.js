$(function ()
{
  var tabla="";
  var dimension=11;
  var numCir=dimension*dimension;
  var id=0;
  var aleatorio=[];
  var numAleatorio;
  var numId=0;
  var puntuacion=0;
  var click=0;
  var segundos=0;
  var minutos=0;
  var horas=0;
  var tiempoS, tiempoM, tiempoH;

// nom_div("puntuacion").innerHTML=("<h3> Puntuación: "+puntuacion+"</h3>");
$("#fin").hide();
$("#volver").hide();

  var escenario =function (numCir)
  {
    //clearInterval(intervalo);
    tabla="<table id='tabla'>"
    for (var i = 0; i < dimension; i++)
    {
      tabla += "<tr>";
      for (var j = 0; j < dimension; j++)
      {
          id++;
          tabla += "<td>";
          tabla += "<div id= '_"+id+"'class='cuadro'></div>";
          tabla += "</td>";
      }
      tabla += "<tr>";
    }
    tabla += "</table>";
    $("#tablas").append(tabla);

  }


function aleatorios()
{
    numAleatorio=Math.floor(Math.random()*(numCir-120+1)+1);

}

var llenarAleatorio = (function llenarAleatorio(numCir)
{    //clearInterval(intervalo);
  for(var j=0; j<numCir; j++)
  {
    aleatorios();
    if(!igual())
    {
      aleatorio.push(numId);
    }else
    {
      j--;
      aleatorios();
    }
  }
    return llenarAleatorio;
})(numCir);


function igual()
{
  var igual=false;
  for (var i = 0; i < aleatorio.length; i++) {
    if (numAleatorio===aleatorio[i]) {
      igual=true;
    }
  }
return igual;
}

  function nom_div(div)
  {
      return document.getElementById(div);
  }
function randomColor() {
  return '#'+(function lol(m,s,c){return s[m.floor(m.random() * s.length)] +
  (c && lol(m,s,c-1));})(Math,'0123456789ABCDEF',4);

  //Tomado: http://www.paulirish.com/2009/random-hex-color-code-snippets/
}
var contador1=0;var intervalo;
var animacion="flip";
function patron()
{
  clearInterval(tiempo);
  contador1=0;
  if (contador1 <=aleatorio.length)
  {
    intervalo= setInterval(function()
     {
        $("#_"+aleatorio[contador1]).css("background-color", randomColor()).addClass(animacion);

        contador1++;
        patron2();
      },1000);
  }
}

function patron2()
{
  var contador2=0;
  if (contador2<= aleatorio.length && contador1 === aleatorio.length)
  {
    setInterval(function ()
    {
      $("#_"+aleatorio[contador2]).removeClass("animated"+animacion).css("background-color","rgb(232,232,232)");
      contador2++;
      if (contador2===aleatorio.length)
      {
          clearInterval(intervalo);
          if (click===1) {
            clearInterval(tiempo);
            timer(segundos);
          }
      }
    },1000);

  }
}

function timer()
{
  var tiempo=setInterval(function ()
  {
    segundos++;
    tiempoS=segundos<10?"0"+segundos:segundos;
    tiempoM=minutos<10?"0"+minutos:minutos;
    tiempoH=horas<10?"0"+horas:horas;

    if (segundos===59)
    {
      segundos=0
      minutos++;
    }
    if (minutos===59)
    {
      minutos=0;
      horas++;
    }

  nom_div("tiempo").innerHTML=+tiempoH+":"+tiempoM+":"+tiempoS;

  },1000);

}

function partida() {
  patron();
  //escenario(dimension);
  $(".cuadro").click(function cuadro(e)
  {
    numId=e.target.id;
    numId=numId.split("_");
    console.log(numId+" " +numId[1]);
    if (aleatorio.indexOf(Number(numId[1]))>=0) {
      puntuacion++;
          nom_div("puntuacion").innerHTML=("<h3> Puntuación: "+puntuacion+"</h3>");
          //if (pasoNivel===aleatorio.length) {
          $("#tabla").remove();
          id=0;
          //nom_div("nivel").innerHTML=("<h3> Nivel: "+nivel+"</h3>");
          aleatorio.splice(0,aleatorio.length);
          llenarAleatorio(dimension);
          escenario(dimension);
          partida();
          patron();

        //}
      } return cuadro;
  })

}


$("#inicio").click(function () {
  click++;
  escenario(11);
  partida();
  $("#inicio").fadeOut();
})

$("#volver").click(function () {
  location.reload();
})
});
