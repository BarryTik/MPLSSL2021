
d3.csv("../data/scoring.csv").then(data => {
    var name = [];
    var team = [];
    var goals = [];
    var chartColors =[];
    for(var i = 0; i < data.length; i++){
        name.push(data[i]["Name"]);
        team.push(data[i]["Team"]);
        goals.push(data[i]["Goals"]);
    }

    teamColors = {"Lapis":"#26619C","Orchid":"#7E889F","Red Red Redemption":"#FF0000","Party Forward":"#EEA5A7","MHH: The Vaxxed and the Furious":"#000000","Forest Green":"#014421","'Stay Gold, Ponyboy'":"#E7BD42","Koalas FC":"#A7A7A7"}
    for(var i = 0; i<team.length; i++){
        chartColors[i] = teamColors[team[i]];

    }

    var options = {
        series: [{
            name: "Goals Scored",
            data: goals
      }],
        chart: {
        type: 'bar',
        height: 380,
        toolbar: {
            show: false
        }
      },
      plotOptions: {
        bar: {
          barHeight: '100%',
          distributed: true,
          horizontal: true,
          dataLabels: {
            position: 'bottom'
          },
        }
      },
      legend: {
          show: false,
      },
      colors: chartColors,
      dataLabels: {
        enabled: true,
        textAnchor: 'start',
        style: {
          colors: ['#fff']
        },
        formatter: function (val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val
        },
        offsetX: 0,
        dropShadow: {
          enabled: true
        }
      },
      stroke: {
        width: 1,
        colors: ['#fff']
      },
      xaxis: {
        categories: name,
        labels: {
            show: false
        },
        axisTicks: {
            show: false
        },
      },
      yaxis: {
        labels: {
          show: false
        }
      },
      title: {
          text: 'Scoring Leaders',
          align: 'center',
          margin: 10,
          offsetY: 15,
          style:{
                color: '#fff',
                fontFamily: 'Colfax',
                fontSize: '1.6rem'
          },
          floating: true
      },
      tooltip: {
        theme: 'dark',
        x: {
            formatter: function (val) {
                return (team[name.indexOf(val)] + ": " + val);
            }
        },
        y: {
          title: {
            formatter: function () {
              return '';
            }
          }
        }
      }
      };

        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
});
