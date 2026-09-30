// Menu submenu
document.addEventListener('DOMContentLoaded', function () {
        const isMobileView = () => window.innerWidth < 768;

        // Handle clicks on submenu toggles
        document.querySelectorAll('.dropdown-submenu > .dropdown-toggle').forEach(function (toggle) {
            toggle.addEventListener('click', function (e) {
                if (isMobileView()) {
                    e.preventDefault();
                    e.stopPropagation();

                    const submenu = toggle.nextElementSibling;

                    // Toggle submenu
                    if (submenu && submenu.classList.contains('dropdown-menu')) {
                        submenu.classList.toggle('show');
                    }

                    // Close other submenus in the same dropdown
                    const openMenus = toggle.closest('.dropdown-menu')?.querySelectorAll('.dropdown-menu.show') || [];
                    openMenus.forEach(function (menu) {
                        if (menu !== submenu) {
                            menu.classList.remove('show');
                        }
                    });
                }
            });
        });

        // Close all submenus when parent dropdown closes
        document.querySelectorAll('.dropdown').forEach(function (dropdown) {
            dropdown.addEventListener('hidden.bs.dropdown', function () {
                const openMenus = dropdown.querySelectorAll('.dropdown-menu.show');
                openMenus.forEach(function (menu) {
                    menu.classList.remove('show');
                });
            });
        });
    });

// Quantity Incrementer For Cart
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".quantity-selector").forEach(selector => {
      const decreaseBtn = selector.querySelector(".quantity-btn.decrease");
      const increaseBtn = selector.querySelector(".quantity-btn.increase");
      const quantityInput = selector.querySelector("input[name='quantity_']");

      if (!decreaseBtn || !increaseBtn || !quantityInput) return;

      decreaseBtn.addEventListener("click", function () {
        let current = parseInt(quantityInput.value) || 1;
        if (current > 1) {
          quantityInput.value = current - 1;
        }
      });

      increaseBtn.addEventListener("click", function () {
        let current = parseInt(quantityInput.value) || 1;
        quantityInput.value = current + 1;
      });
    });

  // Quantity Incrementer For Single Product
  document.addEventListener("DOMContentLoaded", function () {
      const decreaseBtn = document.getElementById("decrease");
      const increaseBtn = document.getElementById("increase");
      const quantityInput = document.getElementById("quantity");

      if (!decreaseBtn || !increaseBtn || !quantityInput) return;

      decreaseBtn.addEventListener("click", function () {
        let current = parseInt(quantityInput.value) || 1;
        if (current > 1) {
          quantityInput.value = current - 1;
        }
      });

      increaseBtn.addEventListener("click", function () {
        let current = parseInt(quantityInput.value) || 1;
        quantityInput.value = current + 1;
      });
    });

// Bootstrap tooltips init
    const tooltips = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltips.map(el => new bootstrap.Tooltip(el));
  });


// Tooltip JS
  document.addEventListener('DOMContentLoaded', function () {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });

// Animation On Scroll (IntersectionObserver)
  document.addEventListener("DOMContentLoaded", function () {
    const animatedItems = document.querySelectorAll("[data-animate]");

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const animation = el.dataset.animate;

          el.classList.add("animate__animated", `animate__${animation}`);
          el.style.setProperty('--animate-duration', '1s');
          observer.unobserve(el); // Animate only once
        }
      });
    }, { threshold: 0.15 });

    animatedItems.forEach(item => observer.observe(item));
  });

// email ajax
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#email-subscribe-form");
    const messageContainer = document.querySelector("#email-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch(form.action, {
            method: "POST",
            body: formData,
            headers: {
                "X-CSRFToken": getCookie("csrftoken"),
                "X-Requested-With": "XMLHttpRequest"
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                showMessage(data.message, "success");
                form.reset();
            } else {
                showMessage(data.message, "error");
            }
        })
        .catch(error => {
            console.error("AJAX error:", error);
            showMessage("Something went wrong. Please try again later.", "error");
        });
    });

    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith(name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

    function showMessage(message, type) {
        const alertClass = type === "success" ? "alert-success" : "alert-danger";

        // Create Bootstrap alert with dismiss button
        const alert = document.createElement("div");
        alert.className = `alert ${alertClass} fade show`;
        alert.role = "alert";
        alert.innerHTML = `
            ${message}
        `;

        messageContainer.innerHTML = "";
        messageContainer.appendChild(alert);

        // Auto-fade after 5 seconds
        setTimeout(() => {
            alert.classList.remove("show");
            alert.classList.add("fade-out");

            // Remove from DOM after transition
            setTimeout(() => {
                if (alert.parentNode) {
                    alert.remove();
                }
            }, 500); // Matches CSS transition time
        }, 3000);
    }
});




