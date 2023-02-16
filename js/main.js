/*Con la declaración de esta función, le estamos indicando al navegador
que hasta que no se cargue todos los datos e imágenes, no se podra ejecutar*/
$(document).ready(function () {
 
  /* Oculto la tabla de posiciones*/
  $("#posiciones").hide();
   /*Empezamos por declarar las variables que a continuación usaremos como contar el número 
  de coches en un array o el espacio recorrido por cada uno*/
  var arrayCoches = [];
  var recorrido = $("#juego").width() - 130;
  /*Aunque ya está puesto el botón de reinicar em html, lo ocultaremos*/
  $("#reiniciar").hide();

  /*Realizaremos una función para crear un array para poder pintar cada coche con su 
  correspondiente carretera de manera individualziada.
  Se dibujarán la cantidad de coches según la selección del desplegable*/
  
  $("#coches").click(function () {
    /*Introduciremos el valor seleccionado en la variable coches*/
    let coches = $("#coches").val();
    /*Con parseInt, se leerá la variable coches para pasarlo el array ya creado al principio arrayCoches*/
    arrayCoches = new Array(parseInt(coches));
    /*Se procederá a vaciar el elemento carrera antes de comenzar a pintar los coches*/
    $("#carrera").empty();
    /*Con este bucle for, nos aseguraremos que se pintarán tantos coches como el número de posiciones que
    contenta el array*/
    for (let i = 1; i <= arrayCoches.length; i++) {
      /*Para cada rail, se marcará una id tanto para la carretera como para la imagen que irá seleccionando,
       y se guardará en la variable contenedorCoche*/
      let contenedorCoche = `<div id='carretera${i}'><img id='car${i}' src='img/car${i}.png'></img></div>`;
      /*Se irá dibujando cada contenedor después del anterior*/
      $("#carrera").append(contenedorCoche);
      /*indicamos la ruta y las cualidades para la imagen creada para la carretera*/
      $("#carretera" + i).css("backgroundImage","url(img/texturaAsfalto.png)", "#meta");
      /*le damos propiedades css a la imagen de asfalto*/
      $("#carretera" + i).css("backgroundSize", "100px");
       /*le damos propiedades css a la imagen del coche indicado*/
      $("#car" + i).css("width", "135px");
    }
  });

  /*Ahora es cuando se procede con la FUNCIÓN para que el coche se mueva tras clickar en iniciar*/
  $("#iniciar").click(function () {
    /*Esta variable contador nos valdrá para luego pintar el puesto en el que se ha quedado en la carrera*/
    let contador = 1;
    /*Dibujamos ya la cabera de la tabla aunque aun no se muestre*/
    $("#posiciones").prepend('<caption>Posiciones Participantes</caption>');
    /*Con este bucle for, le dire a cada coche la velocidad a la tendrá que desplazarse*/ 
      for (let i = 1; i <= arrayCoches.length; i++) {
        /*Para cada coche, se creará la animación*/
        $("#car" + i).animate(
                              /*marcamos el limite de la animación*/
                              { marginLeft: recorrido },
                              /*Con este random marcaremos la velocidad*/
                              Math.floor(Math.random() * (11 - 1) + 1) * 1000 ,
                              /*Una vez terminado el recorrido, se activará esta función para pintar las 
                              posiciones en la tabla*/   
                              function () {
                                if(contador===1){
                                    $("#posiciones").append(
                                      '<tr><th>Ganador |</th><th>| Nombre</th></tr>');
                                    $("#posiciones").append( 
                                      '<tr><th>' + contador + '</td><th>' + 'Car '+ i + '</th></tr>'
                                    );
                                }else{
                                    $("#posiciones").append(
                                      '<tr><th>Posición |</th><th>| Nombre</th></tr>');
                                    $("#posiciones").append( 
                                      '<tr><th>' + contador + '</td><th>' + 'Car '+ i + '</th></tr>'
                                    );
                                }
                                contador++ 
                                $("#posiciones").show();
                              }            
        );
      }
    /*Ocultaremos el botón clicado, en este caso, start*/
    $(this).hide();
    /*aparecerá el botón restart*/
    $("#reiniciar").show();
  });

  /*Por último crearemos esta función para reiniciar el juego con un click*/
 $("#reiniciar").click(function () {
    /* Oculto la tabla de posiciones*/
    $("#posiciones").hide();
    /*indicaremos con el bucle, que para cada coche debe de parar la animación y posicionarse al inicio del recorrido*/
    for (let i = 1; i <= arrayCoches.length; i++) {
      $("#car" + i).stop();
      $("#car" + i).animate({ marginLeft: "0" });
      /*Se borrará la posición marcada en la última carrera*/
      $("#posiciones").empty();
    }
    /*Ocultaremos el botón clicado, en este caso, restart*/
    $(this).hide();
    /*aparecerá el botón start*/
    $("#iniciar").show();
    
  });

});


