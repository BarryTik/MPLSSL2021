
d3.csv("../data/scoring.csv").then(data => {
    var name = [];
    var team = [];
    var goals = [];
    var colors =[];
    for(var i = 0; i < data.length; i++){
        name.push(data[i]["Name"]);
        team.push(data[i]["Team"]);
        goals.push(data[i]["Goals"]);
    }

    teamColors = {"Lapis":"#26619C","Orchid":"#7E889F","Red Red Redemption":"#FF0000","Party Forward":"#EEA5A7","MHH: The Vaxxed and the Furious":"#000000","Forest Green":"#014421","'Stay Gold, Ponyboy'":"#E7BD42","Koalas FC":"#A7A7A7"}
    for(var i = 0; i<team.length; i++){
        colors[i] = teamColors[team[i]];

    }
    console.log(colors);

    var options = {
        series: [{
        data: goals,
        }],
        chart: {
        type: 'bar',
        height: 350
        },
        plotOptions: {
        bar: {
            borderRadius: 4,
            horizontal: true,
        }
        },
        dataLabels: {
        enabled: false
        },
        xaxis: {
        categories: name,
        },
        colors: colors
                
        };
    
        var chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();
});
