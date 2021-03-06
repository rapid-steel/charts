
function drawBarChart( data, settings ) {

  var barchart = initChart( settings );

  var groupY = barchart.append('g')
    .classed('axis', true)
    .attr('transform', 'translate(' + settings.left + ',' + settings.top + ')');
  var groupX = barchart.append('g')
    .classed('axis', true)
    .attr('transform', 'translate(' + settings.left + ',' + ( settings.height - settings.bottom ) + ')');


  var scaleX = d3.scaleBand()
    .domain( data.map( function( d) { return d.label } ))
    .range([ 0, settings.width - settings.left - settings.right ])
    .padding( settings.barPadding );

  var axisX = d3.axisBottom().scale( scaleX );

  var scaleY = d3.scaleLinear()
    .domain([ 0, d3.max( data.map( function(d) { return d.val })) ])
    .range([ settings.height - settings.top - settings.bottom , 0])
    .nice();

  var axisY = d3.axisLeft().scale( scaleY );

  groupY.call( axisY );

  groupY.selectAll('.tick line')
    .attr('x2', settings.width - settings.left - settings.right );

  groupX.call( axisX );

  groupX.selectAll('.tick text')
    .attr('text-anchor', 'middle');

  groupX.selectAll('rect')
    .data( data )
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('id', function( d, i) { return 'bar' + i  })
    .attr('width', scaleX.bandwidth() )
    .attr('height', function( d ) { return ( settings.height - settings.top - settings.bottom ) - scaleY( d.val ); })
    .attr('x', function( d ) { return scaleX( d.label ) })
    .attr('y', function( d ) { return - ( settings.height - settings.top - settings.bottom ) + scaleY( d.val ); })
    .on('mouseenter', function() {
      var index = +d3.event.target.id.slice( 3 );
      d3.selectAll('.hint')
        .filter(function (d, i) { return i === index })
        .transition( 750 )
        .style('opacity', 1);
    })
    .on('mouseleave', function() {
      var index = +d3.event.target.id.slice( 3 );
      d3.selectAll('.hint')
        .filter(function (d, i) { return i === index })
        .transition( 750 )
        .style('opacity', 0);
    });

  d3.select('#bar-chart').selectAll('.hint')
    .data( data )
    .enter()
    .append('div')
    .classed('hint', true)
    .style('opacity', 0)
    .style('left', function( d ) {
      return settings.left + scaleX( d.label ) - scaleX.step() * settings.barPadding / 2 + 'px'
    })
    .style('width', scaleX.step() + 'px' )
    .style('top', function ( d ) {
      return  settings.top + scaleY( d.val ) - 55  + 'px'
    })
    .html( function( d ) { return d.val + settings.unit })
    .append('div')
    .classed('corner', true)
    .style('left', scaleX.step() / 2 - 10 + 'px');
}




