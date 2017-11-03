function drawPlot( data ) {

  var settings = {
    width: 800,
    height: 500,
    top: 100,
    left: 50,
    right: 50,
    bottom: 50,
    title: 'Plot',
    colors: [ 'red', 'blue', 'green', 'white' ]
  };

  var plot = d3.select('#plot')
    .append('svg')
    .attr('width', settings.width )
    .attr('height', settings.height );

  plot.append('rect')
    .attr('width', settings.width )
    .attr('height', settings.height )
    .classed('background', true);

  plot.append('text')
    .classed('title', true)
    .attr('x', settings.width / 2 )
    .attr('y', 30)
    .text( settings.title );

data.dates.forEach( function( d, i )  {
  data.dates[ i ] = new Date( d )
});

  var vals = data.lines.reduce(function( arr, d ) { return arr.concat( d ) }, []);

  var scaleX =  d3.scaleBand()
    .domain( data.dates.map( function(d) { return d.toDateString().slice( 4 ) }) )
    .range([ 0, settings.width - settings.left - settings.right ])
    .padding( 0.3 );

  var axisX = d3.axisBottom().scale( scaleX );

  var groupX = plot.append('g')
    .classed('axis', true )
    .attr('transform', 'translate(' + settings.left + ',' + ( settings.height - settings.bottom ) + ')');

  groupX.call( axisX );

  groupX.selectAll('.tick text')
    .style('text-anchor', 'middle');


  var scaleY = d3.scaleLinear()
    .domain([ Math.round( d3.max( vals ) * 1.1), Math.round( d3.min( vals ) *.75 ) ])
    .range([0, settings.height - settings.top - settings.bottom ]);

  var axisY = d3.axisLeft().scale( scaleY );


  var groupY = plot.append('g')
    .classed('axis', true )
    .attr('transform', 'translate(' + settings.left + ',' + settings.top + ')');

  groupY.call( axisY.ticks( 8 ) );

  groupY.selectAll('.tick line')
    .attr('x2', settings.width - settings.left - settings.right );

  var points = data.lines.map( function( line ) {
    return line.map( function( point, i ) {
      return [ scaleX.step() * ( i + .5 ), scaleY( point ) ]
    });
  });

  var line = d3.line();

  groupY.selectAll('.date')
    .data( data.dates )
    .enter()
    .append('g')
    .attr('transform', function( d, i ) {
      return 'translate(' + scaleX.step() * i + ',0)';
    })
    .classed('date', true);

  groupY.selectAll('.date')
    .append('rect')
    .attr('width', scaleX.step() )
    .attr('height', settings.height - settings.top - settings.bottom );


  groupY.selectAll('.plot-line')
    .data( points )
    .enter()
    .append('g')
    .attr('id', function( d, i) { return 'line' + i })
    .classed('plot-line', true )
    .style('fill', function( d, i ){ return settings.colors[i] })
    .append('path')
    .style('fill', 'transparent')
    .style('stroke', function( d, i ){ return settings.colors[i] })
    .attr('d', function( d ) { return line( d ) });



  groupY.selectAll('.plot-line').selectAll('circle')
    .data( function( d ) { return d } )
    .enter()
    .append('circle')
    .attr('id', function( d, i) { return 'circle' + i })
    .attr('cx', function ( d ) { return d[0]})
    .attr('cy', function ( d ) { return d[1]})
    .attr('r', 4 )
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

  data.lines.forEach( function( line, i ) {
    var hints = d3.select('#plot')
      .selectAll('div.line' + i )
      .data( line )
      .enter()
      .append('div')
      .classed('hint-plot', true)
      .attr('id', function(d, i1) { return 'hint' + i +'-' + i1; })
      .style('left', function( d, i1 ) {
        return settings.left + scaleX( data.dates[ i1 ].toDateString().slice( 4 ) ) - scaleX.step() * .3 + 'px'
      })
      .style('width', scaleX.step() + 'px' )
      .style('top', function ( d ) {
        return  settings.top + scaleY( d ) - 75  + 'px'
      })
      .classed('line' + i, true);

    hints.append('div')
      .classed('value', true)
      .html( function(d) { return d });

    hints.append('div')
      .classed('point-date', true)
      .html( function(d, i1) { return data.dates[ i1 ].toDateString() });

    hints.append('div')
      .classed('corner', true)
      .style('left', scaleX.step() / 2 - 10 + 'px');;

  });




};

