// I NAMED IT 'NOUGHTS & CROSSES' BECAUSE THATS WHAT IT'S CALLED OVER HERE IN MERRY ENGLAND, OKAY? OKAY. ENJOY //

// FACTORY FUNCTION TO PRODUCE THE PLAYER OBJECTS //

const PlayerFactory = (name, mark) => {
  /* THE ID OF EACH TILE THE CHECKED WILL BE PUSHED TO THE CURRENT PLAYERS ARRAY. 
  IT WILL BE TESTED AGAINST WINNING EACH COMBO TO CHECK FOR A WINNER */

  let playerArr = [];

  let score = 0;

  const playerName = () => {
    return name;
  };

  const arr = () => {
    return playerArr;
  };

  const resetArr = () => {
    playerArr = [];
  };

  const getMark = () => {
    return mark;
  };

  return { resetArr, arr, getMark, playerName, score, name };
};

// GAME LOGIC FUNCTION //

const gameLogic = (() => {
  const _playerX = PlayerFactory("Player X", "X");

  const _playerO = PlayerFactory("Player O", "O");

  console.log(_playerX.name)

    const popUpBlur = document.querySelector(".popblur")
    const _renameXtrigger = document.querySelector(".xName")
    const _renameXpop = document.querySelector("#renameXpop")
    _renameXtrigger.addEventListener("click", () => {
      _renameXpop.style.transform = "scale(1)";
      popUpBlur.style.transform = "scale(1)" 
    }
    )
    
    const _renameXsubmit = document.querySelector(".renameXsubmit")
    const _xName = document.querySelector(".xName")
    _renameXsubmit.addEventListener("click", (e) => {
      e.preventDefault();
      _playerX.name = document.querySelector(".renameXfield").value
      _xName.textContent = `${_playerX.name}`
      console.log(_playerX.name)
      _renameXpop.style.transform = "scale(0)";
      popUpBlur.style.transform = "scale(0)" 
  })

  const _renameOtrigger = document.querySelector(".oName")
  const _renameOpop = document.querySelector("#renameOpop")
  _renameOtrigger.addEventListener("click", () => {
    _renameOpop.style.transform = "scale(1)";
    popUpBlur.style.transform = "scale(1)" 
  }
  )
  
  const _renameOsubmit = document.querySelector(".renameOsubmit")
  const _oName = document.querySelector(".oName")
  _renameOsubmit.addEventListener("click", (e) => {
    e.preventDefault();
    _playerO.name = document.querySelector(".renameOfield").value
    _oName.textContent = `${_playerO.name}`
    console.log(_playerO.name)
    _renameOpop.style.transform = "scale(0)";
    popUpBlur.style.transform = "scale(0)" 
})


  let _currentPlayer = _playerX;

  const currentPlayer = () => {
    return _currentPlayer;
  };

  // METHOD TO SWITCH FROM PLAYER X TO PLAYER O AFTER EACH ROUND //

  const getPlayer = () => {
    return _currentPlayer === _playerX
      ? (_currentPlayer = _playerO)
      : (_currentPlayer = _playerX);
  };

  // KEEPING SCORE... //

  const _displayScores = () => {
    const _displayXScore = () => {
      const _xScore = document.querySelector(".xScore");
      return _xScore.textContent = `${_playerX.score}`;
    };

    const _displayOScore = () => {
      const _oScore = document.querySelector(".oScore");
      return _oScore.textContent = `${_playerO.score}`;
    };
    _displayXScore()
    _displayOScore()
  };
  const _scoreUp = () => {
    _currentPlayer.score++;
  };

  // WINNING COMBINATIONS, EACH TO BE CHECKED AGAINST THE CURRENT PLAYERS ARRAY AT THE END OF EACH ROUND //

  const _top = ["1", "2", "3"];
  const _midH = ["4", "5", "6"];
  const _bottom = ["7", "8", "9"];
  const _left = ["1", "4", "7"];
  const _midV = ["2", "5", "8"];
  const _right = ["3", "6", "9"];
  const _upDiag = ["7", "5", "3"];
  const _downDiag = ["1", "5", "9"];

  const checkWinner = () => {
    let result =
      _midH.every((combo) => _currentPlayer.arr().includes(combo)) ||
      _top.every((combo) => _currentPlayer.arr().includes(combo)) ||
      _bottom.every((combo) => _currentPlayer.arr().includes(combo)) ||
      _left.every((combo) => _currentPlayer.arr().includes(combo)) ||
      _midV.every((combo) => _currentPlayer.arr().includes(combo)) ||
      _right.every((combo) => _currentPlayer.arr().includes(combo)) ||
      _upDiag.every((combo) => _currentPlayer.arr().includes(combo)) ||
      _downDiag.every((combo) => _currentPlayer.arr().includes(combo));
    return result ? _declareWinner() : null;
  };

  const _declareWinner = () => {
    alert(`${currentPlayer().playerName()} WINS`);
    _scoreUp();
    _displayScores();
    console.log(`${currentPlayer().playerName()}: ${currentPlayer().score}`);
    _resetGame();
  };

  const checkDraw = () => {
    _playerO.arr().length == 5 || _playerX.arr().length == 5
      ? _declareDraw()
      : null;
  };

  const _declareDraw = () => {
    alert("IT'S A DRAW!");
    _resetGame();
  };

  const _resetGame = () => {
    board.resetBoard();
    _playerX.resetArr();
    _playerO.resetArr();
    getPlayer();
  };

  return { currentPlayer, getPlayer, checkWinner, checkDraw };
})();

// BOARD RELATED METHODS AND EVENTS WITHIN THIS FUNCTION //

const board = (() => {
  const _currentPlayerArr = () => {
    return gameLogic.currentPlayer().arr();
  };

  const _currentPlayerMark = () => {
    return gameLogic.currentPlayer().getMark();
  };

  const tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) =>
    tile.addEventListener("click", (e) => {
      if (e.target.textContent !== "X" && e.target.textContent !== "O") {
        e.target.textContent = _currentPlayerMark();
        _currentPlayerArr().push(`${e.target.id}`);
        gameLogic.checkWinner();
        gameLogic.checkDraw();
        gameLogic.getPlayer();
      }
      return;
    })
  );

  const resetBoard = () => {
    tiles.forEach((tile) => (tile.textContent = ""));
  };

  return { resetBoard };
})();
