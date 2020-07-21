const Match = require("./match");
const log = console.info;

const match = new Match("player 1", "player 2");
match.pointWonBy("player 1");
match.pointWonBy("player 2");
// this will return "0-0, 15-15"
log(match.score());

match.pointWonBy("player 1");
match.pointWonBy("player 1");
// this will return "0-0, 40-15"
log(match.score());

match.pointWonBy("player 2");
match.pointWonBy("player 2");
// this will return "0-0, Deuce"
log(match.score());

match.pointWonBy("player 1");
// this will return "0-0, Advantage player 1"
log(match.score());

match.pointWonBy("player 1");
// this will return "1-0"
log(match.score());
