const Match = require("./index");

const p1 = "Player A";
const p2 = "Player B";

function setToDeuce(matchInstance) {
  // Won point 0
  matchInstance.pointWonBy(p1);
  matchInstance.pointWonBy(p2);
  // Won point 1
  matchInstance.pointWonBy(p1);
  matchInstance.pointWonBy(p2);
  // Won point 3
  matchInstance.pointWonBy(p1);
  matchInstance.pointWonBy(p2);
  // Won point 3
  matchInstance.pointWonBy(p1);
  matchInstance.pointWonBy(p2);
}

function winAGame(matchInstance, player) {
	matchInstance.pointWonBy(player);
	matchInstance.pointWonBy(player);
	matchInstance.pointWonBy(player);
	matchInstance.pointWonBy(player);
}

describe("The first player to have won at least 4 points in total and at least 2 points more than the opponent", () => {
  test(`Should ${p1} not win, if the score less than 4 points`, () => {
    const match = new Match(p1, p2);
    match.pointWonBy(p1);
    match.pointWonBy(p1);
    match.pointWonBy(p1);
    expect(match.score()).toBe("0-0, 40-0");
  });
  test(`Should ${p2} not win, if the score less than 4 points`, () => {
    const match = new Match(p1, p2);
    match.pointWonBy(p2);
    match.pointWonBy(p2);
    match.pointWonBy(p2);
    expect(match.score()).toBe("0-0, 0-40");
  });
  test(`Should ${p1} won the game who have won at least 4 points and 2 points more than the opponent`, () => {
    const match = new Match(p1, p2);
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
    match.pointWonBy(p1);
    expect(match.score()).toBe("1-0");
  });
  test(`Should ${p2} won the game who have won at least 4 points and 2 points more than the opponent`, () => {
    const match = new Match(p1, p2);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    match.pointWonBy(p2);
    expect(match.score()).toBe("0-1");
  });
});

describe("Scores from 0 to 3 points are described as 0, 15, 30, 40, respectively", () => {
	const match = new Match(p1, p2);
	test(`Should the winning point be substituted '15'`, () => {
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    expect(match.score()).toBe("0-0, 15-15");
	});
	test(`Should the winning point be substituted '30'`, () => {
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    expect(match.score()).toBe("0-0, 30-30");
	});
	test(`Should the winning point be substituted '40'`, () => {
    match.pointWonBy(p1);
    expect(match.score()).toBe("0-0, 40-30");
  });
});

describe("If at least 3 points have been scored by each player, and the scores are equal, the score is 'Deuce'", () => {
  test(`Should be 'Deuce' after each player has won 3 points`, () => {
    const match = new Match(p1, p2);
    setToDeuce(match);
    expect(match.score()).toBe("0-0, Deuce");
  });
  test(`Should be 'Advantage ${p1}'`, () => {
    const match = new Match(p1, p2);
    setToDeuce(match);
    match.pointWonBy(p1);
    expect(match.score()).toBe(`0-0, Advantage ${p1}`);
  });
  test(`Should be 'Advantage ${p2}'`, () => {
    const match = new Match(p1, p2);
    setToDeuce(match);
    match.pointWonBy(p2);
    expect(match.score()).toBe(`0-0, Advantage ${p2}`);
  });
  test(`Should back to 'Deuce' if ${p1} lose the next point`, () => {
    const match = new Match(p1, p2);
    setToDeuce(match);
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    expect(match.score()).toBe(`0-0, Deuce`);
  });
  test(`Should back to 'Deuce' if ${p2} lose the next point`, () => {
    const match = new Match(p1, p2);
    setToDeuce(match);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
    expect(match.score()).toBe(`0-0, Deuce`);
  });
  test(`Should ${p1} won the game if the score is tied`, () => {
    const match = new Match(p1, p2);
    setToDeuce(match);
    match.pointWonBy(p1);
    match.pointWonBy(p1);
    expect(match.score()).toBe(`1-0`);
  });
  test(`Should ${p2} won the game if the score is tied`, () => {
    const match = new Match(p1, p2);
    setToDeuce(match);
    match.pointWonBy(p2);
    match.pointWonBy(p2);
    expect(match.score()).toBe(`0-1`);
  });
});

describe("Winning a set", () => {
	test(`Should wins a set by winning at least 6 games and at least 2 games more than the opponent`, () => {
		const match = new Match(p1, p2);
		Array(6).fill(null).forEach(() => {
			winAGame(match, p1);
		})
		expect(match.score()).toBe(`0-0`);
	})
	test(`Should not wins a set if won less 2 games more than the opponent`, () => {
    const match = new Match(p1, p2);
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
      });
    Array(5)
      .fill(null)
      .forEach(() => {
        winAGame(match, p2);
      });
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
      });
    expect(match.score()).toBe(`6-5`);
	});
	test(`Should not wins a set if won less 2 games more than the opponent`, () => {
    const match = new Match(p1, p2);
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
      });
    Array(5)
      .fill(null)
      .forEach(() => {
        winAGame(match, p2);
      });
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
			});
    expect(match.score()).toBe(`6-5`);
	});
	test(`Should won the set if games score is 6-5 and leading player wins the additional game `, () => {
    const match = new Match(p1, p2);
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
      });
    Array(5)
      .fill(null)
      .forEach(() => {
        winAGame(match, p2);
      });
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
			});
		winAGame(match, p1);
    expect(match.score()).toBe(`0-0`);
  });
});

describe("A Tie-break is played", () => {
	test(`Should in the Tie-break if 6-6`, () => {
    const match = new Match(p1, p2);
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
      });
    Array(5)
      .fill(null)
      .forEach(() => {
        winAGame(match, p2);
      });
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
			});
		winAGame(match, p2);
		expect(match.score()).toBe(`6-6`);
		match.pointWonBy(p2)
		match.pointWonBy(p2);
		expect(match.score()).toBe(`6-6, 0-2`);
	});
	test(`Should win a Tie-break as well as the set if the leading play have won 7 points by a margin of 2 or more points`, () => {
    const match = new Match(p1, p2);
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
      });
    Array(5)
      .fill(null)
      .forEach(() => {
        winAGame(match, p2);
      });
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
      });
		winAGame(match, p2);
		// 
    winAGame(match, p1);
    winAGame(match, p2);
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
		match.pointWonBy(p1);
    expect(match.score()).toBe(`0-0`);
	});
	test(`Should not win a tie-break if the margin is less than 2`, () => {
    const match = new Match(p1, p2);
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
      });
    Array(5)
      .fill(null)
      .forEach(() => {
        winAGame(match, p2);
      });
    Array(3)
      .fill(null)
      .forEach(() => {
        winAGame(match, p1);
      });
		winAGame(match, p2);
		// 
    winAGame(match, p1);
		winAGame(match, p2);
		match.pointWonBy(p1);
		match.pointWonBy(p2);
		match.pointWonBy(p1);
		match.pointWonBy(p2);
		match.pointWonBy(p1);
    match.pointWonBy(p2);
    match.pointWonBy(p1);
		match.pointWonBy(p2);
    match.pointWonBy(p2);
    expect(match.score()).toBe(`6-6, 8-9`);
  });
})