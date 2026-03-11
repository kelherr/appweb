fetch("http://localhost:5000/region-dashboard")
  .then(response => response.json())
  .then(data => {

    const donaciones = data.tot_donaciones;
    const pedidos = data.tot_pedidos;

    render_grafico(pedidos, donaciones);

  })
  .catch(error => console.error(error));

function render_grafico(pedidos, donaciones){
    Highcharts.chart('regiones', {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Productos por Región',
            style: {
                fontFamily: 'Lucida Sans'
            }
        },
        xAxis: {
            categories: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'RM', 'XIV', 'XV', 'XVI'],
            crosshair: true,
            accessibility: {
                description: 'Región'
            },
            title: {
                text: 'Región'
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Cantidad'
            }
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
                data: donaciones
            },
            {
                name: 'Pedidos',
                data: pedidos
            }
        ]
    });
};
