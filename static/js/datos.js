const chartDonacion = {
  chart : {
    type: "bar",
    borderWidth: 1,
    borderColor: '#000000',
  },
  title : {
    text : "Donaciones por tipo",
    style: {
      fontFamily: 'Lucinda Console',
      fontSize : '25px',
    },
  },
  yAxis : {
    title : {
      text: "Cantidad",
      style: {
        fontFamily: 'Lucinda Console',
        fontSize: '16px',
      },
    }, 
    allowDecimals: false,
  },
  series: [{
    name: null,
    data : [],
    color: "#e59c3d",
    showInLegend : false,
  }],
};

const chartPedido = {
  chart : {
    type: "bar",
    borderWidth: 1,
    borderColor: '#000000',
  },
  title : {
    text : "Pedidos por tipo",
    style : {
      fontFamily: "Lucinda Console",
      fontSize : "25px",
    },
  },
  yAxis : {
    title : {
      text: "Cantidad",
      style : {
        fontFamily: "Lucinda Console",
        fontSize : "16px",
      },
    }, 
    allowDecimals: false,
  },
  series: [{
    name: null,
    data : [],
    color: "#98ec54",
    showInLegend : false,
  }],
};

Highcharts.chart('chart-donacion', chartDonacion);
Highcharts.chart('chart-pedido', chartPedido);

fetch("http://localhost:5000/obtener-datos")
  .then((response) => response.json())
  .then((data)=> {
    const chartd = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === 'chart-donacion'
    );
    
    const chartp = Highcharts.charts.find(
      (chart) => chart && chart.renderTo.id === 'chart-pedido'
    );

    let data_donacion = data[1];
    let data_pedido = data[0];

    chartd.update({
      series : [
        {
          data: Object.keys(data_donacion).map(function(key){
            return data_donacion[key];
          }),
        },
      ],
      xAxis: {
        categories : Object.keys(data_donacion),
        title : {
          style: {
            fontFamily: 'Lucinda Console',
          }
        },
      },
    });

    chartp.update({
      series : [
        {
          data: Object.keys(data_pedido).map(function(key){
            return data_pedido[key];
          }),
        },
      ],
      xAxis: {
        categories : Object.keys(data_pedido),
        title : {
          style: {
            fontFamily: 'Lucinda Console',
          }
        },
      },
    });

  })
  .catch((error) => console.error("Error:", error));