// I NAMED IT 'NOUGHTS & CROSSES' BECAUSE THATS WHAT IT'S CALLED OVER HERE IN MERRY ENGLAND, OKAY? OKAY. ENJOY //

// FACTORY FUNCTION TO PRODUCE THE PLAYER OBJECTS //

const PlayerFactory = (name, mark) => {
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



// GAME LOGIC FUNCTION USING MODULE PATTERN//

const gameLogic = (() => {

  // DEFINING PLAYERS //

  const _playerX = PlayerFactory("Player X", "X");

  const _playerO = PlayerFactory("Player O", "O");

  let _currentPlayer = _playerX;

  const currentPlayer = () => {
    return _currentPlayer;
  };

  const currentPlayerArr = () => {
    return _currentPlayer.arr();
  };

  const currentPlayerMark = () => {
    return _currentPlayer.getMark();
  };

  // MODE SELECTION - 2 PLAYER OR vs. O-BOT //

  const humanMode = () => {
    welcomePop.style.transform = "scale(0)";
  };

  const oBotMode = () => {
    welcomePop.style.transform = "scale(0)";
    _playerO.name = "O-Bot";
    _oName.textContent = "O-Bot";
    console.log(_playerO.name);
  };

  const welcomePop = document.querySelector(".welcome");
  const humanButton = document.querySelector(".humanButton");
  const oBotButton = document.querySelector(".botButton");
  humanButton.addEventListener("click", humanMode);
  oBotButton.addEventListener("click", oBotMode);

  // RENAMING PLAYERS //

  const popUpBlur = document.querySelector(".popblur");
  const _renameXtrigger = document.querySelector(".xName");
  const _renameXpop = document.querySelector("#renameXpop");
  _renameXtrigger.addEventListener("click", () => {
    _renameXpop.style.transform = "scale(1)";
    popUpBlur.style.transform = "scale(1)";
  });

  const _renameXsubmit = document.querySelector(".renameXsubmit");
  const _xName = document.querySelector(".xName");
  _renameXsubmit.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".renameXfield").value == "" ? _playerX.name = "Player X" : _playerX.name = document.querySelector(".renameXfield").value;
    _xName.textContent = `${_playerX.name}`;
    console.log(_playerX.name);
    _renameXpop.style.transform = "scale(0)";
    popUpBlur.style.transform = "scale(0)";
    turnIndicator();
  });

  const _renameOtrigger = document.querySelector(".oName");
  const _renameOpop = document.querySelector("#renameOpop");
  _renameOtrigger.addEventListener("click", () => {
    if (_playerO.name == "O-Bot") {
      null
    }
    else {
    _renameOpop.style.transform = "scale(1)";
    popUpBlur.style.transform = "scale(1)";
    }
  });

  const _renameOsubmit = document.querySelector(".renameOsubmit");
  const _oName = document.querySelector(".oName");
  _renameOsubmit.addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelector(".renameOfield").value == "" ? _playerO.name = "Player O" :_playerO.name = document.querySelector(".renameOfield").value;
    _oName.textContent = `${_playerO.name}`;
    console.log(_playerO.name);
    _renameOpop.style.transform = "scale(0)";
    popUpBlur.style.transform = "scale(0)";
    turnIndicator();
  });

  // AI //

  // O-BOT LOGIC //

  const oBotMove = (tile) => {
    if (tile.textContent === "") {
      tile.textContent = "O";
      _playerO.arr().push(tile.id);
      board.updateBoard(tile.id);
      _currentPlayer = _playerX;
    } else {
      getPlayer();
      checkForBot();
    }
    getPlayer();
    checkWinner();
    checkDraw();
    getPlayer();
  };

  // INITIAL MOVE, EITHER THE PLAYER OR THE BOT WILL TAKE THE CENTRAL TILE (5) //

  const centralTile = document.getElementById("5");

  const randomTileSelector = () => {
    const _randomTileIndex = Math.floor(Math.random() * board.gameBoard.length);
    const randomTile = board.gameBoard[_randomTileIndex];
    return document.getElementById(randomTile);
  };

  const oBotFirstMove = () => {
    _playerX.arr().includes("5")
      ? oBotMove(randomTileSelector())
      : oBotMove(centralTile);
  };

  // FUNCTION CHECKS FOR A POTENTIAL 'TERMINAL MOVE' FOR THE PLAYER PASSED INTO IT //

  const terminalMoveCheck = (combo, player) => {
    let notInArr = combo.filter(function (item) {
      return !player.arr().includes(item);
    });
    console.log(combo);
    console.log("X: " + _playerX.arr());
    console.log("O: " + _playerO.arr());
    if (notInArr.length === 1) {
      getPlayer();
      notInArr = document.getElementById(notInArr.toString());
      oBotMove(notInArr);
    }
    null;
  };

