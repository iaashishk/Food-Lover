(function () {
  "use strict";

  document.title = "Food Lover | Fresh Pizza, Burgers & More";

  var metaDesc = document.createElement("meta");
  metaDesc.name = "description";
  metaDesc.content = "Food Lover serves fresh, foldable NY-style pizza, gourmet burgers and more. Order in-store or grab a slice on the go.";
  document.head.appendChild(metaDesc);

  var favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/png";
  favicon.href = "img/favicon.png";
  document.head.appendChild(favicon);

  var preloader = document.createElement("div");
  preloader.className = "preloader";
  var preloaderSpinner = document.createElement("div");
  preloaderSpinner.className = "preloader-spinner";
  preloader.appendChild(preloaderSpinner);
  document.body.insertBefore(preloader, document.body.firstChild);

  window.addEventListener("load", function () {
    preloader.classList.add("preloader-done");
    setTimeout(function () {
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }, 600);
  });

  var navbar = document.querySelector(".navbar");
  function handleNavbarScroll() {
    if (!navbar) return;
    if (window.scrollY > 40) {
      navbar.classList.add("navbar-scrolled");
    } else {
      navbar.classList.remove("navbar-scrolled");
    }
  }
  handleNavbarScroll();
  window.addEventListener("scroll", handleNavbarScroll, { passive: true });

  var moonIcon = document.querySelector(".bi-moon-fill");
  var themeToggle = moonIcon ? moonIcon.closest("a") : null;
  var THEME_KEY = "food-lover-theme";

  var sunPath = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-sun-fill" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707L4.464 3.757a.5.5 0 0 1 0 .708"/></svg>';
  var moonPath = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>';

  function applyTheme(theme) {
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
      if (themeToggle) themeToggle.innerHTML = sunPath;
    } else {
      document.body.classList.remove("dark-mode");
      if (themeToggle) themeToggle.innerHTML = moonPath;
    }
  }

  var savedTheme = localStorage.getItem(THEME_KEY);
  if (savedTheme) {
    applyTheme(savedTheme);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", function (e) {
      e.preventDefault();
      var isDark = document.body.classList.contains("dark-mode");
      var next = isDark ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
      showToast(next === "dark" ? "Dark mode on" : "Light mode on");
    });
  }

  var toastTimer = null;
  function showToast(message) {
    var toast = document.querySelector(".fl-toast");
    if (!toast) {
      toast = document.createElement("div");
      toast.className = "fl-toast";
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.add("fl-toast-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toast.classList.remove("fl-toast-show");
    }, 2200);
  }

  var navLinksWrap = document.querySelector(".navbar-nav.flex-row");
  var navContainer = document.querySelector(".navbar .container-fluid");
  if (navLinksWrap && navContainer) {
    var toggleBtn = document.createElement("button");
    toggleBtn.type = "button";
    toggleBtn.className = "custom-navbar-toggler";
    toggleBtn.setAttribute("aria-label", "Toggle navigation");
    toggleBtn.innerHTML = '<span></span><span></span><span></span>';
    navContainer.insertBefore(toggleBtn, navLinksWrap);

    toggleBtn.addEventListener("click", function () {
      navLinksWrap.classList.toggle("nav-open");
      toggleBtn.classList.toggle("open");
    });

    navLinksWrap.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinksWrap.classList.remove("nav-open");
        toggleBtn.classList.remove("open");
      });
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 768) {
        navLinksWrap.classList.remove("nav-open");
        toggleBtn.classList.remove("open");
      }
    });
  }

  var backToTop = document.createElement("button");
  backToTop.type = "button";
  backToTop.className = "back-to-top";
  backToTop.setAttribute("aria-label", "Back to top");
  backToTop.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"/></svg>';
  document.body.appendChild(backToTop);

  backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  window.addEventListener(
    "scroll",
    function () {
      if (window.scrollY > 400) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    },
    { passive: true }
  );

  var revealSelectors = ".card-men, .card-rev, .card-about, .ofer, .hero-section h1, .hero-section p, .end-foot .col-3, .end-foot .col-4, .end-foot .col-5";
  var revealTargets = document.querySelectorAll(revealSelectors);
  revealTargets.forEach(function (el, i) {
    el.classList.add("reveal-init");
    el.style.transitionDelay = (i % 6) * 70 + "ms";
  });

  if ("IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("revealed");
    });
  }

  document.querySelectorAll("img").forEach(function (img) {
    img.classList.add("img-fade");
    if (img.complete) {
      img.classList.add("img-loaded");
    } else {
      img.addEventListener("load", function () {
        img.classList.add("img-loaded");
      });
    }
  });

  var menuCards = document.querySelectorAll(".card-men");
  menuCards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var midX = rect.width / 2;
      var midY = rect.height / 2;
      var rotateY = ((x - midX) / midX) * 8;
      var rotateX = ((midY - y) / midY) * 8;
      card.style.transform = "perspective(600px) rotateX(" + rotateX + "deg) rotateY(" + rotateY + "deg) translateY(-4px)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  var copyrightEl = document.querySelector(".copyright-bar p");
  if (copyrightEl) {
    var currentYear = new Date().getFullYear();
    copyrightEl.textContent = copyrightEl.textContent.replace(/\d{4}/, currentYear);
  }

  var offerBlock = document.querySelector(".card-ofr .p-3.mb-0");
  if (offerBlock) {
    var countdownEl = document.createElement("div");
    countdownEl.className = "fl-countdown";
    countdownEl.innerHTML =
      '<div class="fl-countdown-unit"><span class="fl-countdown-num" data-unit="days">00</span><span class="fl-countdown-label">Days</span></div>' +
      '<div class="fl-countdown-unit"><span class="fl-countdown-num" data-unit="hours">00</span><span class="fl-countdown-label">Hrs</span></div>' +
      '<div class="fl-countdown-unit"><span class="fl-countdown-num" data-unit="minutes">00</span><span class="fl-countdown-label">Min</span></div>' +
      '<div class="fl-countdown-unit"><span class="fl-countdown-num" data-unit="seconds">00</span><span class="fl-countdown-label">Sec</span></div>';
    offerBlock.appendChild(countdownEl);

    var COUNTDOWN_KEY = "food-lover-offer-deadline";
    var deadline = parseInt(localStorage.getItem(COUNTDOWN_KEY), 10);
    var now = Date.now();
    if (!deadline || deadline < now) {
      deadline = now + 1000 * 60 * 60 * 24;
      localStorage.setItem(COUNTDOWN_KEY, String(deadline));
    }

    function pad(n) {
      return String(n).length < 2 ? "0" + n : String(n);
    }

    function updateCountdown() {
      var diff = deadline - Date.now();
      if (diff <= 0) {
        deadline = Date.now() + 1000 * 60 * 60 * 24;
        localStorage.setItem(COUNTDOWN_KEY, String(deadline));
        diff = deadline - Date.now();
      }
      var days = Math.floor(diff / (1000 * 60 * 60 * 24));
      var hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      var minutes = Math.floor((diff / (1000 * 60)) % 60);
      var seconds = Math.floor((diff / 1000) % 60);

      var daysEl = countdownEl.querySelector('[data-unit="days"]');
      var hoursEl = countdownEl.querySelector('[data-unit="hours"]');
      var minutesEl = countdownEl.querySelector('[data-unit="minutes"]');
      var secondsEl = countdownEl.querySelector('[data-unit="seconds"]');

      if (daysEl) daysEl.textContent = pad(days);
      if (hoursEl) hoursEl.textContent = pad(hours);
      if (minutesEl) minutesEl.textContent = pad(minutes);
      if (secondsEl) secondsEl.textContent = pad(seconds);
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }
})();
