class ScoreBehavior {
  constructor(p1, p2) {
    this.p1 = p1 || "Player 1";
    this.p2 = p2 || "Player 2";

    this.scoreP1 = 0;
    this.scoreP2 = 0;
  }
  get score() {
    const { scoreP1, scoreP2 } = this;

    if ([scoreP1, scoreP2].every((s) => s === 0)) return "";
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
    return [scoreP1, scoreP2].every((s) => s === 3);
  }

  get score() {
    const { scoreP1, scoreP2 } = this;

    const unStart = [scoreP1, scoreP2].every((s) => s === 0);
    if (unStart) return "";
    return `${this.#states[scoreP1]}-${this.#states[scoreP2]}`;
  }
};

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

module.exports = {
  ScoreBehavior,
  PointBehavior,
  DeuceBehavior,
  TieBreakBehavior,
};