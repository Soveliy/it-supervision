import { validateForms } from "../functions/validate-forms.js";
import MicroModal from "micromodal";

MicroModal.init({
  disableScroll: true,
  disableFocus: true,
  onClose: (modalEl) => {
    const form = modalEl.querySelector(".form--modal");
    if (form) {
      // Сброс значений
      form.reset();

      // Сброс маски телефона (опционально)
      const tel = form.querySelector('input[type="tel"]');
      if (tel?.inputmask) tel.inputmask.setValue("");

      // Удаляем артефакты JustValidate
      form
        .querySelectorAll(".is-invalid")
        .forEach((el) => el.classList.remove("is-invalid"));
      form
        .querySelectorAll(
          ".just-validate-error-label, .js-validate-error-label"
        )
        .forEach((el) => el.remove());
    }
  },
});
const rules1 = [
  {
    ruleSelector: ".form__input--name",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    ruleSelector: ".form__input--phone",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];
const rules2 = [
  {
    ruleSelector: "#b-name",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
    ],
  },
  {
    ruleSelector: "#b-email",
    rules: [
      {
        rule: "minLength",
        value: 3,
      },
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните имя!",
      },
      {
        rule: "email",
      },
    ],
  },
  {
    ruleSelector: "#b-phone",
    tel: true,
    telError: "Введите корректный телефон",
    rules: [
      {
        rule: "required",
        value: true,
        errorMessage: "Заполните телефон!",
      },
    ],
  },
];
const afterForm = () => {
  MicroModal.close("callback");
  MicroModal.show("thanks");
  setTimeout(() => {
    MicroModal.close("thanks");
  }, 5000);
};

validateForms(".form--modal", rules1, [], afterForm);

validateForms(".bid__form", rules2, [], afterForm);
