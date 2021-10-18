require('dotenv').config()
const { createPlayer, addPlayer, getCurrentGameInfo, getWord, startGame } = require('./gameUtils')


const main = async () => {
    const me = createPlayer('kevcoxe')
    await addPlayer(me)

    // start game
    await startGame(gameInfo.id)

    // show stuff
    let gameInfo = await getCurrentGameInfo()
    console.log(gameInfo)

    if (gameInfo) {
        gameInfo.playerList.map(async (player) => {
            let word = await getWord(player.id)
            console.log(word)
        })
    }

}
main()