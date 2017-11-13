
  var xhr = new XMLHttpRequest(),
    data;


  xhr.onload = function () {
    data = JSON.parse( xhr.responseText );

    initAll( data );
    window.addEventListener('resize', function() {
      document.querySelectorAll('svg').forEach( function( node ) { node.parentNode.innerHTML = ''; });
      initAll( data );
    });
  };


  xhr.open('GET', 'getdata.php');

  xhr.send();

  function initAll( all ) {
    drawHalfDonut( data.halfDonut, getSettings( 'halfDonut', '#half-donut-chart') );
    drawDonut( data.donut, getSettings( 'donut', '#donut-chart') );
    drawBarChart( data.barchart, getSettings( 'barchart', '#bar-chart') );
    drawRadar( data.radar, getSettings( 'radar', '#radar-chart') );
    drawPlot( data.plot, getSettings( 'plot', '#plot') );
  }



  function initChart( settings ) {

    var chart = d3.select( settings.container )
      .append('svg')
      .attr('width', settings.width )
      .attr('height', settings.height );

    chart.append('rect')
      .attr('width', settings.width )
      .attr('height', settings.height )
      .classed('background', true);

    chart.append('text')
      .classed('title', true)
      .attr('x', settings.width / 2 )
      .attr('y', settings.titleTop )
      .text( settings.title );

    return chart;
  }


  function initPieGroup( chart, data, settings ) {

    var pieGroup = chart.append('g')
      .attr('transform', 'translate(' + settings.center.x  + ',' + settings.center.y + ')');

    pieGroup.append('text')
      .classed('center-val', true)
      .text( data.center.val );

    pieGroup.append('text')
      .classed('center-label', true)
      .text( data.center.label );

    return pieGroup;
  }


  function initPieSections( group, data, path, settings ) {
    var sections = group.selectAll('.section')
      .data( data )
      .enter()
      .append('g')
      .classed('section', true);

    sections.append('path')
      .attr('d', path )
      .style('fill', function ( d, i) { return settings.colors[i]});

    return sections;
  }



  function getTextAnchor( angle ) {
   return Math.abs( angle ) < Math.PI / 6 || Math.abs( angle ) > Math.PI * 5 / 6
      ? 'middle'
      : angle < 0
      ? 'start'
      : 'end';
  }

