
  var xhr = new XMLHttpRequest(),
    data;


  xhr.onload = function () {
    data = JSON.parse( xhr.responseText );

    drawBarChart( data.barchart );
    drawRadar( data.radar );
    drawPlot( data.plot );
  };


  xhr.open('GET', 'getdata.php');

  xhr.send();

