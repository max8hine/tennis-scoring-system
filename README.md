<!-- State pattern -->

# tennis-scoring-system

## Requirement

- NodeJS >=12.18.2


## Verifying

1. Update `index.js`

2. Run `npm start`, results will output in the terminal
	 >  e.g. \
	 > 0-0, 15-15 \
	 > 0-0, 40-15 \
	 > 0-0, Deuce \
	 > 0-0, Advantage player 1 \
	 > 1-0

## Testing

1. `npm install`
2. `npm run test`


## Reference
- [Finite-state machine](https://en.wikipedia.org/wiki/Finite-state_machine), I have initially tried to use this design pattern to manage all the state changes, but eventually realize this task isn't a good fit of this task.
- [Strategy pattern](https://en.wikipedia.org/wiki/Strategy_pattern)
- [yii Behavior Class Doc](https://www.yiiframework.com/doc/api/2.0/yii-base-behavior) 
- [tennis-score](https://github.com/ben196888/tennis-score), only referenced this when I was struggle to implement the strategy pattern.