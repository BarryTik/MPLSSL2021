
d3.json("data/scoring.json").then(data => {
  console.log(data);
    var name = [];
    var team = [];
    var goals = [];
    var chartColors =[];
    const teamColors = {"Le Cordon Bleu":"#26619C","Purple Pain":"#7E889F","Red Red Redemption":"#FF0000","Party Forward":"#EEA5A7","MHH: The Vaxxed and the Furious":"#000000","Green Eggs and Hamm's":"#014421","Stay Gold, Ponyboy":"#E7BD42","Koalas FC":"#A7A7A7"}

    for(var i = 0; i < Object.keys(data["Name"]).length; i++){
        var player = Object.keys(data["Name"])[i];
        name.push(player);
        team.push(data["Name"][player]["Team"]);
        goals.push(data["Name"][player]["Goals"]);
    }

    console.log("name", name);
    console.log("team", team);
    console.log("goals", goals);
    for(var i = 0; i<team.length; i++){
        chartColors[i] = teamColors[team[i]];

    }

    console.log(chartColors);

    var options = {
        series: [{
            name: "Goals Scored",
            data: goals
      }],
        chart: {
        type: 'bar',
        height: '95%',
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
