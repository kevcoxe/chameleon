
require('dotenv').config()
const { getAsync, setAsync } = require('./redisConfig.js')
const { Game } = require('./game')


const saveGame = async (gameId, gameDataString) => {
    await setAsync(gameId, gameDataString)
}

const loadGame = async (gameId) => {
    const gameDataString = await getAsync(gameId)
    const newGame = new Game()
    newGame.loadFromString(gameDataString)
    return newGame
}

const createGame = async (gameData) => {
    const game = new Game(gameData)
    await saveGame(game.id, game.exportToString())
    return game.id
}

const joinGame = async (gameId, username) => {
    const game = await loadGame(gameId)
    game.addPlayer(username)

    await saveGame(game.id, game.exportToString())
}

const startGame = async (gameId) => {
    const game = await loadGame(gameId)
    game.startGame()
    await saveGame(game.id, game.exportToString())
    return game
}

const endGame = async (gameId) => {
    const game = await loadGame(gameId)
    game.endGame()
    await saveGame(game.id, game.exportToString())
    return game
}


module.exports = {
    saveGame,
    loadGame,
    createGame,
    joinGame,
    startGame,
    endGame,
}