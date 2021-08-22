const question = {
  Text : "question text",
  A : "A",
  B : "B",
  C : "C",
  D : "D",
  key : "A",
  GetQuestion : "",
  checkAnswer : false,
  validateUserAnswer : false,
  userAnswer : ""
}

function Question(text, A, B, C, D, key)
{
  this.Text = text;
  this.A = A;
  this.B = B;
  this.C = C;
  this.D = D;
  this.key = key;
  this.getQuestion = function()
  {
    return `${this.Text}\nA: ${this.A}\nB: ${this.B}\nC: ${this.C}\nD: ${this.D}\nЧтобы забрать текущий выигрыш наберите exit`;
  },

  this.checkAnswer = function() 
  {
    return this.key.toLowerCase() == this.userAnswer.toLowerCase();
  },

  this.validateUserAnswer = function() 
  {
    return this.userAnswer.toLowerCase() == "a" || this.userAnswer.toLowerCase() == "b" || this.userAnswer.toLowerCase() == "c" || this.userAnswer.toLowerCase() == "d" || this.userAnswer.toLowerCase() == "exit";
  }

}

const questions = 
[
  new Question("С какой вероятностью 3 мухи в банке будут летать в одной плоскости?", "0%", "25%", "50%", "100%", "D"),
  new Question("Какую первую программу обычно пишут программисты?", "Hello world", "Hello, mom", "Good bye, my life, good bye", "Wellcome to hell", "A"),
  new Question("За какой промежуток времени Земля совершает полный оборот вокруг солнца?", "1 день", "1 месяц", "1 год", "Десятилетие", "C"),
  new Question("Что проводит боксер, наносящий удар противнику снизу?", "Свинг", "Хук", "Апперкот", "Джэб", "C"),
  new Question("Кого нет среди смешариков", "Барана", "Свиньи", "Лося", "Коня", "D"),
  new Question("Что помогает запомнить мнемоническое правило «Это я знаю и помню прекрасно»?", "Число Пи", "Ряд активности металлов", "Цевета радуги", "Порядок падежей", "A"),
  new Question("Как называется разновидность воды, в которой атом водорода замещён его изотопом дейтерием? ", "Лёгкая", "Средняя", "Тяжёлая", "Невесомая", "C"),
  new Question("Что такое десница?", "Бровь", "Глаз", "Шея", "Рука", "D"),
  new Question("В какое море впадает река Урал?", "Азовское", "Чёрное", "Средиземное", "Каспийское", "D"),
  new Question("На что кладут руку члены английского общества лысых во время присяги?", "Баскетбольный мяч", "Бильярдный шар", "Апельсин", "Кокосовый орех", "B"),
  new Question("Как назывался каменный монолит, на котором установлен памятник Петру I в Санкт-Петербурге?", "Дом-камень", "Гром-камень", "Гора-камень", "Разрыв-камень", "B"),
  new Question("Как Пётр Ильич Чайковский назвал свою серенаду для скрипки с оркестром си-бемоль минор? ", "Флегматическая ", "Меланхолическая ", "Холерическая ", "Сангвиническая ", "B"),
  new Question("Какое животное имеет второе название — кугуар?", "Оцелот ", "Леопард ", "Пума ", "Пантера ", "C"),
  new Question("Что в России 19 века делали в дортуаре?", "Ели ", "Спали ", "Ездили верхом", "Купались ", "B"),
  new Question("Какой химический элемент назван в честь злого подземного гнома? ", "Гафний ", "Кобальт ", "Бериллий ", "Теллур ", "B"),
];

const gameProgress = {
  round : 0,
  currentPrize : 0,
  guaranteedPrize : 0,
  reward : [500, 1000, 2000, 3000, 5000, 10000, 15000, 25000, 50000, 100000, 200000, 400000, 800000, 1500000, 3000000],
  checkpoint : 0
}

let gameLog = [];

function WriteToLog(gp, q, result){
  let logMessage = `Раунд ${gp.round + 1}. Вопрос: ${q[gp.round].getQuestion()}`;
  logMessage += `\nВариант игрока: ${q[gp.round].userAnswer}. Правильный ответ: ${q[gp.round].key}`;
  logMessage += "\nИгрок дал " + (result ? "правильный" : "неправильный") + " ответ";
  logMessage += `\nТекущий выигрыш: ${gp.currentPrize} руб., гарантированный выигрыш: ${gp.guaranteedPrize} руб.`;
  gameLog.push(logMessage);
}


while(true) 
{
    // Начало игры - выбор несгораемой суммы
    if (gameProgress.round == 0 && gameProgress.checkpoint == 0)
    {
      let message = "Добро пожаловать!\nВыберите раунд с \"несгораемой суммой\"";

      for( let i = 0; i < gameProgress.reward.length; i++)
      {
        message += `\n${i + 1} - ${gameProgress.reward[i]} руб.`;
      }
      message += "\nВведите число 1..14";
      gameProgress.checkpoint = parseInt(prompt(message));

      if (gameProgress.checkpoint < 1 || gameProgress.checkpoint > 14) 
      {
        alert("Неверное значение. Попробуйте ещё раз");
        gameProgress.checkpoint = 0;
        continue;
      }
    }

      // Процесс игры
      message = `Раунд ${gameProgress.round + 1}. Цена вопроса: ${gameProgress.reward[gameProgress.round]} руб.\nВ случае проигрыша, вы получите ${gameProgress.guaranteedPrize} руб.\n`;
      message += questions[gameProgress.round].getQuestion();
      questions[gameProgress.round].userAnswer = prompt(message);

      if (!questions[gameProgress.round].validateUserAnswer())
      {
        alert("Вы ввели неверное значение. Попробуйте ещё раз");
        continue;
      }

      // Выход из игры с текущим выигрышем
      if (questions[gameProgress.round].userAnswer.toLowerCase() == "exit")
      {
        if (confirm(`Вы хотите закончить игру и забрать выигрыш ${gameProgress.currentPrize} руб.?`))
        {
          alert(`Игра окончена. Ваш выигрыш ${gameProgress.currentPrize} руб.`);
          break;
        }
        else
        {
          // Продолжить игру
          continue;
        }
      }

      let result = questions[gameProgress.round].checkAnswer();

      WriteToLog(gameProgress, questions, result);

      if (result)
      {
        // правильный ответ
        gameProgress.currentPrize = gameProgress.reward[gameProgress.round];

        if (gameProgress.round == gameProgress.reward.length -1)
        {
          message = `Поздравляю! Вы выиграли максимальный приз: ${gameProgress.reward[gameProgress.reward.length -1]} руб.`;
          alert(message);
          break;
        }
        else
        {
          message = `И это правильный ответ! Вы можете забрать ${gameProgress.currentPrize} руб.`;

          if (gameProgress.round == gameProgress.checkpoint - 1)
          {
            gameProgress.guaranteedPrize = gameProgress.currentPrize;
            message += `\nВы достигли несгораемой суммы. Гарантированный выигрыш: ${gameProgress.guaranteedPrize} руб.`
          }
          gameProgress.round++;
          alert(message);
          continue;
        }
      }
      
    alert(`Вы проиграли. Правильный ответ - ${questions[gameProgress.round].key}\nВаш выигрыш ${gameProgress.guaranteedPrize} руб.`);
    break;
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