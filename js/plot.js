

function drawPlot( data, settings ) {


  data.dates.forEach( function( d, i )  {
    data.dates[ i ] = new Date( d )
  });

  var plot = initChart( settings );
  var vals = data.lines.slice( 0, data.dates.length ).reduce(function( arr, d ) { return arr.concat( d ) }, []);

  var scaleX =  d3.scaleBand()
    .domain( data.dates.map( function(d) { return d.toDateString().slice( 4 ) }) )
    .range([ 0, settings.width - settings.left - settings.right ])
    .padding( 0 );

  var ticks = scaleX.step() > 80 ?  1 : Math.ceil( 80 / scaleX.step() );

  var axisX = d3.axisBottom().scale( scaleX );

  var groupX = plot.append('g')
    .classed('axis', true )
    .attr('transform', 'translate(' + settings.left + ',' + ( settings.height - settings.bottom ) + ')');

  groupX.append('rect')
    .classed('background', true)
    .attr('width', settings.width - settings.left - settings.right)
    .attr('height', settings.height - settings.top - settings.bottom);

  groupX.call( axisX.tickValues(
    data.dates.filter( function( d, i ) {
      return i % ticks === 0;
    }).map( function( d) { return d.toDateString().slice( 4 ) })) );


  var scaleY = d3.scaleLinear()
    .domain([ d3.max( vals ), d3.min( vals ) *.75 ])
    .range([0, settings.height - settings.top - settings.bottom ])
    .nice();

  var axisY = d3.axisLeft().scale( scaleY );


  var groupY = plot.append('g')
    .classed('axis', true )
    .attr('transform', 'translate(' + settings.left + ',' + settings.top + ')');

  groupY.call( axisY );

  groupY.selectAll('.tick line')
    .attr('x2', settings.width - settings.left - settings.right );

  var points = data.lines.map( function( line ) {
    return line.slice( 0, data.dates.length ).map( function( point, i ) {
      return [ scaleX.step() * ( i + .5 ), scaleY( point ) ]
    });
  });


  var line = d3.line();

  var rectHover;

  groupY.selectAll('.date-rect')
    .data( data.dates )
    .enter()
    .append('g')
    .attr('id', function( d, i ) { return 'rect' + i })
    .attr('transform', function( d, i ) {
      return 'translate(' +  scaleX.step() * i + ',0)';
    })
    .classed('date-rect', true);

  groupY.selectAll('.date-rect')
    .append('rect')
    .attr('width', scaleX.step() )
    .attr('height', settings.height - settings.top - settings.bottom );


  groupY.selectAll('.plot-path')
    .data( points )
    .enter()
    .append('g')
    .classed('plot-path', true )
    .append('path')
    .style('fill', 'transparent')
    .style('stroke', function( d, i ){ return settings.colors[i] })
    .attr('d', function( d ) { return line( d ) });


  groupY.selectAll('.plot-line')
    .data( points )
    .enter()
    .append('g')
    .attr('id', function( d, i) { return 'line' + i })
    .style('fill', function( d, i ){ return settings.colors[i] })
    .classed('plot-line', true );

  groupY.selectAll('.plot-line')
    .selectAll('circle')
    .data( function( d ) { return d } )
    .enter()
    .append('circle')
    .classed('point', true)
    .attr('cx', function ( d ) { return d[0]})
    .attr('cy', function ( d ) { return d[1]})
    .attr('r', settings.pointRadius );

  groupY.selectAll('.plot-line').selectAll('.circle-area')
    .data( function( d ) { return d } )
    .enter()
    .append('circle')
    .classed('circle-area', true)
    .attr('id', function( d, i) { return 'circle' + i })
    .attr('cx', function ( d ) { return d[0]})
    .attr('cy', function ( d ) { return d[1]})
    .attr('r', settings.pointRadius * 2 )
    .style('fill', 'transparent')
    .on('mouseenter', function() {
      var hintId = '#hint' + d3.event.target.parentNode.id.slice( 4 ) + '-' + d3.event.target.id.slice( 6 );
      d3.select( hintId )
        .transition( 750 )
        .style('display','block')
        .style('opacity', 1);
    })
    .on('mouseleave', function() {
      var hintId = '#hint' + d3.event.target.parentNode.id.slice( 4 ) + '-' + d3.event.target.id.slice( 6 );
      d3.select( hintId )
        .transition( 750 )
        .style('opacity', 0)
        .style('display','none');
    });


  groupY.on('mousemove', function() {
    var coords = d3.mouse( groupY._groups[0][0] );
    var rectId = 'rect' + Math.floor( coords[0] / scaleX.step() );
    if( rectHover !== rectId ) {
      d3.select( '#' + rectHover).style('opacity', 0);
      rectHover = rectId;
      d3.select( '#' + rectHover).style('opacity', 1);
    }
  })
    .on('mouseleave', function() {
      if ( rectHover )
        d3.select( '#' + rectHover).style('opacity', 0);
      rectHover = false;
    });

  data.lines.forEach( function( line, i ) {
    var hints = d3.select( settings.container )
      .selectAll('div.line' + i )
      .data( line.slice( 0, data.dates.length) )
      .enter()
      .append('div')
      .classed('hint-plot', true)
      .attr('id', function(d, i1) { return 'hint' + i +'-' + i1; })
      .style('left', function( d, i1 ) {
        return settings.left + scaleX( data.dates[ i1 ].toDateString().slice( 4 ) ) + scaleX.step() / 2 - 40 + 'px'
      })
      .style('width', '80px' )
      .style('top', function ( d ) {
        return  settings.top + scaleY( d ) - 75  + 'px'
      })
      .classed('line' + i, true);

    hints.append('div')
      .classed('value', true)
      .html( function(d) { return d + settings.unit });

    hints.append('div')
      .classed('point-date', true)
      .html( function(d, i1) { return data.dates[ i1 ].toDateString().slice( 4 ) });

    hints.append('div')
      .classed('corner', true)
      .style('left', '30px');
  });


}




