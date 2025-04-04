// Wait for the DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle functionality
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  menuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Get all navigation links
  const navLinks = document.querySelectorAll(".nav-link");

  // Add hover effect to each link
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      // You can add additional hover effects here if needed
      this.style.transition = "all 0.3s ease";
    });

    link.addEventListener("mouseleave", function () {
      // Reset any additional hover effects here if needed
    });
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Scroll smoothly to the target element
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Close mobile menu if it's open
        if (!mobileMenu.classList.contains("hidden")) {
          mobileMenu.classList.add("hidden");
        }
      }
    });
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      document.getElementById("mobile-menu").classList.add("hidden");
    });
  });

  // Animate progress bars when they come into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll(".progress");
          progressBars.forEach((bar) => {
            const width = bar.style.width;
            bar.style.width = "0";
            setTimeout(() => {
              bar.style.width = width;
            }, 100);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  document
    .querySelector("#skills")
    .querySelectorAll(".progress-bar")
    .forEach((bar) => {
      observer.observe(bar);
    });

  // Text animation
  const texts = ["VISHAKH K T", "SOFTWARE ENGINEER", "MERN STACK DEVELOPER"];
  let currentIndex = 0;

  function typeText(text) {
    const element = document.getElementById("changing-text");
    element.textContent = "";
    let charIndex = 0;

    function type() {
      if (charIndex < text.length) {
        element.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100); // Typing speed
      } else {
        setTimeout(eraseText, 2000); // Wait before erasing
      }
    }

    type();
  }

  function eraseText() {
    const element = document.getElementById("changing-text");
    let text = element.textContent;

    function erase() {
      if (text.length > 0) {
        text = text.slice(0, -1);
        element.textContent = text;
        setTimeout(erase, 50); // Erasing speed
      } else {
        currentIndex = (currentIndex + 1) % texts.length;
        setTimeout(() => typeText(texts[currentIndex]), 500); // Wait before typing next text
      }
    }

    erase();
  }

  // Start the animation
  typeText(texts[currentIndex]);
});

// Create particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  const numberOfParticles = 50;

  for (let i = 0; i < numberOfParticles; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random position
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = Math.random() * 100 + "vh";

    // Random animation duration
    particle.style.animationDuration = Math.random() * 15 + 5 + "s";

    // Random delay
    particle.style.animationDelay = Math.random() * 5 + "s";

    particlesContainer.appendChild(particle);
  }
}

// Initialize particles
document.addEventListener("DOMContentLoaded", createParticles);

// Mouse follower effect
class ParticleEffect {
  constructor() {
    this.cursor = { x: 0, y: 0 };
    this.particles = [];
    this.init();
  }

  init() {
    document.addEventListener("mousemove", (e) => {
      this.cursor.x = e.clientX;
      this.cursor.y = e.clientY;
      this.addParticle();
    });

    this.animate();
  }

  addParticle() {
    const particle = document.createElement("div");
    particle.className = "cursor-particle";

    // Random size for more natural effect
    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Add slight random offset for more natural trail
    const offsetX = (Math.random() - 0.5) * 10;
    const offsetY = (Math.random() - 0.5) * 10;
    particle.style.left = this.cursor.x + offsetX + "px";
    particle.style.top = this.cursor.y + offsetY + "px";

    document.body.appendChild(particle);

    // Store particle with its creation time and initial position
    this.particles.push({
      element: particle,
      createdAt: Date.now(),
      initialX: this.cursor.x + offsetX,
      initialY: this.cursor.y + offsetY,
    });

    // Remove particle after animation
    setTimeout(() => {
      particle.remove();
      this.particles = this.particles.filter((p) => p.element !== particle);
    }, 1000);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Update existing particles
    const now = Date.now();
    this.particles.forEach((particle) => {
      const age = now - particle.createdAt;
      const lifespan = 1000;
      const progress = age / lifespan;

      // Fade out and scale down
      const opacity = 1 - progress;
      const scale = 1 - progress * 0.5;

      particle.element.style.opacity = opacity;
      particle.element.style.transform = `scale(${scale})`;
    });
  }
}

// Initialize particle effect
document.addEventListener("DOMContentLoaded", () => {
  new ParticleEffect();
});

document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.querySelector("form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const mailtoLink = `mailto:vishakhkt.2003@gmail.com?subject=Portfolio Contact from ${name}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;
    window.location.href = mailtoLink;

    // Clear the form
    contactForm.reset();
  });
});

// Loading screen handler
window.addEventListener("load", () => {
  const loadingScreen = document.getElementById("loading-screen");
  const contentWrapper = document.querySelector(".content-wrapper");

  // Simulate loading time (you can remove this setTimeout if you want it to load instantly)
  setTimeout(() => {
    // Hide loading screen
    loadingScreen.style.opacity = "0";
    loadingScreen.style.transition = "opacity 0.5s ease-in-out";

    // Show content
    contentWrapper.classList.add("loaded");

    // Remove loading screen after fade out
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 500);
  }, 2000); // 2 seconds loading time
});

// Mobile menu functionality
document.addEventListener("DOMContentLoaded", function () {
  const menuButton = document.getElementById("menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  let isMenuOpen = false;

  // Toggle menu function
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    menuButton.classList.toggle("active");

    if (isMenuOpen) {
      mobileMenu.classList.remove("hidden");
      // Trigger animation after unhiding
      requestAnimationFrame(() => {
        mobileMenu.classList.add("show");
      });
    } else {
      mobileMenu.classList.remove("show");
      // Wait for animation to finish before hiding
      setTimeout(() => {
        mobileMenu.classList.add("hidden");
      }, 300);
    }
  }

  // Menu button click handler
  menuButton.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      isMenuOpen &&
      !mobileMenu.contains(e.target) &&
      !menuButton.contains(e.target)
    ) {
      toggleMenu();
    }
  });

  // Close menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      toggleMenu();
    });
  });

  // Close menu on resize (if desktop breakpoint is reached)
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768 && isMenuOpen) {
      // 768px is Tailwind's md breakpoint
      toggleMenu();
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // ...existing code for other functionality...
});

function eraseText() {
  const text = changingText.textContent;
  if (text.length > 0) {
    changingText.textContent = text.substring(0, text.length - 1);
    setTimeout(eraseText, 50);
  } else {
    currentWordIndex = (currentWordIndex + 1) % words.length;
    setTimeout(() => typeWriter(words[currentWordIndex], 0), 500);
  }
}

// Start the typing animation
setTimeout(() => typeWriter(words[0], 0), 2500);
