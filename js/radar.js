
function drawRadar( data ) {

  var settings = {
    width: 700,
    height: 550,
    center: { x: 350, y: 260 },
    radius: 180,
    labelsRadius: 200,
    pointR: 4,
    colors: {
      graphs: [ 'red', 'blue', 'green', 'white' ]
    },
    title: 'Radar chart'
  };

  var max = 4;
  var step = 1;


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
    d.color = settings.colors.graphs[ i ];
    d.vals.forEach( function ( val, i ) {
      d.points.push([
        2 * Math.PI / d.vals.length * i,
        val * settings.radius / ( max / step )
      ]);
    });
  });


  var radar = d3.select('#radar-chart')
    .append('svg')
    .attr('width', settings.width )
    .attr('height', settings.height );

  radar.append('rect')
    .attr('width', settings.width )
    .attr('height', settings.height )
    .classed('background', true);

  radar.append('text')
    .classed('title', true)
    .attr('x', settings.width / 2 )
    .attr('y', 30)
    .text( settings.title );

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

  web.selectAll('.tick')
    .data( threads.concat(['']) )
    .enter()
    .append('text')
    .attr('x', -10 )
    .attr('y', function ( d, i ) { return - i * settings.radius / ( max / step ) + 9 } )
    .text( function ( d, i ) { return i })
    .classed('tick', true );

  web.selectAll('.label')
    .data( data.labels )
    .enter()
    .append('text')
    .classed('label', true )
    .text( function ( d ) { return d })
    .attr('x', function ( d, i ) { return settings.labelsRadius * Math.sin( 2 * Math.PI / data.labels.length * i ) })
    .attr('y', function ( d, i ) { return  - settings.labelsRadius * Math.cos( 2 * Math.PI / data.labels.length * i ) })
    .attr('text-anchor', function( d, i ) {
      var angle = i / data.labels.length * 360 - 180;
      return Math.abs( angle ) < 30 || Math.abs( angle ) > 150
        ? 'middle'
        : angle < 0
          ? 'start'
          : 'end';
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
    .attr('r', settings.pointR )
    .classed('point', true);


  var rows = d3.select('#radar-chart')
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



