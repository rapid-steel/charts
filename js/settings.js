function getSettings( type, container ) {

  const containerEl = document.querySelector( container );
  const width = containerEl.clientWidth;
  const height = containerEl.clientHeight;
  const min = width < height ? width : height

  switch ( type ) {
    case 'halfDonut':
      return {
        container: container,
        width: width,
        height: height,
        title: 'Half Donut',
        titleTop: 70,
        center: {
          x: width / 2,
          y: height - 100
        },
        innerRadius: min * 0.3,
        outerRadius: min * 0.3 + 50,
        scaleRadius: min * 0.3 - 40,
        colors: [ '#EE5843', '#5F6469' ],
        fontSize: {
          centerLabel : min > 420 ? '20px' : min / 21 + 'px',
          centerVal: min > 480 ? '48px' : min / 10 + 'px'
        }
      };

    case 'donut':
      return {
        container: '#donut-chart',
        width: width,
        height: height,
        center: {
          x: width / 2 - 60,
          y: height / 2 + 40
        },
        innerRadius: min * .15,
        outerRadius: min * .28,
        labelRadius: min * .45,
        title: 'Donut',
        titleTop: 50,
        unit: '',  //will be displayed next to the value. '%', for example
        colors: [ '#DAEAF6', '#291F71', '#B30753', '#FFA8B8', '#C82586', '#5AC8D8' ],
        fontSize: {
          centerLabel : min < 420 ? '20px' : min / 21 + 'px',
          centerVal: min > 420 ? '30px' : min / 14 + 'px'
        }
      };

    case 'radar':
      return {
        container: '#radar-chart',
        width: width,
        height: height,
        title: 'Radar chart',
        titleTop: 40,
        center: {
          x: width / 2 - 50,
          y: height / 2 + 30
        },
        radius: width - 160 >  height ? height * .35 : ( width - 160 ) * .35,
        labelsRadius:  width - 160 >  height ? height * .35 + 30 : ( width - 160 ) * .35 + 30,
        pointRadius: 4,
        scaleStep: 1,
        colors: [ 'red', 'blue', 'green', 'white' ]
      };

    case 'plot':
      return {
        container: '#plot',
        width: width,
        height: height,
        title: 'Plot',
        titleTop: 40,
        top: 100,
        left: 50,
        right: 50,
        bottom: 50,
        pointRadius: 4,
        unit: '',
        colors: [ 'red', 'blue', 'green', 'white' ]
      };

      case 'barchart':
        return {
        container: '#bar-chart',
        width: width,
        height: height,
        title: 'Bar chart',
        titleTop: 40,
        bottom: 50,
        left: 50,
        right: 50,
        top: 100,
        unit: '',
        barPadding: 0.3
      };

  }



};