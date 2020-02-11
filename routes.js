var axios = require("axios")
var qs = require("qs")
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