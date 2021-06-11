function populateTeamObjects(data){
    for (var i=0; i<data.length; i++){
        var teamData = data[i];
        // console.log(teamData);
        color = teamData["Color"].split(" ").join("");
        d3.select("#standings")
            .append("div")
            .attr("id", color)
            .attr("class", "row team");
        d3.select(`#${color}`)
            .append("div")
            .attr("class", "ordinal col-1")
            .text(i);
        d3.select(`#${color}`)
            .append("div")
            .attr("class", "team-logo col-2")
            .append("svg")
            .attr("height", "70")
            .attr("width", "100%")
            .append("image")
            .attr("href", `../../logos/${color}.png`)
            .attr("width", "100%")
            .attr("height", "100%");
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
d3.csv("../data/standings.csv").then(data => {
    populateTeamObjects(data);
})
