function populateTeamObjects(data){
    for (var i=0; i<data.length; i++){
        var teamData = data[i];
        var color = teamData["Color"].split(" ").join("");
        d3.select("#standings")
            .append("div")
            .attr("id", color)
            .attr("class", "row team");
        d3.select(`#${color}`)
            .append("div")
            .attr("class", "ordinal col-1")
            .text(teamData["rank"])
            .style("visibility", teamData["visibility"]);
        d3.select(`#${color}`)
            .append("div")
            .attr("class", "team-logo col-2")
            .append("img")
            .attr("src", `../logos/${color}.png`)
            .attr("width", "85%")
            .attr("height", "85%");
        d3.select(`#${color}`)
            .append("div")
            .attr("class", "team-info col-9")
        d3.select(`#${color}`)
            .select(".team-info")
            .append("div")
            .attr("class", "name row")
            .text(teamData.Team);
        d3.select(`#${color}`)
            .select(".team-info")
            .append("div")
            .attr("class", "record row")
            .text(`${teamData.W}W ${teamData.L}L ${teamData.T}T`);

    }
}

function rankTeams(data){
    for (var i=0; i<data.length; i++){
        data[i]["score"] = 3*parseInt(data[i]["W"]) + parseInt(data[i]["T"]);
    }
    var scores = [];
    for (var i=0; i<data.length; i++){
        scores.push(data[i]["score"]);
    }
    scores.sort().reverse();
    var ranker = 1;
    var tracker = 1;
    var visibility = "visible";
    for (var i=0; i<scores.length; i++){
        data[i]["rank"] = ranker;
        data[i]["visibility"] = visibility;
        tracker++;
        visibility = "hidden";
        if (scores[i] > scores[i+1]){
            ranker = tracker;
            visibility = "visible";
        }


    }
    // console.log(data);
    return(data);
}


d3.csv("../data/standings.csv").then(data => {
    // console.log(data);
    populateTeamObjects(rankTeams(data));
})
