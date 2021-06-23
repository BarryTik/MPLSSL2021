function populateTeamObjects(data){
    var colors = Object.keys(data.Color);
    for (var i=0; i<colors.length; i++){
        var teamData = data.Color[`${colors[i]}`];
        var color = colors[i].split(" ").join("");
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
            .attr("src", `logos/${color}.png`)
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
    var scores = [];
    var colors = Object.keys(data.Color);
    for (var i=0; i<colors.length; i++){
        scores.push(data.Color[`${colors[i]}`]["Pts"]);
    }
    scores.sort().reverse();
    var ranker = 1;
    var tracker = 1;
    var visibility = "visible";
    for (var i=0; i<scores.length; i++){
        data.Color[`${colors[i]}`]["rank"] = ranker;
        data.Color[`${colors[i]}`]["visibility"] = visibility;
        tracker++;
        visibility = "hidden";
        if (scores[i] > scores[i+1]){
            ranker = tracker;
            visibility = "visible";
        }


    }
    return(data);
}

function openPage(pageName, element){
    var tabcontent = document.getElementsByClassName("tabcontent");
    var tablink = document.getElementsByClassName("tablink");
    for (var i=0; i<tabcontent.length; i++) {
        tabcontent[i].style.display="none";
    }
    for (var i=0; i<tablink.length; i++){
        tablink[i].classList.remove('active-page');
    }


    document.getElementById(pageName).style.display = "block";
    element.classList.add('active-page');
}

var testData = {};
document.getElementById("defaultOpen").click();
d3.json("data/standings.json").then(data => {
    populateTeamObjects(rankTeams(data));
})
