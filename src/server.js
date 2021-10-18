
require('dotenv').config()
const { setupGameGame } = require('./gameUtils')



const main = async () => {
    await setupGameGame()
    // connect to db and check if game is started

    // if started get players
    // else start a new game

}
main()