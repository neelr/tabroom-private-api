var express = require("express")
var tools = require("./routes")
var app = express();
app.use(express.json())

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/public/index.html")
})

app.post("/api/query", (req,res) => {
    tools.query(req.body.query)
        .then((d) => {
            res.send(d)
        })
})
app.post("/api/tournament/tabs", (req,res) => {
    tools.getTabs(req.body.tourn_id)
        .then((d) => {
            res.send(d)
        })
})
app.post("/api/tournament/events", (req,res) => {
    tools.fetchEvents(req.body.tourn_id)
        .then((d) => {
            res.send(d)
        })
})
app.post("/api/tournament/pairings", (req,res) => {
    tools.getPairings(req.body.tourn_id,req.body.round_id)
        .then((d) => {
            res.send(d)
        })
})
app.post("/api/tournament/rounds", (req,res) => {
    tools.getRounds(req.body.tourn_id,req.body.event_id)
        .then((d) => {
            res.send(d)
        })
})
app.post("/api/tournament/paradigm", (req,res) => {
    tools.getParadigm(req.body.tourn_id,req.body.judge_id)
        .then((d) => {
            res.send(d)
        })
})
app.post("/api/tournament/get", (req,res) => {
    tools.getTournament(req.body.tourn_id)
        .then((d) => {
            res.send(d)
        })
})

app.listen(3000, () => console.log("Listening on port 3000!"))