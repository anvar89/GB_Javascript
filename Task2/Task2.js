const gameField = [
    [null    , null     , "goblin" , null    , null     , null     , null     , "troll" , null     , null     ],
    ["goblin", null     , null     , "troll" , null     , "cyclops", null     , null    , "goblin" , null     ],
    [null    , null     , "troll"  , null    , "goblin" , null     , "goblin" , null    , null     , "cyclops"],
    ["goblin", null     , "goblin" , null    , null     , "cyclops", null     , null    , "goblin" , null     ],
    [null    , null     , null     , null    , "goblin" , null     , "cyclops", "troll" , null     , "troll"  ],
    ["troll" , "goblin" , "cyclops", "goblin", null     , null     , "goblin" , null    , "cyclops", null     ],
    [null    , null     , null     , null    , null     , "cyclops", null     , null    , null     , null     ],
    [null    , "cyclops", null     , "goblin", "cyclops", null     , null     , "goblin", null     , "troll"  ],
    ["troll" , null     , "goblin" , null    , "goblin" , "troll"  , null     , null    , null     , null     ],
    [null    , "goblin" , null     , null    , null     , null     , "troll"  , "goblin", null     , "dragon" ],
  ];
  
  const MONSTERS = {
    goblin: {
      power: 10,
    },
    troll: {
      power: 20,
    },
    cyclops: {
      power: 50,
    },
    dragon: {
      power: 100,
    },
  };
  
  const stateOfGame = {
    player: {
      power: 10,
      position: {
        x: 0,
        y: 0,
      },
    },
  };
  
  const GAME_FIELD_SIZE = {
    WIDTH: gameField[0].length,
    HEIGHT: gameField.length,
  };
  
  const MOVEMENTS_OF_PLAYER = {
    up: "up",
    down: "down",
    right: "right",
    left: "left",
  };
  
  const movementsOfPlayer = {
    up: () => {
      stateOfGame.player.position.y -= 1;
    },
    down: () => {
      stateOfGame.player.position.y += 1;
    },
    right: () => {
      stateOfGame.player.position.x += 1;
    },
    left: () => {
      stateOfGame.player.position.x -= 1;
    },
  };
  
  const validation = (gf) => {
    // TODO: проверить всё ли игровое поле корректное
    // TODO: проверить все ли строки одинаковые
    let result = true;
    for (let i = 1; i < gf.length; i++)
    {
        if (gf[0].length != gf[i].length)
        {
            result = false;
            break;
        }
    }

    return result;
  };
  
  const getAvailableMovements = () => {
    const availableMovements = [];
  
    if (stateOfGame.player.position.y >= 1) {
      availableMovements.push(MOVEMENTS_OF_PLAYER.up);
    }
  
    if (stateOfGame.player.position.y < GAME_FIELD_SIZE.HEIGHT - 1) {
      availableMovements.push(MOVEMENTS_OF_PLAYER.down);
    }
  
    if (stateOfGame.player.position.x >= 1) {
      availableMovements.push(MOVEMENTS_OF_PLAYER.left);
    }
  
    if (stateOfGame.player.position.x < GAME_FIELD_SIZE.WIDTH - 1) {
      availableMovements.push(MOVEMENTS_OF_PLAYER.right);
    }
  
    return availableMovements;
  };
  
  const getMessageForMovement = (availableMovements) => {
    const movementString = `Введите направление движения(${availableMovements.join(
      ", "
    )}): `;
    const currentCoordinatesString = `Текущие координаты x: ${stateOfGame.player.position.x} y: ${stateOfGame.player.position.y}`;
  
    return `${currentCoordinatesString}\n${movementString}`;
  };
  
  // инструменты для записи хода сражений
  const gameLog = [];
  let xPrev = 0;
  let yPrev = 0;
  let battleResult;
  function LogAction(player, xPrev, yPrev, monster, battleResult){
        let message;

        if (monster == null)
        {
            message = "Ничего не произошло.";
        }
        else
        {
            message = `Игрок сразился с ${monster} и ` + (battleResult ? `одолел его!` : `погиб...`);
        }
        gameLog.push(`Игрок сделал ход: (${xPrev},${yPrev}) --> (${player.position.x}, ${player.position.y})\n${message}`)
  }

  while (true) {
    const availableMovements = getAvailableMovements();
    const stringMovementOfPlayer = prompt(
      getMessageForMovement(availableMovements)
    );
    if (availableMovements.indexOf(stringMovementOfPlayer) === -1) {
      // некорректный ввод
      alert("Некорректный ввод, попробуйте еще раз");
  
      //TODO: вернуть continue после отладки
      //break;
      continue;
    }
  
    movementsOfPlayer[stringMovementOfPlayer]();
  
    // проверка на монстра
    const gameCell =
      gameField[stateOfGame.player.position.y][stateOfGame.player.position.x];
    if (gameCell === null) {

        LogAction(stateOfGame.player, xPrev, yPrev, null, battleResult);
        xPrev = stateOfGame.player.position.x;
        yPrev = stateOfGame.player.position.y;
        continue;
    }
  
    const monster = MONSTERS[gameCell];
    // сражение с монстром
    let messageOfBattle = `Вы встретили монстра ${gameCell}\n`;
    if (stateOfGame.player.power >= monster.power) {
      stateOfGame.player.power += monster.power;
      messageOfBattle += "Вы выиграли\n";
      messageOfBattle += `Ваша сила теперь ${stateOfGame.player.power}`;
      alert(messageOfBattle);
      battleResult = true;
    } else {
      messageOfBattle += "Вы проиграли\n";
      messageOfBattle += "Конец игры";
      alert(messageOfBattle);
      battleResult = false;
    }

    LogAction(stateOfGame.player, xPrev, yPrev, gameCell, battleResult);
    xPrev = stateOfGame.player.position.x;
    yPrev = stateOfGame.player.position.y;

    if (battleResult && gameCell == "dragon")
    {
        alert("Вы победили!");
        break;
    }
    if (!battleResult) break;
  }
  
  // просмотр ходов игры
  while(true)
  {
      if (gameLog.length < 1)
      {
          alert("Журнал игровых событий пуст");
          break;
      }
      else 
      {
            let num = parseInt(prompt(`В журнале ${gameLog.length} записей\nВыберите номер хода\n(Введите -1 для выхода)`));

            if (num == -1) break;

            if ((num < 1) || (num > gameLog.length))
            {
                alert(`Нужно ввести число в диапазоне 0..${gameLog.length}`);
                continue;
            }

           alert(gameLog[num - 1]);
      }
    }