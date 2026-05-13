/*
  CineWave Creative Studio
  Main JavaScript
  Features:
  1. Mobile navigation menu
  2. Active navigation link
  3. Header scroll style
  4. Scroll reveal animation
  5. Gallery filter
  6. Gallery modal preview
  7. Contact form demo message
*/

const body = document.body;
const header = document.querySelector("[data-header]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const navMenu = document.querySelector("[data-nav-menu]");
const cursorGlow = document.querySelector("[data-cursor-glow]");

/* 1. Mobile navigation menu */
if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    body.classList.toggle("menu-open");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      body.classList.remove("menu-open");
    });
  });
}

/* 2. Active navigation link */
const currentPage = window.location.pathname.split("/").pop() || "index.html";

document.querySelectorAll(".nav-menu a").forEach((link) => {
  const linkPage = link.getAttribute("href").split("#")[0];

  if (linkPage === currentPage) {
    link.classList.add("active");
  }
});

/* 3. Header scroll style */
function updateHeaderStyle() {
  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
}

window.addEventListener("scroll", updateHeaderStyle);
updateHeaderStyle();


/* 4. Scroll reveal animation */
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

/* 5. Gallery filter */
const filterButtons = document.querySelectorAll("[data-filter]");
const galleryItems = document.querySelectorAll(".gallery-item");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.dataset.filter;

    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      const itemCategory = item.dataset.category;
      const shouldShow = selectedCategory === "all" || selectedCategory === itemCategory;

      item.classList.toggle("hidden", !shouldShow);
    });
  });
});

/* 6. Gallery modal preview */
const modal = document.querySelector("[data-modal]");
const modalImage = document.querySelector("[data-modal-image]");
const modalVideo = document.querySelector("[data-modal-video]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalDescription = document.querySelector("[data-modal-description]");
const modalClose = document.querySelector("[data-modal-close]");

function pauseAllProjectVideos() {
  document.querySelectorAll("video").forEach((video) => {
    if (video !== modalVideo) {
      video.pause();
    }
  });
}
function playAllProjectVideos() {
  document.querySelectorAll("video").forEach((video) => {
    if (video !== modalVideo) {
      video.play();
    }
  });
}
function openModal(item) {
  if (!modal || !modalTitle || !modalDescription) return;

    pauseAllProjectVideos();
  const type = item.dataset.type || "image";

  modalTitle.textContent = item.dataset.title;
  modalDescription.textContent = item.dataset.description;

  if (modalImage) {
    modalImage.style.display = "none";
    modalImage.src = "";
  }

  if (modalVideo) {
    modalVideo.style.display = "none";
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
  }

  if (type === "image" && modalImage) {
    modalImage.src = item.dataset.image;
    modalImage.style.display = "block";
  }

  if (type === "video" && modalVideo) {
    modalVideo.src = item.dataset.video;
    modalVideo.style.display = "block";
    modalVideo.load();

    modalVideo.play().catch(() => {});
  }

  modal.classList.add("active");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  if (!modal) return;
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    playAllProjectVideos();
  }
}
galleryItems.forEach((item) => {
  item.addEventListener("click", () => openModal(item));
});
if (modalClose) {
  modalClose.addEventListener("click", closeModal);
}
if (modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
}
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});

/* 7. Contact form demo message */
const contactForm = document.querySelector("[data-contact-form]");
const formMessage = document.querySelector("[data-form-message]");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    formMessage.textContent = "Thank you! Your inquiry has been prepared for CineWave Creative Studio.";
    contactForm.reset();
  });
}
