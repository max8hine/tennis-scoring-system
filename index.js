const behaviors = require('./behaviors');

const {
  ScoreBehavior,
  PointBehavior,
  DeuceBehavior,
  TieBreakBehavior,
} = behaviors

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

module.exports = Match;