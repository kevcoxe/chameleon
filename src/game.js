const uuid = require('uuid')

const InitialStatus = 'created'
const StartedStatus = 'started'
const FinishedStatus = 'finished'

class Game {
    constructor({ players, wordList, chameleon, category, status }={}) {

        this.id = uuid.v1();
        this.players = players || []
        this.wordList = wordList || []
        this.chameleon = chameleon || null
        this.category = category || null
        this.status = status || InitialStatus
    }

    exportToJSON() {
        return {
            id: this.id,
            players: this.players,
            wordList: this.wordList,
            chameleon: this.chameleon,
            category: this.category,
            status: this.status,
        }
    }

    exportToString() {
        return JSON.stringify(this.exportToJSON())
    }

    loadFromJSON({ id, players, wordList, chameleon, category, status }) {
        this.id = id
        this.players = players
        this.wordList = wordList
        this.chameleon = chameleon
        this.category = category
        this.status = status
    }

    loadFromString(inputString) {
        this.loadFromJSON(JSON.parse(inputString))
    }

    addPlayer(name) {
        const player = {
            id: uuid.v1(),
            name: name
        }

        this.players.push(player)

        return player
    }

    startGame() {
        if (this.players.length <= 0) return false
        if (this.status !== InitialStatus) return false

        this.chameleon = this.players[Math.floor(Math.random()*this.players.length)]
        this.category = this.wordList[Math.floor(Math.random()*this.wordList.length)]
        this.status = StartedStatus
    }

    endGame() {
        if (this.status !== StartedStatus) return false

        this.status = FinishedStatus
    }
}


module.exports = {
    Game
}