
require('dotenv').config()
const { loadGame, createGame, joinGame, startGame, endGame } = require('./src/gameUtils')

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


const main = async () => {
    const gameid = await createGame({ wordList: jobList })

    // load players

    for (let i = 0; i < players.length; i++) {
        await joinGame(gameid, players[i])
    }

    await startGame(gameid)
    await endGame(gameid)

    console.log(await loadGame(gameid))

}

(async () => {
    try {
        await main()
    } catch (e) {
        console.log(e)
    }
})()