// CHECKING FOR A WINNING 'TERMINAL MOVE' FOR O-BOT, SEIZING VICTORY IF FOUND //

  const checkForBotWin = () => {
    terminalMoveCheck(_top, _playerO);
    terminalMoveCheck(_midH, _playerO);
    terminalMoveCheck(_bottom, _playerO);
    terminalMoveCheck(_left, _playerO);
    terminalMoveCheck(_midV, _playerO);
    terminalMoveCheck(_right, _playerO);
    terminalMoveCheck(_upDiag, _playerO);
    terminalMoveCheck(_downDiag, _playerO);
  };


  // CHECKING FOR A POTENTIAL 'TERMINAL MOVE' THAT THE PLAYER COULD MAKE AND BLOCKING IT //

  const dontLose = () => {
    terminalMoveCheck(_top, _playerX);
    terminalMoveCheck(_midH, _playerX);
    terminalMoveCheck(_bottom, _playerX);
    terminalMoveCheck(_left, _playerX);
    terminalMoveCheck(_midV, _playerX);
    terminalMoveCheck(_right, _playerX);
    terminalMoveCheck(_upDiag, _playerX);
    terminalMoveCheck(_downDiag, _playerX);

    _playerX.arr().length > _playerO.arr().length
      ? oBotMove(randomTileSelector())
      : null;
  };

  const _oBotPlay = () => {
    getPlayer();

    if (_playerO.arr().length === 0) {
      oBotFirstMove();
    }

    checkForBotWin();

    if (board.gameBoard.length === 1) {
      oBotMove(randomTileSelector());
    } else {
      dontLose();
    }
  };

  // METHOD TO SWITCH FROM PLAYER X TO PLAYER O AFTER EACH ROUND //

  const turnIndicator = () => {
    const turnIndicatorDiv = document.querySelector(".turnindicator");
    _playerO.name == "O-Bot"
      ? (turnIndicatorDiv.textContent = "")
      : (turnIndicatorDiv.textContent =
          "It's " + _currentPlayer.name + "'s turn");
  };

  const getPlayer = () => {
    return _currentPlayer === _playerX
      ? (_currentPlayer = _playerO)
      : (_currentPlayer = _playerX);
  };

  const checkForBot = () => {
    _currentPlayer.name === "O-Bot" ? _oBotPlay() : null;
  };

  // KEEPING SCORE... //

  const _displayScores = () => {
    const _displayXScore = () => {
      const _xScore = document.querySelector(".xScore");
      return (_xScore.textContent = `${_playerX.score}`);
    };

    const _displayOScore = () => {
      const _oScore = document.querySelector(".oScore");
      return (_oScore.textContent = `${_playerO.score}`);
    };
    _displayXScore();
    _displayOScore();
  };
  const _scoreUp = () => {
    _currentPlayer.score++;
  };

  // GETTING THE RESULT.... //

  // WINNING COMBINATIONS //

  const _top = ["1", "2", "3"];
  const _midH = ["4", "5", "6"];
  const _bottom = ["7", "8", "9"];
  const _left = ["1", "4", "7"];
  const _midV = ["2", "5", "8"];
  const _right = ["3", "6", "9"];
  const _upDiag = ["7", "5", "3"];
  const _downDiag = ["1", "5", "9"];

  // CHECKING FOR END GAME  //

  const _checkWinner = (winningCombo) => {
    let result = winningCombo.every((combo) =>
      _currentPlayer.arr().includes(combo)
    );

    return result ? _declareWinner() : null;
  };

  const checkWinner = () => {
    _checkWinner(_midH);
    _checkWinner(_top);
    _checkWinner(_bottom);
    _checkWinner(_left);
    _checkWinner(_midV);
    _checkWinner(_right);
    _checkWinner(_upDiag);
    _checkWinner(_downDiag);
  };

  const checkDraw = () => {
    _playerO.arr().length == 5 || _playerX.arr().length == 5
      ? _declareDraw()
      : null;
  };

  // RESULT DECLARATIONS //

  const _displayResult = () => {
    const _resultButton = document.querySelector(".resultbutton");
    const _resultPop = document.querySelector(".resultpop");
    _resultPop.style.transform = "scale(1)";
    _resultButton.addEventListener("click", () => {
      _resultPop.style.transform = "scale(0)";
    });
  };

  const _theResultIs = document.querySelector(".resultdiv");

  const _declareWinner = () => {
    _displayResult();
    _playerO.name == "O-Bot"
      ? (_theResultIs.textContent = "Oh no, O-Bot beat you. Maybe Next time...")
      : (_theResultIs.textContent =
          "Congratulations " + `${_currentPlayer.name}` + ", you WIN!");
    _scoreUp();
    _displayScores();
    console.log(`${currentPlayer().playerName()}: ${currentPlayer().score}`);
    _resetGame();
  };

  const _declareDraw = () => {
    _displayResult();
    _theResultIs.textContent = "It's a tie!";
    _resetGame();
  };

  // GAME RESET //

  const _resetGame = () => {
    board.resetBoard();
    _playerX.resetArr();
    _playerO.resetArr();
    _currentPlayer = _playerO;
  };

  return {
    turnIndicator,
    currentPlayer,
    getPlayer,
    checkWinner,
    checkDraw,
    checkForBot,
    randomTileSelector,
    currentPlayerArr,
    currentPlayerMark
  };
})();

// GAME BOARD AND RELATED FUNCTION USING MODULE PATTERN //

const board = (() => {

  let gameBoard = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const updateBoard = (tile) => {
    const makeTileUnavailable = gameBoard.filter(
      (available) => available !== tile
    );
    gameBoard = makeTileUnavailable;
  };

  const tiles = document.querySelectorAll(".tile");
  

  const resetBoard = () => {
    tiles.forEach((tile) => (tile.textContent = ""));
  };

  return { resetBoard, updateBoard, gameBoard, tiles };
})();

// GAME PLAY FUNCTION // 

const playRound = (() => {
  board.tiles.forEach((tile) =>
    tile.addEventListener("click", (e) => {
      if (e.target.textContent !== "X" && e.target.textContent !== "O") {
        e.target.textContent = gameLogic.currentPlayerMark();
        gameLogic.currentPlayerArr().push(`${e.target.id}`);
        board.updateBoard(`${e.target.id}`);
        gameLogic.checkWinner();
        gameLogic.checkDraw();
        gameLogic.getPlayer();
        gameLogic.turnIndicator();
        gameLogic.randomTileSelector();
        gameLogic.checkForBot();
        console.log(board.gameBoard);
      }
      return;
    })
  );
})()