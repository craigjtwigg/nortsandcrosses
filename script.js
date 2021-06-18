// I NAMED IT 'NOUGHTS & CROSSES' BECAUSE THATS WHAT IT'S CALLED OVER HERE IN MERRY ENGLAND, OKAY? OKAY. ENJOY //

// FACTORY FUNCTION TO PRODUCE THE PLAYER OBJECTS //

const PlayerFactory = (name, mark) => {

/* THE ID OF EACH TILE THE CHECKED WILL BE PUSHED TO THE CURRENT PLAYERS ARRAY. 
IT WILL BE TESTED AGAINST WINNING EACH COMBO TO CHECK FOR A WINNER */

  let playerArr = []; 

  const playerName = () => {
    return name;
  };

  const arr = () => {
    return playerArr;
  };
  const getMark = () => {
    return mark;
  };

  return { arr, getMark, playerName };
};

// GAME LOGIC FUNCTION //

const gameLogic = (() => {
  const playerX = PlayerFactory("Player X", "X");
  const playerO = PlayerFactory("Player O", "O");
  let _currentPlayer = playerX;

  const currentPlayer = () => {
    return _currentPlayer;
  };

  // METHOD TO SWITCH FROM PLAYER X TO PLAYER O AFTER EACH ROUND // 

  const getPlayer = () => {
    return _currentPlayer === playerX
      ? (_currentPlayer = playerO)
      : (_currentPlayer = playerX);
  };

  // WINNING COMBINATIONS, EACH TO BE CHECKED AGAINST THE CURRENT PLAYERS ARRAY AT THE END OF EACH ROUND //

  const top = ["1", "2", "3"];
  const midH = ["4", "5", "6"];
  const bottom = ["7", "8", "9"];
  const left = ["1", "4", "7"];
  const midV = ["2", "5", "8"];
  const right = ["3", "6", "9"];
  const upDiag = ["7", "5", "3"];
  const downDiag = ["1", "5", "9"];

  const checkWinner = () => {
    let result =
      midH.every((combo) => _currentPlayer.arr().includes(combo)) ||
      top.every((combo) => _currentPlayer.arr().includes(combo)) ||
      bottom.every((combo) => _currentPlayer.arr().includes(combo)) ||
      left.every((combo) => _currentPlayer.arr().includes(combo)) ||
      midV.every((combo) => _currentPlayer.arr().includes(combo)) ||
      right.every((combo) => _currentPlayer.arr().includes(combo)) ||
      upDiag.every((combo) => _currentPlayer.arr().includes(combo)) ||
      downDiag.every((combo) => _currentPlayer.arr().includes(combo));
    return result ?  resetGame() : null;
  };

  const resetGame = () => {
    alert(`${currentPlayer().playerName()} WINS`)  
    board.resetBoard()
    playerX.arr = []  
    playerO.arr = []
    console.log(playerX.arr)
    console.log(playerO.arr)
    getPlayer()
}

  return { playerX, playerO, currentPlayer, getPlayer, checkWinner };
})();

// BOARD RELATED METHODS AND EVENTS WITHIN THIS FUNCTION //

const board = (() => {
  const playerArr = () => {
    return gameLogic.getPlayer().arr();
  };

  const checkForWinner = () => {
    return gameLogic.checkWinner();
  };

  const playerMark = () => {
    return gameLogic.getPlayer().getMark();
  };

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) =>
    tile.addEventListener("click", (e) => {
      if (e.target.textContent !== "X" && e.target.textContent !== "O") {
        e.target.textContent = playerMark();
        gameLogic.getPlayer();
        playerArr().push(`${e.target.id}`);
        gameLogic.getPlayer();
        console.log("Success!");
        console.log(playerArr());
        console.log(checkForWinner());
      }
      return;
    })
  );
  const resetBoard = () => { tiles.forEach(tile => tile.textContent = "") }
  return { resetBoard }
})();
