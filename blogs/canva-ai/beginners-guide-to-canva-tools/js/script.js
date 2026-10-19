document.addEventListener("DOMContentLoaded", function () {
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Highlight the sidebar section currently visible on screen.
  const sidebarLinks = document.querySelectorAll(".blog-sidebar a[href^='#']");

  if (sidebarLinks.length) {
    const sections = [...sidebarLinks]
      .map(link => document.querySelector(link.getAttribute("href")))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            sidebarLinks.forEach(link => {
              link.classList.toggle(
                "active",
                link.getAttribute("href") === "#" + entry.target.id
              );
            });
          }
        });
      },
      {
        rootMargin: "-15% 0px -70% 0px",
        threshold: 0
      }
    );

    sections.forEach(section => observer.observe(section));
  }

});
