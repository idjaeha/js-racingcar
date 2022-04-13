import { carsNameDiv, STR_ARROW, STR_CAR_NAME, STR_SPINNER } from "./variables";

class game {
  #cars = [];
  #round = 0;
  #cur = 0;

  constructor() {
    this.#cars = [];
    this.#round = 0;
    this.#cur = 0;
  }

  setCars(carsName) {
    this.#cars = carsName.map((name) => ({ name, result: [] }));
  }

  setRound(round) {
    this.#round = round;
  }

  init() {
    this.#cur = 0;
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
        }
      });
      if (this.#cur <= this.#round) {
        this.#cur++;
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
    this.clear();
  }

  clear() {
    this.#cars = [];
    this.#round = 0;
  }

  createCars() {
    carsNameDiv.insertAdjacentHTML(
      "afterbegin",
      this.#cars.map((car) => STR_CAR_NAME`${car.name}`).join("")
    );
  }

  createArrow(carName) {
    const carDOM = document.querySelector(`.__car_${carName}`);
    carDOM.insertAdjacentHTML("beforeend", STR_ARROW);
  }

  createSpinners() {
    this.#cars.forEach(({ name }) => {
      const carDOM = document.querySelector(`.__car_${name}`);
      carDOM.insertAdjacentHTML("beforeend", STR_SPINNER);
    });
  }

  removeSpinners() {
    this.#cars.forEach(({ name }) => {
      const carDOM = document.querySelector(`.__car_${name} .__spinner`);
      carDOM.remove();
    });
  }
}

export const gameInstance = new game();
