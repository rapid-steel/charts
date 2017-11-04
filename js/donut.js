function drawDonut( data, settings ) {

  var donut = initChart( settings );

  var pie = d3.pie().sort( null );
  var path = d3.arc()
    .innerRadius( settings.innerRadius )
    .outerRadius( settings.outerRadius );

  var pieGroup = initPieGroup( donut, data, settings );

  var sections = initPieSections( pieGroup, pie( data.sections.map( function ( d ) { return d.val })), path, settings );

  path.outerRadius( settings.labelRadius );

  var labels = sections.append('g')
    .classed('label', true)
    .classed('label-donut', true)
    .attr("transform", function ( d ) { return 'translate(' + path.centroid( d ) + ')' });

  labels.append('text')
    .text( function( d, i ) { return data.sections[i].val + settings.unit })
    .classed('value', true)
    .attr('dominant-baseline', 'text-after-edge')
    .attr('text-anchor', function( d ) {
      var angle = d.startAngle + ( d.endAngle - d.startAngle ) / 2 - Math.PI;
      return getTextAnchor( angle );
    });

  labels.append('text')
    .text( function( d, i ) { return data.sections[i].label })
    .attr('dominant-baseline', 'text-before-edge')
    .attr('text-anchor', function( d ) {
      var angle = d.startAngle + ( d.endAngle - d.startAngle ) / 2 - Math.PI;
      return getTextAnchor( angle );
    });


  var rows = d3.select( settings.container )
    .append('div')
    .attr('id', 'donut-legend')
    .selectAll('div')
    .data( data.sections )
    .enter()
    .append('div')
    .attr('id', function( d, i ) { return 'row' + ( i + 1 ) })
    .on('mouseenter', function() {
      donut.select('.section:nth-of-type(' + d3.event.target.id.slice( 3 ) + ')')
        .classed('hover', true);
    }) .on('mouseleave', function() {
      donut.select('.section:nth-of-type(' + d3.event.target.id.slice(3) + ')')
        .classed('hover', false);
    });

  var vals = rows.append('div')
    .classed('legend-val', true)
    .html( function( d ) { return d.val + settings.unit } );

  vals.append('div')
    .classed('marker', true)
    .style('border-color', function ( d, i ) { return settings.colors[i] });

  rows.append('div')
    .classed('legend-label', true)
    .html( function( d ) { return d.label } );

  rows.append('hr');





}