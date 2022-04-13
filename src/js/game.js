import {
  carsNameDiv,
  resultSection,
  settingCountFieldset,
  settingCountInput,
  settingNameFieldset,
  settingNameInput,
  STR_ARROW,
  STR_CAR_NAME,
  STR_RESULT,
  STR_SPINNER,
} from "./variables";

class game {
  #cars = [];
  #round = 0;
  #cur = 0;
  #maxMove = 0;

  constructor() {
    this.#cars = [];
    this.#round = 0;
    this.#cur = 0;
    this.#maxMove = 0;
  }

  setCars(carsName) {
    this.#cars = carsName.map((name) => ({ name, result: [] }));
  }

  setRound(round) {
    this.#round = round;
  }

  init() {
    this.#cur = 0;
    this.#maxMove = 0;
    // cars를 기반으로 DOM 세팅
    this.createCars();
  }

  run() {
    this.createSpinners();
    setTimeout(() => {
      this.removeSpinners();
      // 모든 자동차가 특정 확률로 전진하는 함수
      this.#cars.forEach((car) => {
        const isMove = Math.floor(Math.random() * 10) <= 2;
        if (isMove) {
          this.createArrow(car.name);
          car.result.push(true);
          this.#maxMove = Math.max(this.#maxMove, car.result.length);
        }
      });
      this.#cur++;
      if (this.#cur < this.#round) {
        this.run();
      } else {
        this.end();
      }
    }, 1000);
  }

  start() {
    this.init();
    this.run();
  }

  end() {
    resultSection.classList.remove("d-none");
    this.createResult();
    setTimeout(() => window.alert("축하합니다."), 500);
  }

  clear() {
    this.#cars = [];
    this.#round = 0;
    this.#cur = 0;
    this.#maxMove = 0;
  }

  reset() {
    this.clear();

    carsNameDiv.querySelectorAll("div").forEach((div) => div.remove());
    resultSection.querySelector("div").remove();

    settingNameInput.value = "";
    settingCountInput.value = "";

    settingCountFieldset.removeAttribute("disabled");
    settingCountFieldset.classList.add("d-none");

    settingNameFieldset.removeAttribute("disabled");
  }

  createCars() {
    carsNameDiv.insertAdjacentHTML(
      "afterbegin",
      this.#cars.map((car) => STR_CAR_NAME`${car.name}`).join("")
    );
  }

  createArrow(carName) {
    const carDOM = document.querySelector(
      `.__car_${carName.replaceAll(" ", "_")}`
    );
    carDOM.insertAdjacentHTML("beforeend", STR_ARROW);
  }

  createSpinners() {
    this.#cars.forEach(({ name }) => {
      const carDOM = document.querySelector(
        `.__car_${name.replaceAll(" ", "_")}`
      );
      carDOM.insertAdjacentHTML("beforeend", STR_SPINNER);
    });
  }

  removeSpinners() {
    this.#cars.forEach(({ name }) => {
      const carDOM = document.querySelector(
        `.__car_${name.replaceAll(" ", "_")} .__spinner`
      );
      carDOM.remove();
    });
  }

  createResult() {
    const template = document.createElement("template");
    template.innerHTML = STR_RESULT`${this.#cars
      .filter((car) => car.result.length === this.#maxMove)
      .map((car) => car.name)
      .join(", ")}`;
    const resultDOM = template.content.querySelector("div");

    resultDOM
      .querySelector(".__reset_button")
      .addEventListener("click", () => this.reset());

    resultSection.appendChild(resultDOM);
  }
}

export const gameInstance = new game();
