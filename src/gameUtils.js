
require('dotenv').config()
const uuid = require('uuid');
const { getAsync, setAsync } = require('./redisConfig.js')

const generateRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const addPlayer = async (playerInfo) => {
    const gameId = await getAsync('currentGameId')
    if (!gameId) {
        return false
    }

    const gameInfo = await getCurrentGameInfo()
    if (!gameInfo) {
        return false
    }

    gameInfo.playerList.push(playerInfo)
    await setGameInfo(gameId, gameInfo)
}

const generatePlayers = (numPlayers) => {
    let playerList = []
    for (let i = 0; i < numPlayers; i++) {
        playerList.push({
            name: `Player${i}`,
            id: uuid.v1()
        })
    }
    return playerList
}

const createPlayer = (username) => {
    return {
        username,
        id: uuid.v1()
    }
}

const getCurrentGameInfo = async () => {
    const gameId = await getAsync('currentGameId')
    if (!gameId) {
        return false
    }

    return await getGameInfo(gameId)
}

const getGameInfo = async (gameId) => {
    const gameInfo = await getAsync(gameId)
    if (!gameInfo) {
        return false
    }

    return JSON.parse(gameInfo)
}

const setGameInfo = async (gameId, gameInfo) => {
    await setAsync(gameId, JSON.stringify(gameInfo))
}

const getWord = async (playerId) => {
    const gameInfo = await getCurrentGameInfo()
    if (!gameInfo) {
        return false
    }

    const chameleon = gameInfo.chameleon
    if (chameleon && chameleon.id != playerId) {
        return gameInfo.word
    } else {
        return 'You are the chameleon'
    }
}


const setupGameGame = async (playerList = []) => {
    // generate uuid
    const gameId = uuid.v1();
    const wordList = [
        ['word11', 'word12', 'word13', 'word14', 'word15'],
        ['word21', 'word22', 'word23', 'word24', 'word25'],
        ['word31', 'word32', 'word33', 'word34', 'word35'],
        ['word41', 'word42', 'word43', 'word44', 'word45'],
        ['word51', 'word52', 'word53', 'word54', 'word55'],
    ]
    const wordCol = generateRandomNumber(0, 5)
    const wordRow = generateRandomNumber(0, 5)

    const gameInfo = {
        id: gameId,
        playerList,
        wordList,
        wordCol,
        wordRow,
        chameleon: null
    }
    gameInfo.word = gameInfo.wordList[gameInfo.wordCol][gameInfo.wordRow]

    await setGameInfo(gameId, gameInfo)
    await setAsync('currentGameId', gameId)
}


const startGame = async (gameId) => {
    const gameInfo = await getGameInfo(gameId)
    if (!gameInfo) {
        return false
    }

    // pick a chameleon
    console.log(gameInfo)
    const chameleonIndex = generateRandomNumber(0, gameInfo.playerList.length - 1)
    const chameleon = gameInfo.playerList[chameleonIndex]

    gameInfo.chameleon = chameleon
    await setGameInfo(gameId, gameInfo)
}


module.exports = {
    createPlayer,
    addPlayer,
    generateRandomNumber,
    generatePlayers,
    getCurrentGameInfo,
    getGameInfo,
    getWord,
    setupGameGame,
    startGame
}