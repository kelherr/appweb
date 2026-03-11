fetch("http://localhost:5000/tipos-dashboard")
  .then(response => response.json())
  .then(data => {

    const d = data.donaciones;
    const p = data.pedidos;

    render_grafico_donaciones(d);
    render_grafico_pedidos(p);

  })
  .catch(error => console.error(error));

function render_grafico_donaciones(series){
    Highcharts.chart('container1', {
        chart: {
            type: 'pie',
            height: 130
        },

        title: {
            text: 'Donaciones por Tipo',
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
            name: 'Donaciones',
            data: series
        }],

        credits: {
            enabled: false
        }

    });
};

function render_grafico_pedidos(series){
    Highcharts.chart('container2', {
        chart: {
            type: 'pie',
            height: 130
        },

        title: {
            text: 'Pedidos por Tipo',
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
            name: 'Pedidos',
            data: series
        }],

        credits: {
            enabled: false
        }

    });
};