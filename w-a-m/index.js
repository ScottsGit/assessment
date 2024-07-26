const EMPTY = "";
const MOLE = "mole";
const SNAKE = "snake";

// * ~~~~~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~~~~~
export const Model = (() => {
  class State {
    /*
          ["mole", "mole", "snake"]
      */

    static DEFAULT_TIMER = 30;

    #boardCells = [];
    #timer = State.DEFAULT_TIMER;
    #size = 12;
    #score = 0;

    constructor(size, timer, view) {
      this.view = view;
      this.#timer = timer;
      this.#size = size;
      this.#boardCells = Array(size).fill("");

      // !!!!!!!!!!!!!!!!!! get view elements from View, not query here
      this.gameBoardView = document.querySelector(this.view.elements.gameBoard);
      this.timerCountView = document
        .querySelector(this.view.elements.timer)
        .querySelector(this.view.elements.timerCount);
      this.scoreCountView = document.querySelector(this.view.elements.score);
      console.log(this.scoreCountView);
    }

    get boardCells() {
      return this.#boardCells;
    }

    set boardCells(newState) {
      this.#boardCells = newState;

      const cellTmp = this.view.createTmp(this.#boardCells);
      this.view.render(this.gameBoardView, cellTmp);
    }

    set timer(newTimer) {
      this.#timer = newTimer;

      this.timerCountView.textContent = this.#timer;
    }

    get timer() {
      return this.#timer;
    }

    set score(newScore) {
      this.#score = newScore;

      this.scoreCountView.textContent = this.#score;
    }

    get score() {
      return this.#score;
    }

    resetTimer() {
      this.#timer = 0;
    }
    resetBoardCells() {
      this.#boardCells = Array(this.#size).fill("");
    }
  }
  //   const gameState = new State(12, view);
  return { State };
})();

// * ~~~~~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~~~~~
export const View = (() => {
  const elements = {
    gameViewContainer: ".game__container",
    gameBoard: ".game__board",
    boardCell: ".board__cell",
    timer: ".timer",
    timerCount: ".timer__count",
    startBtn: ".header__start",
    score: ".header__score",
  };

  const render = (element, tmp) => {
    element.innerHTML = tmp;
  };

  const createTmp = (arr) => {
    let tmp = "";
    arr.map((type, idx) => {
      if (type !== EMPTY) {
        tmp += `
          <div class="board__cell">
            <img class="board__cell__content" id="${idx}" src="./assets/${type}.jpg" alt="${idx}-${type}" />
          </div>
        `;
      } else {
        tmp += `
          <div class="board__cell">

          </div>
        `;
      }
    });
    return tmp;
  };

  return {
    elements,
    render,
    createTmp,
  };
})();

// * ~~~~~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~~~~~
export const Controller = ((model, view) => {
  const size = 12;
  const TYPES = ["mole", "snake"];
  let preRandomSelected = null;
  let selectedCells = new Set();

  const state = new model.State(12, 30, view);

  const init = () => {
    state.boardCells = Array(12).fill("");
    state.timer = 30;
    state.score = 0;
  };

  // ``````````` Game ``````````````
  const gameRunning = () => {
    const randomBoard = () => {
      const randomIdx = Math.floor(
        Math.random() * (state.boardCells.length - 1)
      );
      console.log(state.boardCells, preRandomSelected, selectedCells);
      const cpOfboardCells = [...state.boardCells];
      if (!selectedCells.has(preRandomSelected)) {
        cpOfboardCells[preRandomSelected] = "";
      }
      const randomType = TYPES[Math.floor(Math.random() * TYPES.length)];
      if (cpOfboardCells[randomIdx] === EMPTY)
        cpOfboardCells.splice(randomIdx, 1, randomType);
      state.boardCells = cpOfboardCells;

      preRandomSelected = randomIdx;
    };

    randomBoard();
  };

  const countdown = () => {
    let intervalID = setInterval(() => {
      if (state.timer > 0) {
        // check winning state
        if (selectedCells.size >= 3) {
          clearInterval(intervalID);
          state.resetTimer();
          state.resetBoardCells();
        }

        gameRunning();
        state.timer -= 1;
      } else {
        // console.log("Time's up!");
        alert("Time is Over !");
        clearInterval(intervalID);
        state.resetTimer();
        state.resetBoardCells();
        selectedCells = new Set();
      }
    }, 1000);
  };

  // ``````````` Event ``````````````
  const startBtnListener = () => {
    const startBtnElem = document.querySelector(view.elements.startBtn);
    startBtnElem.addEventListener("click", (e) => {
      if (e.target.className === "header__start") {
        const span = e.target.querySelector("span");
        console.log(state.timer);
        if (span.textContent === "Start") {
          init();
          countdown();
          span.textContent = "End";
        } else {
          // state.resetTimer();
          state.timer = 0;
          selectedCells = new Set();
          span.textContent = "Start";
        }
      }
    });
  };

  const gameListener = () => {
    const gameBoardElem = document.querySelector(view.elements.gameBoard);
    gameBoardElem.addEventListener("click", (e) => {
      if (e.target.className === "board__cell__content") {
        console.log(e.target.alt);
        if (e.target.alt.includes("snake")) {
          state.timer = 0;
          selectedCells = new Set();
          state.boardCells = Array(12).fill("snake");
          const startBtnElem = document.querySelector(view.elements.startBtn);
          const span = startBtnElem.querySelector("span");
          span.textContent = "Start";
        } else {
          state.score += 1;
          selectedCells.add(+e.target.id);
        }
      }
    });
  };

  const bootstrap = () => {
    init();
    startBtnListener();
    gameListener();
  };

  return { bootstrap };
})(Model, View);
Controller.bootstrap();
