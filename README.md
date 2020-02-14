# [tabroom-private-api](https://tabroom-private-api.now.sh/api/query)
An API whipped up using tabroom's private api, because it took to long for them to give a public one! Have fun and make cool things!

ALL POST REQUESTS

## /api/query
Query tabroom's tournaments
### Request
```json
{
  "query":"scu"
}
```

### Response
```json
[
  {
    "name": "SCU Spring Philalethic Invitational",
    "id": "15411",
    "circuit": "GGSA, NatCir, YFL",
    "region": "Santa Clara      CA/US",
    "data": "3/27/2020"
  },
  {
    "name": "SCU Dempsey Cronin Invitational",
    "id": "13422",
    "circuit": "GGSA, NatCir",
    "region": "Santa Clara      CA/US",
    "data": "11/22/2019"
  },
  {
    "name": "SCU Dempsey Cronin Invitatonal",
    "id": "10646",
    "circuit": "GGSA, NatCir",
    "region": "Santa Clara      CA/US",
    "data": "12/14/2018"
  }
]
```

## /api/tournament/tabs
Get the tabs at the top of a tabroom tournament

### Request
```json
{
	"tourn_id":"10646"
}
```

### Response
```json
[
  "Invite",
  "Entries",
  "Judges",
  "Pairings",
  "Live Updates",
  "Results"
]
```

## /api/tournament/events
Get the tournament rounds
### Request
```json
{
	"tourn_id":"10646"
}
```

### Response
```json
[
  {
    "eventName": "Congress",
    "eventID": "87888"
  },
  {
    "eventName": "Dramatic Interp Novice",
    "eventID": "87889"
  },
  {
    "eventName": "Dramatic Interp Open",
    "eventID": "87890"
  },
  {
    "eventName": "Duo Novice",
    "eventID": "87891"
  }
]
```

## /api/tournament/rounds
Get the event rounds
### Request
```json
{
	"tourn_id":"10646",
  "event_id":"87910"
}
```

### Response
```json
[
  {
    "roundName": "Bracket"
  },
  {
    "roundName": "POL        Final",
    "roundID": "341486"
  },
  {
    "roundName": "POL        Semi",
    "roundID": "341485"
  }
]
```

## /api/tournament/pairings
Get the event rounds
### Request
```json
{
	"tourn_id":"10646",
  "round_id":"341480"
}
```

### Response
```json
[
  {
    "Room": {
      "name": "Charney 316"
    },
    "Aff": {
      "name": "Gunn Sr CT",
      "id": "1959685"
    },
    "Neg": {
      "name": "June Jordan School for Equity HR",
      "id": "2032750"
    },
    "Judge": {
      "name": "Hemeseth, Paul",
      "id": "934690"
    },
    "Bkt": {
      "name": "1",
      "id": "934690"
    }
  }
]
```
## /api/tournament/paradigm
Get the event rounds
### Request
```json
{
	"tourn_id":"10646",
  "judge_id":"960933"
}
```

### Response
```json
<p>Judge's Paradigm in HTML</p>
```


