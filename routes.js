var axios = require("axios")
var qs = require("qs")
var cheerio = require("cheerio")
var reg = /\=(.*?)\;/

const getToken = (user, pass) => {
    return new Promise((res,rej) => {
        axios({ 
            method:"POST",
            url:"https://www.tabroom.com/user/login/login_save.mhtml", 
            data:qs.stringify({ "maxRedirects": 0, "username": user, "password": pass}),
            maxRedirects:0
        })   
        .catch((data) => {
            res({token:reg.exec(data.response.headers["set-cookie"][4])[1]})
        })
    })
}
const query = (search) => {
    return new Promise((solve,rej) => {
        axios.get("https://www.tabroom.com/index/search.mhtml?search="+search)
            .then((d) => {
                res = {};
                var query = cheerio.load(d.data)
                query("tbody").each((_, table) => {
                    query(table).children().map((_,row) => {
                        var name = "";
                        query(row).children().map((idx,desc) => {
                            if (idx == 1) {
                                name = desc.children[1].children[0].data.trim()
                                res[name] = {
                                    id:desc.children[1].attribs.href.split("/index/tourn/index.mhtml?tourn_id=")[1]
                                }
                            } else if (idx != 0){
                                var col = desc.children[0].data.trim().replace(/\n/g,'').replace(/\t/g,' ');
                                switch (idx) {
                                    case 2:
                                        res[name].circuit = col
                                    case 3:
                                        res[name].region = col
                                    case 4:
                                        res[name].data = col
                                }
                            }
                        })
                    })
                })
                solve(res)
            })
            })
}