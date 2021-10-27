
require('dotenv').config()
const { loadGame, createGame, joinGame, startGame, endGame } = require('./src/gameUtils')

const express = require('express')
const app = express()
app.use(express.json());
const port = 3000


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



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/game/:gameid', async (req, res) => {
    const game = await loadGame(req.params.gameid)
    res.send(game.exportToJSON())
})

app.post('/newGame', async (req, res) => {
    const gameid = await createGame({wordList: jobList})
    res.send({
        gameID: gameid
    })
})

app.post('/joinGame/:gameid', async (req, res) => {
    await joinGame(req.params.gameid, req.body.username)
    const game = await loadGame(req.params.gameid)
    res.send(game.exportToJSON())
})

app.post('/startGame/:gameid', async (req, res) => {
    await startGame(req.params.gameid)
    const game = await loadGame(req.params.gameid)
    res.send(game.exportToJSON())
})

app.delete('/endGame/:gameid', async (req, res) => {
    await endGame(req.params.gameid)
    const game = await loadGame(req.params.gameid)
    res.send(game.exportToJSON())
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})