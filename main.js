
const { Game } = require('./game')

const jobList = [
    'fireman',
    'police',
    'teacher',
    'plumber',
    'student',
    'florist',
    'photographer',
    'lawyer',
    'fisherman',
    'streamer',
    'driver',
    'waitress',
    'nurse',
    'chiropractor',
    'salesman',
]


const players = [
    'maddie',
    'david',
    'bethany',
    'tommy',
    'jullie',
    'mom',
    'dad',
    'rebekah',
    'kevin'
]


const myGame = new Game({ wordList: jobList })

// load players
players.forEach((player) => myGame.addPlayer(player))

myGame.startGame()
myGame.endGame()
