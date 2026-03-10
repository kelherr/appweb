data1 = {

    chart: {
        type: 'pie',
        height: 130
    },

    title: {
        text: 'Productos por tipo',
        style: {
            fontFamily: 'Lucida Sans',
            fontSize: '14px'
        }
    },

    tooltip: {
        pointFormat: '<b>{point.percentage:.1f}%</b>'
    },

    plotOptions: {
        pie: {
            innerSize: '70%',
            size: '130%',
            dataLabels: {
                enabled: true,
                format: '{point.name}',
                style: {
                    fontSize: '11px'
                }
            }
        }
    },

    series: [{
        name: 'Productos',
        data: [
            { name: 'Fruta', y: 73.86},
            { name: 'Verdura', y: 11.97},
            { name: 'Otro', y: 5.52}
        ]
    }],

    credits: {
        enabled: false
    }

}

Highcharts.chart('container1', data1);
Highcharts.chart('container2', data1);