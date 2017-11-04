function drawHalfDonut( data, settings ) {

  var halfdonut = initChart( settings );

  var pie = d3.pie()
    .startAngle( - Math.PI / 2 )
    .endAngle( Math.PI / 2 )
    .sort( null );
  var path = d3.arc()
    .innerRadius( settings.innerRadius )
    .outerRadius( settings.outerRadius );

  var pieGroup = initPieGroup( halfdonut, data, settings );

  var sections = initPieSections( pieGroup, pie( data.sections.map( function ( d ) { return d.val })), path, settings );

  var scaleVals = pieGroup.selectAll('label')
    .data( [ 0, data.sections.reduce( function(sum, d) { return sum + d.val }, 0 ) ] )
    .enter()
    .append('text')
    .text( function( d ) { return d })
    .classed('label', true)
    .attr("transform", function ( d, i ) { return 'translate(' + settings.scaleRadius * ( i* 2 - 1 )  + ' 0)' })
    .attr('text-anchor', function( d, i) { return i === 0 ? 'end' : 'start' } );


}