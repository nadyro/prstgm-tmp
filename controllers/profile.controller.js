var request = require('request-promise');
var summonerInfos = {};
exports.getSummoner = async function (req, res) {

    var api_url = "https://euw1.api.riotgames.com";
    var leagueSummonerUrl = api_url + '/lol/summoner/v4/summoners/by-name/';
    var api_key = 'RGAPI-c6cd3a59-d877-4f21-a0dc-485c4de86fca';
    console.log(req.body);
    var options = {
        uri: leagueSummonerUrl + req.body.summonerName,
        qs: {
            api_key: api_key
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    request(options)
        .then(function (results) {
            summonerInfos.summoner = results;
            var leagueSummonerLeagueUrl = api_url + '/lol/league/v4/entries/by-summoner/';
            var options_League = {
                uri: leagueSummonerLeagueUrl + summonerInfos.summoner.id,
                qs: {
                    api_key: api_key
                },
                headers: {
                    'User-Agent': 'Request-Promise',
                },
                json: true
            }
            request(options_League)
                .then(function (results) {
                    results.forEach(element => {
                        if (element.queueType === "RANKED_SOLO_5x5") {
                            summonerInfos.summonerLeague = results[results.indexOf(element)];
                        }
                    });
                    return (res.status(200).json({
                        status: 200,
                        summonerInfos: summonerInfos
                    }))
                })
                .catch(function (err) {
                    return (res.status(400).json({
                        status: 400,
                        message: 'Something went wrong',
                        error: err
                    }))
                    console.log(err);
                })
            console.log(summonerInfos);
        })
        .catch(function (err) {
            console.log(err);
        })
}