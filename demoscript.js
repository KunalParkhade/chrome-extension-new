async function getMatchData() {
    return await fetch("https://api.cricapi.com/v1/currentMatches?apikey=e7e3eaba-8786-42ed-bf6e-15398960169e&offset=0")
        .then(data => data.json())
        .then(data => {
            if(data.status !== "success") return;

            const matchesList = data.data;

            if(!matchesList) return [];

            const relevantData = matchesList.filter(match => match.series_id === "76ae85e2-88e5-4e99-83e4-5f352108aebc").map(match => {
                const scoreData = match.score ? match.score : null;
                if(scoreData && scoreData.length > 0) {
                    const score = scoreData.map(score => `${score.inning}: ${score.r}/${score.w} in ${score.o} Overs`).join('<br>');
                    return `${match.name}<br>${match.status}<br>${score}`;
                } else {
                    return `${match.name}: Score data not available`;
                }
            });

            console.log({relevantData});

            document.getElementById("matches").innerHTML = relevantData.map(match => `<li>${match}</li>`).join('');

            return relevantData;
        })
        .catch(e => console.log(e));
}

getMatchData();
