function initFileWidgets(root = document) {
  const containers = root.querySelectorAll("[data-file]");
  containers.forEach((container) => {
    if (container.__fileInited) return; // защита от повторной инициализации
    container.__fileInited = true;

    const input = container.querySelector('input[type="file"]');
    if (!input) return;

    // ищем label и span с текстом
    const label =
      container.querySelector(`label[for="${input.id}"]`) ||
      container.querySelector("label");

    // допускаем разные варианты класса; главное — наличие [data-file-text] или сам текст
    const textSpan =
      container.querySelector(".form-file__text") ||
      container.querySelector(".form__file-text") ||
      container.querySelector("[data-file-text]");
    if (!textSpan) return;

    const defaultText =
      textSpan.getAttribute("data-file-text") || textSpan.textContent.trim();

    function updateUI(file) {
      if (file) {
        textSpan.textContent = file.name;
        ensureRemoveBtn();
        container.classList.add("has-file");
      } else {
        textSpan.textContent = defaultText;
        removeRemoveBtn();
        container.classList.remove("has-file");
      }
    }

    function ensureRemoveBtn() {
      if (container.querySelector(".form__file-remove")) return;

      const svgNS = "http://www.w3.org/2000/svg";
      const xlinkNS = "http://www.w3.org/1999/xlink";

      const svg = document.createElementNS(svgNS, "svg");
      svg.setAttribute("class", "form__file-remove");
      // немного доступности, чтобы по Enter/Space тоже удалять
      svg.setAttribute("role", "button");
      svg.setAttribute("tabindex", "0");
      const use = document.createElementNS(svgNS, "use");
      use.setAttributeNS(xlinkNS, "xlink:href", "img/sprite.svg#close");
      svg.appendChild(use);

      textSpan.insertAdjacentElement("afterend", svg);

      const onRemove = (e) => {
        e.preventDefault();
        input.value = ""; // очистка выбранного файла
        updateUI(null);
      };
      svg.addEventListener("click", onRemove);
      svg.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onRemove(e);
        }
      });
    }

    function removeRemoveBtn() {
      const btn = container.querySelector(".form__file-remove");
      if (btn) btn.remove();
    }

    // выбор через диалог
    input.addEventListener("change", () => {
      const file = input.files && input.files[0];
      updateUI(file || null);
    });

    // Drag & Drop — на label (если есть), иначе на весь контейнер
    const dndTarget = label || container;

    ["dragenter", "dragover"].forEach((type) => {
      dndTarget.addEventListener(type, (e) => {
        e.preventDefault();
        e.stopPropagation();
        container.classList.add("is-dragover");
      });
    });

    ["dragleave", "dragend", "drop"].forEach((type) => {
      dndTarget.addEventListener(type, (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (type !== "drop") container.classList.remove("is-dragover");
      });
    });

    dndTarget.addEventListener("drop", (e) => {
      const dt = e.dataTransfer;
      if (dt && dt.files && dt.files.length) {
        // назначаем файлы инпуту (современные браузеры поддерживают)
        input.files = dt.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
      container.classList.remove("is-dragover");
    });

    // сброс формы — вернуть исходный текст и убрать иконку
    const form = input.closest("form");
    if (form) {
      form.addEventListener("reset", () => {
        // небольшой таймаут, чтобы сброс значения инпута отработал
        setTimeout(() => updateUI(null));
      });
    }

    // начальное состояние
    updateUI(input.files && input.files[0] ? input.files[0] : null);
  });
}

initFileWidgets();
