// 0 = rock, 1 = paper, 2 = scissors
let checkChoice = (number) => {
  switch (number) {
    case 0:
      return "rock";
    case 1:
      return "paper";
    default:
      return "scissors";
  }
};
let userScore = 0;
let comScore = 0;
class Game {
  constructor(props) {
    // OOP Abstraction
    if (this.constructor === Game) {
      throw new Error("Cannot instantiate from Abstract Class");
    }
    let { userChoiceValue, gameIsStarted, comChoiceValue } = props;
    this.userChoiceValue = userChoiceValue;
    this.gameIsStarted = gameIsStarted;
    this.comChoiceValue = comChoiceValue;
  }

  refresh() {
    const userClick = document.getElementsByClassName("selected");
    if (userClick.length > 0) {
      userClick[0].classList.remove("selected");
    }
    const elementComp = document.getElementsByClassName("selected");
    if (elementComp.length > 0) {
      elementComp[0].classList.remove("selected");
    }
    gameResult.innerHTML = "VS";
    gameResult.classList.remove("result-win", "result-draw");
    gameResult.classList.add("game-result");
    this.userChoiceValue = null;
    this.comChoiceValue = null;
    this.gameIsStarted = false;
  }
}

// User Module/Helper
const User = (Base) =>
  class extends Base {
    userChoice() {
      const userClick = document.querySelectorAll("#userChoice div");
      for (let index = 0; index < userClick.length; index++) {
        userClick[index].addEventListener("click", () => {
          if (this.gameIsStarted === false) {
            if (this.userChoiceValue == null) {
              this.userChoiceValue = index;
            }
            this.styling(userClick[index]);
            this.comChoiceValue = this.generateComputerChoice();
            this.whoIsWin(this.userChoiceValue, this.comChoiceValue);
            this.gameIsStarted = true;
          }
        });
      }
    }

    styling(element) {
      element.classList.add("selected");
    }
  };

// Computer Module/Helper
const Computer = (Base) =>
  class extends Base {
    randomNumber() {
      let rand = Math.floor(Math.random() * 2.9);
      return rand;
    }

    stylingCom(index) {
      const elementComp = document.querySelectorAll("#comChoice div");
      elementComp[index].classList.add("selected");
    }

    // OOP Encapsulation with private method
    #getComChoice() {
      return this.choose;
    }

    #setComChoise(value) {
      this.choose = value;
    }

    generateComputerChoice() {
      this.#setComChoise(this.randomNumber());
      const choose = this.#getComChoice();
      this.stylingCom(choose);
      return choose;
    }
  };

// OOP Inheritance & Polymorphism
class WhoIsWin extends Computer(User(Game)) {
  constructor(props) {
    super(props);
  }
  whoIsWin(userChoiceValue, comChoiceValue) {
    document.querySelector("#userFinalChoice").innerText =
      checkChoice(userChoiceValue);
    document.querySelector("#comFinalChoice").innerText =
      checkChoice(comChoiceValue);
    document
      .querySelector("#inputUserFinalChoice")
      .setAttribute("value", checkChoice(userChoiceValue));
    document
      .querySelector("#inputComFinalChoice")
      .setAttribute("value", checkChoice(comChoiceValue));
    let theWinner;
    let elementUserScore = document.querySelector(".userScore input");
    let elementComScore = document.querySelector(".comScore input");
    const gameResult = document.getElementById("gameResult");
    if (userChoiceValue === comChoiceValue) {
      elementUserScore.setAttribute("value", userScore);
      elementComScore.setAttribute("value", comScore);
      theWinner = "draw";
      return (
        document.querySelector("#isWin").setAttribute("value", theWinner),
        (gameResult.innerHTML = theWinner),
        gameResult.classList.remove("game-result", "result-win"),
        gameResult.classList.add("result-draw")
      );
    } else if (
      (userChoiceValue === 0 && comChoiceValue === 2) ||
      (userChoiceValue === 1 && comChoiceValue === 0) ||
      (userChoiceValue === 2 && comChoiceValue === 1)
    ) {
      userScore++;
      elementUserScore.setAttribute("value", userScore);
      theWinner = "player 1 win";
      return (
        document.querySelector("#isWin").setAttribute("value", theWinner),
        (gameResult.innerHTML = theWinner),
        gameResult.classList.remove("game-result", "result-draw"),
        gameResult.classList.add("result-win"),
        (document.querySelector("#userScore").innerText = userScore)
      );
    } else {
      comScore++;
      elementComScore.setAttribute("value", comScore);
      theWinner = "com win";
      return (
        document.querySelector("#isWin").setAttribute("value", theWinner),
        (gameResult.innerHTML = theWinner),
        gameResult.classList.remove("game-result", "result-draw"),
        gameResult.classList.add("result-win"),
        (document.querySelector("#comScore").innerText = comScore)
      );
    }
  }
}

const newGame = new WhoIsWin({
  userChoiceValue: null,
  gameIsStarted: false,
  comChoiceValue: null,
});
newGame.userChoice();

const refreshButton = document.getElementById("refreshButton");
refreshButton.onclick = () => {
  newGame.refresh();
};
