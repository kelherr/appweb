// Obtenido de https://www.highcharts.com/demo/highcharts/column-stacked
Highcharts.chart('container', {
    chart: {
        type: 'column',
        height: 280,
        style: {
          fontFamily: 'Lucida Sans',
        }
    },
    title: {
        text: 'Productos por tipos',
        align: 'left'
    },
    xAxis: {
        categories: ['Donaciones', 'Pedidos']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Cantidad'
        },
        stackLabels: {
            enabled: false
        }
    },
    legend: {
        align: 'right',
        x: 0,
        verticalAlign: 'top',
        y: 0,
        floating: true,
        backgroundColor: 'var(--highcharts-background-color, #ffffff)',
        borderColor: 'var(--highcharts-neutral-color-20, #cccccc)',
        borderWidth: 1,
        shadow: false
    },
    tooltip: {
        headerFormat: '<b>{category}</b><br/>',
        pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
    },
    plotOptions: {
        column: {
            stacking: 'normal',
            dataLabels: {
                enabled: true
            }
        }
    },
    series: [{
        name: 'Fruta',
        data: [3, 5]
    }, {
        name: 'Verdura',
        data: [14, 8]
    }, {
        name: 'Otro',
        data: [0, 2]
    }]
});
