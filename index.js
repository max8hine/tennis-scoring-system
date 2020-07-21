class ScoreBehavior {
  constructor(p1, p2) {
    this.p1 = p1 || "Player 1";
    this.p2 = p2 || "Player 2";

    this.scoreP1 = 0;
    this.scoreP2 = 0;
  }
  get score() {
    const { scoreP1, scoreP2 } = this;

    const unStart = [scoreP1, scoreP2].every((s) => s === 0);
    if (unStart) return "";
    return `${scoreP1}-${scoreP2}`;
  }

  get winner() {
    return "";
  }

  get isDeuce() {
    return false;
  }

  pointWonBy(playerName) {
    const { p1, p2 } = this;
    const isPlayerExist = [p1, p2].includes(playerName);
    if (!isPlayerExist) return;
    if (p1 === playerName) return (this.scoreP1 += 1);
    if (p2 === playerName) return (this.scoreP2 += 1);
  }
}

class PointBehavior extends ScoreBehavior {
  #states = [0, 15, 30, 40];
  name = "PointBehavior";
  get winner() {
    const { scoreP1, scoreP2, p1, p2 } = this;
    if (scoreP1 === 4) return p1;
    if (scoreP2 === 4) return p2;
    return "";
  }

  get isDeuce() {
    const { scoreP1, scoreP2 } = this;
    console.log(scoreP1);
    console.log(scoreP2);
    return [scoreP1, scoreP2].every((s) => s === 3);
  }

  get score() {
    const { scoreP1, scoreP2 } = this;

    const unStart = [scoreP1, scoreP2].every((s) => s === 0);
    if (unStart) return "";
    return `${this.#states[scoreP1]}-${this.#states[scoreP2]}`;
  }
}

class DeuceBehavior extends ScoreBehavior {
  name = "DeuceBehavior";
  get score() {
    const { scoreP1, scoreP2, p1, p2 } = this;
    if (scoreP1 === scoreP2) {
      return "Deuce";
    }
    if (scoreP1 > scoreP2) {
      return `Advantage ${p1}`;
    }
    return `Advantage ${p2}`;
  }

  get winner() {
    const { scoreP1, scoreP2, p1, p2 } = this;
    const margin = scoreP1 - scoreP2;
    if (Math.abs(margin) >= 2) {
      if (margin > 0) return p1;
      return p2;
    }
    return "";
  }
}

class TieBreakBehavior extends ScoreBehavior {
  name = "TieBreakBehavior";
  get winner() {
    const { scoreP1, scoreP2, p1, p2 } = this;
    if (scoreP1 >= 7 || scoreP2 >= 7) {
      const margin = scoreP1 - scoreP2;
      if (Math.abs(margin) === 2) {
        if (margin === 2) return p1;
        return p2;
      }
    }
    return "";
  }
}

class Match extends ScoreBehavior {
  constructor(p1, p2) {
    super(p1, p2);
    this.scoreBehavior = new PointBehavior(p1, p2);
  }

  get winner() {
    const { scoreP1, scoreP2, p1, p2 } = this;
    if (scoreP1 === 6 || scoreP2 === 6) {
      const margin = scoreP1 - scoreP2;
      if (Math.abs(margin) >= 2) {
        if (margin > 0) return p1;
        return p2;
      }
    }

    if (scoreP1 === 7) return p1;
    if (scoreP2 === 7) return p2;
    return "";
  }

  get isTieBreak() {
    return [this.scoreP1, this.scoreP2].every((s) => s === 6);
  }

  pointWonBy(playerName) {
    const { p1, p2 } = this;
    this.scoreBehavior.pointWonBy(playerName);
    if (
      this.scoreBehavior.name === "PointBehavior" &&
      this.scoreBehavior.isDeuce
    ) {
      this.scoreBehavior = new DeuceBehavior(p1, p2);
      return;
    }
    if (this.scoreBehavior.winner) {
      if ((playerName === p1)) this.scoreP1 += 1;
      if ((playerName === p2)) this.scoreP2 += 1;

      if (this.isTieBreak) {
        this.scoreBehavior = new TieBreakBehavior(p1, p2);
      } else {
        this.scoreBehavior = new PointBehavior(p1, p2);
      }
    }
  }

  score() {
    const { scoreP1, scoreP2, scoreBehavior } = this;
    const setScore = `${scoreP1}-${scoreP2}`;
    const gameScore = scoreBehavior.score;
    if (gameScore === "") return setScore;
    return `${setScore}, ${gameScore}`;
  }
}

let match = new Match("player 1", "player 2");

match.pointWonBy("player 1");
match.pointWonBy("player 1");
match.pointWonBy("player 1");
// match.pointWonBy("player 1");
// match.pointWonBy("player 1");

match.pointWonBy("player 2");
match.pointWonBy("player 2");
match.pointWonBy("player 2");
match.pointWonBy("player 2");
match.pointWonBy("player 1");
match.pointWonBy("player 2");
match.pointWonBy("player 2");



// match.pointWonBy("player 2");
// match.pointWonBy("player 2");

// match.pointWonBy("player 2");

// match.pointWonBy("player 2");

console.log(match.score());
