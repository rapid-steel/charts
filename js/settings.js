var settings = {

  halfDonut: {
    container: '#half-donut-chart',
    width: 600,
    height: 500,
    title: 'Half Donut',
    titleTop: 70,
    center: {
      x: 300,
      y: 400
    },
    innerRadius: 180,
    outerRadius: 230,
    scaleRadius: 250,
    colors: [ '#EE5843', '#5F6469' ]
  },

  donut: {
    container: '#donut-chart',
    width: 620,
    height: 500,
    center: {
      x: 250,
      y: 270
    },
    innerRadius: 80,
    outerRadius: 150,
    labelRadius: 270,
    title: 'Donut',
    titleTop: 50,
    unit: '',  //will be displayed next to the value. '%', for example
    colors: [ '#DAEAF6', '#291F71', '#B30753', '#FFA8B8', '#C82586', '#5AC8D8' ]
  },

  radar: {
    container: '#radar-chart',
    width: 700,
    height: 550,
    title: 'Radar chart',
    titleTop: 40,
    center: { x: 350, y: 260 },
    radius: 180,
    labelsRadius: 200,
    pointRadius: 4,
    scaleStep: 1,
    colors: [ 'red', 'blue', 'green', 'white' ]
  },

  plot: {
    container: '#plot',
    width: 800,
    height: 500,
    title: 'Plot',
    titleTop: 40,
    top: 100,
    left: 50,
    right: 50,
    bottom: 50,
    pointRadius: 4,
    unit: '',
    colors: [ 'red', 'blue', 'green', 'white' ]
  },

  barchart: {
    container: '#bar-chart',
    width: 500,
    height: 550,
    title: 'Bar chart',
    titleTop: 40,
    bottom: 50,
    left: 50,
    right: 50,
    top: 100,
    unit: '',
    barPadding: 0.3
  }
};