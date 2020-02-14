var axios = require("axios")
var qs = require("qs")
var cheerio = require("cheerio")
var url = require('url');
var reg = /\=(.*?)\;/
const getToken = (user, pass) => {
    return new Promise((res, rej) => {
        axios({
            method: "POST",
            url: "https://www.tabroom.com/user/login/login_save.mhtml",
            data: qs.stringify({ "maxRedirects": 0, "username": user, "password": pass }),
            maxRedirects: 0
        })
            .catch((data) => {
                res({ token: reg.exec(data.response.headers["set-cookie"][4])[1] })
            })
    })
}
const query = (search) => {
    return new Promise((solve, rej) => {
        axios.get("https://www.tabroom.com/index/search.mhtml?search=" + search)
            .then((d) => {
                res = [];
                var query = cheerio.load(d.data)
                query("tbody").each((_, table) => {
                    query(table).children().map((_, row) => {
                        var tournament = {}
                        query(row).children().map((idx, desc) => {
                            if (idx != 0) {
                                var col = desc.children[0].data.trim().replace(/\n/g, '').replace(/\t/g, ' ');
                                switch (idx) {
                                    case 1:
                                        tournament.name = desc.children[1].children[0].data.trim()
                                        tournament.id = desc.children[1].attribs.href.split("/index/tourn/index.mhtml?tourn_id=")[1]
                                    case 2:
                                        tournament.circuit = col
                                    case 3:
                                        tournament.region = col
                                    case 4:
                                        tournament.data = col
                                }
                            }
                        })
                        res.push(tournament)
                    })
                })
                solve(res)
            })
    })
}
var getTabs = id => {
    return new Promise((solve, rej) => {
        axios.get("https://www.tabroom.com/index/tourn/index.mhtml?tourn_id=" + id)
            .then(d => {
                res = []
                var query = cheerio.load(d.data)
                query("#tabnav").children().map((_, li) => {
                    res.push(li.children[1].children[0].data.trim())
                })
                solve(res)
            })
    })
}
var fetchEvents = id => {
    return new Promise(res => {
        axios.get("https://www.tabroom.com/index/tourn/fields.mhtml?tourn_id=" + id)
            .then(d => {
                var rounds = []
                var query = cheerio.load(d.data)
                query(".sidenote").children().map((_, v) => {
                    if (v.attribs.href) {
                        rounds.push({ eventName: v.children[0].data.trim(), eventID: v.attribs.href.split("/index/tourn/fields.mhtml?tourn_id=" + id + "&event_id=")[1] })
                    }
                })
                res(rounds)
            })
    })
}
var getPairings = (tournament, round) => {
    return new Promise(solve => {
        axios.get(`https://www.tabroom.com/index/tourn/postings/round.mhtml?tourn_id=${tournament}&round_id=${round}`)
            .then((d) => {
                res = [];
                head = []
                var id = "";
                var query = cheerio.load(d.data)
                query('thead > tr > th').toArray().map((item, i) => {
                    head.push(query(item).text().trim())
                });
                query('tbody > tr').toArray().map((item, i) => {
                    res[i] = {}
                    cheerio.load(item)('tr > td').toArray().map((item, _) => {
                        cheerio.load(item)("a").toArray().map(x => {
                            id = x.attribs.href.trim()
                            id = url.parse(id, true).query
                            delete id["tourn_id"]
                            id = Object.values(id)[0]
                        })
                        res[i][head[_]] = { name: query(item).text().trim().replace(/\n/g, '').replace(/\t/g, ' '), id: id };
                    });
                });
                solve(res)
            })
    })
}
var getRounds = (tourn, event) => {
    return new Promise(solve => {
        axios({ url: "https://www.tabroom.com/index/tourn/postings/index.mhtml", method: "POST", data: qs.stringify({ tourn_id: tourn, event_id: event }) })
            .then(d => {
                var rounds = []
                var query = cheerio.load(d.data)
                query(".sidenote").children().map((_, v) => {
                    if (v.attribs.href) {
                        rounds.push({
                            roundName: v.children[0].data.trim().replace(/\n/g, '').replace(/\t/g, ' '), roundID: v.attribs.href.split("/index/tourn/postings/round.mhtml?tourn_id=" +
                                tourn + "&round_id=")[1]
                        })
                    }
                })
                solve(rounds)
            })
    })
}
var getParadigm = (tourn, judge) => {
    return new Promise(solve => {
        axios.get(`https://www.tabroom.com/index/tourn/postings/judge.mhtml?judge_id=${judge}&tourn_id=${tourn}`)
            .then(d => {
                var query = cheerio.load(d.data)
                solve(query(".paradigm").html())
            })
    })
}
module.exports = {
    getToken: getToken,
    query: query,
    getTabs: getTabs,
    fetchEvents: fetchEvents,
    getPairings: getPairings,
    getRounds: getRounds,
    getParadigm:getParadigm
}