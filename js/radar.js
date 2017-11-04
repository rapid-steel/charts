
function drawRadar( data, settings ) {

  var max = d3.max( data.data.reduce( function( arr, d ) { return arr.concat(d.vals) }, []));
  var step = settings.scaleStep;

  var line = d3.radialLine();

  var threads = [];
  var graphCoords = [];

  for ( var i = 0; i < max; i = i + step ) {
    threads.push([]);
    for ( var j = 0; j <= data.labels.length; j++ ) {
      threads[ i ].push([
        2 * Math.PI / data.labels.length * j,
        ( i + 1 ) * settings.radius / ( max / step )
      ]);
    }
  }

  data.data.forEach( function( d, i ) {
    d.points = [];
    d.color = settings.colors[ i ];
    d.vals.forEach( function ( val, i ) {
      d.points.push([
        2 * Math.PI / d.vals.length * i,
        val * settings.radius / ( max / step )
      ]);
    });
  });


  var radar = initChart( settings );

  var web = radar.append('g')
    .attr('id', 'web')
    .attr('transform', 'translate(' + settings.center.x + ',' + settings.center.y + ')');

  web.selectAll('.thread')
    .data( threads )
    .enter()
    .append('path')
    .attr('d', function( d ) { return line( d ) } )
    .classed('thread', true );

  web.selectAll('.thread-radial')
    .data( threads[ 0 ] )
    .enter()
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', 0)
    .attr('y2', settings.radius )
    .attr('transform', function( d, i ) { return 'rotate('+ 360 / data.labels.length * i +')' })
    .classed('thread-radial', true );

  web.selectAll('.scale')
    .data( threads.concat(['']) )
    .enter()
    .append('text')
    .attr('x', -10 )
    .attr('y', function ( d, i ) { return - i * settings.radius / ( max / step ) + 9 } )
    .text( function ( d, i ) { return i })
    .classed('scale', true );

  web.selectAll('.label')
    .data( data.labels )
    .enter()
    .append('text')
    .classed('label', true )
    .text( function ( d ) { return d })
    .attr('x', function ( d, i ) { return settings.labelsRadius * Math.sin( 2 * Math.PI / data.labels.length * i ) })
    .attr('y', function ( d, i ) { return  - settings.labelsRadius * Math.cos( 2 * Math.PI / data.labels.length * i ) })
    .attr('text-anchor', function( d, i ) {
      var angle = i / data.labels.length * 2 * Math.PI - Math.PI;
      return getTextAnchor( angle );
    });


  var graphs = web.selectAll('.graph')
    .data( data.data )
    .enter()
    .append('g')
    .classed('graph', true).style('fill', function ( d) { return d.color  });

  graphs.append('path')
    .attr('d', function ( d ) { return line( d.points ) + ' Z' } )
    .style('stroke', function ( d) { return d.color  });

  graphs.selectAll('.point')
    .style('fill', function( d ) { return d.color })
    .data( function ( d ) { return d.points } )
    .enter()
    .append('circle')
    .attr('cx', function ( d1 ) {  return d1[1] * Math.sin( d1[0] ) } )
    .attr('cy', function ( d1 ) { return d1[1] * -  Math.cos( d1[0] ) } )
    .attr('r', settings.pointRadius )
    .classed('point', true);


  var rows = d3.select( settings.container )
    .append('table')
    .attr('id', 'legend')
    .selectAll('tr')
    .data( data.data )
    .enter()
    .append('tr')
    .attr('id', function( d, i ) { return 'row' + ( i + 1 ) })
    .on('mouseenter', function() {
      d3.select('.graph:nth-of-type(' + d3.event.target.id.slice( 3 ) + ') path')
        .style('fill-opacity', .35);
    }) .on('mouseleave', function() {
      d3.select('.graph:nth-of-type(' + d3.event.target.id.slice( 3 ) + ') path')
        .style('fill-opacity', 0);
    });

  rows.append('td')
    .classed('line', true)
    .append('hr')
    .style('color', function ( d ) { return d.color });

  rows.append('td')
    .classed('name', true)
    .html( function( d ) { return d.name } );


}



