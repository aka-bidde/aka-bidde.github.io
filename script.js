'use strict';

const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();
  });
}

// modal close
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// portfolio filter
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

if (select) {
  select.addEventListener("click", function () {
    elementToggleFunc(this);
  });
}

const normalizeValue = function (value) {
  return value.trim().toLowerCase();
};

const filterFunc = function (selectedValue) {
  const normalizedSelectedValue = normalizeValue(selectedValue);

  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = normalizeValue(filterItems[i].dataset.category);

    if (normalizedSelectedValue === "all" || normalizedSelectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};

for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {
    const selectedValue = normalizeValue(this.innerText);

    if (selectValue) {
      selectValue.innerText = this.innerText.trim();
    }

    if (select) {
      elementToggleFunc(select);
    }

    filterFunc(selectedValue);
  });
}

let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {
  filterBtn[i].addEventListener("click", function () {
    const selectedValue = normalizeValue(this.innerText);

    if (selectValue) {
      selectValue.innerText = this.innerText.trim();
    }

    filterFunc(selectedValue);

    if (lastClickedBtn) {
      lastClickedBtn.classList.remove("active");
    }

    this.classList.add("active");
    lastClickedBtn = this;
  });
}

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}

var icon = document.getElementById("icon");

if (icon) {
  icon.onclick = function () {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      icon.setAttribute("name", "sunny-outline");
    } else {
      icon.setAttribute("name", "moon-outline");
    }
  };
}

document.getElementById('contactForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var form = event.target;
  var formData = new FormData(form);

  fetch(form.action, {
    method: form.method,
    body: formData,
  })
    .then(function (response) {
      if (response.ok) {
        document.getElementById('contactForm').style.display = 'none';
        document.getElementById('thankYouMessage').style.display = 'block';

        form.reset();
      } else {
        alert('There was an error submitting the form. Please try again.');
      }
    })
    .catch(function (error) {
      alert('There was an error submitting the form. Please try again.');
    });
});
