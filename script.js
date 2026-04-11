document.addEventListener("DOMContentLoaded", () => {

    // =========================
    // 1. SMOOTH SCROLL SYSTEM
    // =========================
    function scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);

        if (element) {
            const nav = document.querySelector("nav");
            const navHeight = nav ? nav.offsetHeight : 0;

            const y = element.getBoundingClientRect().top + window.pageYOffset - navHeight - 10;

            window.scrollTo({
                top: y,
                behavior: "smooth"
            });
        }
    }

    // Connect nav links
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();

            const href = this.getAttribute("href");

            if (!href || !href.startsWith("#")) return;

            const sectionId = href.replace("#", "");
            scrollToSection(sectionId);
        });
    });

    // Make function usable in HTML onclick buttons
    window.scrollToSection = scrollToSection;


    // =========================
    // 2. CONTACT FORM HANDLING
    // =========================
    window.handleSubmit = function (event) {
        event.preventDefault();

        const email = document.getElementById("email")?.value.trim();
        const subject = document.getElementById("subject")?.value.trim();
        const message = document.getElementById("message")?.value.trim();

        if (!email || !subject || !message) {
            alert("❌ Please fill all fields");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            alert("❌ Please enter a valid email");
            return;
        }

        alert("✅ Message sent successfully!");

        document.querySelector(".contact-form")?.reset();
    };


    // =========================
    // 3. SCROLL ANIMATIONS
    // =========================
    const cards = document.querySelectorAll(".skill-card, .project-card");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        cards.forEach((card, index) => {
            card.classList.add("hidden");
            card.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(card);
        });

    } else {
        cards.forEach(card => card.classList.add("show"));
    }


    // =========================
    // 4. ACTIVE NAV HIGHLIGHT
    // =========================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.clientHeight;

            if (window.scrollY >= top - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    });

});