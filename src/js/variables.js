export const settingNameInput = document.querySelector(".__setting_name_input");
export const settingNameButton = document.querySelector(
  ".__setting_name_button"
);
export const settingCountInput = document.querySelector(
  ".__setting_count_input"
);
export const settingCountButton = document.querySelector(
  ".__setting_count_button"
);
export const settingNameFieldset = document.querySelector(
  ".__setting_name_fieldset"
);
export const settingCountFieldset = document.querySelector(
  ".__setting_count_fieldset"
);
export const processSection = document.querySelector(".__process_section");
export const carsNameDiv = document.querySelector(".__cars_name_div");
export const resultSection = document.querySelector(".__result_section");

export const STR_CAR_NAME = (_, name) => `
  <div class="mr-2 __car_${name.replaceAll(" ", "_")}">
    <div class="car-player">${name}</div>
  </div>
`;

export const STR_ARROW = `
  <div class="forward-icon mt-2">⬇️️</div>
`;

export const STR_SPINNER = `
  <div class="d-flex justify-center mt-3 __spinner">
    <div class="relative spinner-container">
      <span class="material spinner"></span>
    </div>
  </div>
`;

export const STR_RESULT = (_, names) => `
  <div>
    <h2>🏆 최종 우승자: ${names} 🏆</h2>
    <div class="d-flex justify-center">
      <button type="button" class="btn btn-cyan __reset_button">다시 시작하기</button>
    </div>
  </div>
`;
