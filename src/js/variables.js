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

export const STR_CAR_NAME = (_, name) => `
  <div class="mr-2 __car_${name}">
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
