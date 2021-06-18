// EVENTS NOW PUSHING THE IDs TO ARRAYS, BUT THE WRONG WAY AROUND //

const PlayerFactory = (name, mark) => {

    let playerArr = [] 

    const playerName = () => {
        return name
    }
    
    const arr = () => {
        return playerArr
    }
    const getMark = () => { 
        return mark
    }

return { arr, getMark, playerName }

}


const gameLogic = (() => {

    const playerX = PlayerFactory("Player X", "X")
    const playerO = PlayerFactory("Player O", "O")
    let _currentPlayer = playerX
    //const winnersName = gameLogic.currentPlayer().playerName()

    const currentPlayer = () => {
        return _currentPlayer
    }

    const getPlayer = () => {
        return _currentPlayer === playerX ? _currentPlayer = playerO : _currentPlayer = playerX
    }



    

   // const winningCombos = [
        const top = ["1", "2", "3"] 
        const midH = ["4", "5", "6"]
        const bottom = ["7", "8", "9"]
        const left = ["1", "4", "7"]
        const midV = ["2", "5", "8"]
        const right = ["3", "6", "9"]
        const upDiag = ["7", "5", "3"]
        const downDiag = ["1", "5", "9"]
   // ];

    const checkWinner = () => {
    //for (let i = 0; i < winningCombos.length; i++){
       // const combos = winningCombos[i]
        let result = midH.every((combo) => _currentPlayer.arr().includes(combo))   ||
                     top.every((combo) => _currentPlayer.arr().includes(combo))    ||
                     bottom.every((combo) => _currentPlayer.arr().includes(combo)) ||
                     left.every((combo) => _currentPlayer.arr().includes(combo))   ||
                     midV.every((combo) => _currentPlayer.arr().includes(combo))   ||
                     right.every((combo) => _currentPlayer.arr().includes(combo))  ||
                     upDiag.every((combo) => _currentPlayer.arr().includes(combo)) ||
                     downDiag.every((combo) => _currentPlayer.arr().includes(combo)) 
        return result ? alert(`${currentPlayer().playerName()} WINS!`) : null;
    }
   // }    
return { playerX, playerO, currentPlayer, getPlayer, checkWinner }    

})()


const board = (() => {

    const playerArr = () => {
        return gameLogic.getPlayer().arr()
    }

    const checkForWinner = () => {
        return gameLogic.checkWinner()
    }

    const playerMark = () => {
        return gameLogic.getPlayer().getMark()
    }

    const tiles = document.querySelectorAll(".tile")
    tiles.forEach((tile) => tile.addEventListener("click", (e) => {
        if (e.target.textContent !== "X" && e.target.textContent !== "O"){
            e.target.textContent = playerMark()
            gameLogic.getPlayer()
            playerArr().push(`${e.target.id}`)
            gameLogic.getPlayer()
            console.log('Success!')
            console.log(playerArr())
            console.log(checkForWinner())
        } 
        return
    }))

})()