Highcharts.chart('regiones', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Productos por Región'
    },
    subtitle: {
        text:
            'Source: <a target="_blank" ' +
            'href="https://www.indexmundi.com/agriculture/?commodity=corn">indexmundi</a>'
    },
    xAxis: {
        categories: ['USA', 'China', 'Brazil', 'EU', 'Argentina', 'India'],
        crosshair: true,
        accessibility: {
            description: 'Región'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: '1000 metric tons (MT)'
        }
    },
    tooltip: {
        valueSuffix: ' (1000 MT)'
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [
        {
            name: 'Donaciones',
            data: [387749, 280000, 129000, 64300, 54000, 34300]
        },
        {
            name: 'Pedidos',
            data: [45321, 140000, 10000, 140500, 19500, 113500]
        }
    ]
});
