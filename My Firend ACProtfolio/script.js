// =====================================================
// Argho Chowdhury — Portfolio
// script.js
// =====================================================


document.addEventListener("DOMContentLoaded", () => {

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function accentRGB() {
        const val = getComputedStyle(document.body).getPropertyValue("--accent-rgb").trim();
        return val || "74, 222, 158";
    }

    /* ---------------- Footer year ---------------- */
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ---------------- Greeting ---------------- */
    const greetingEl = document.getElementById("greeting");
    if (greetingEl) {
        const hour = new Date().getHours();
        let greeting = "Good evening";
        if (hour < 12) greeting = "Good morning";
        else if (hour < 17) greeting = "Good afternoon";
        greetingEl.textContent = `${greeting}, welcome to my portfolio`;
    }

    /* ---------------- Typing effect ---------------- */
    const typingEl = document.getElementById("typing");
    const typingWords = ["Data Science", "Web Design", "Problem Solving"];

    if (typingEl) {
        let wordIndex = 0;
        let charIndex = 0;
        let deleting = false;

        function typeLoop() {
            const currentWord = typingWords[wordIndex];

            if (!deleting) {
                charIndex++;
                typingEl.textContent = currentWord.slice(0, charIndex);
                if (charIndex === currentWord.length) {
                    deleting = true;
                    setTimeout(typeLoop, 1400);
                    return;
                }
            } else {
                charIndex--;
                typingEl.textContent = currentWord.slice(0, charIndex);
                if (charIndex === 0) {
                    deleting = false;
                    wordIndex = (wordIndex + 1) % typingWords.length;
                }
            }

            setTimeout(typeLoop, deleting ? 45 : 90);
        }

        typeLoop();
    }

    /* ---------------- Mobile nav toggle ---------------- */
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navMenu");

    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");
            navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });

        navMenu.querySelectorAll(".nav-link").forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                navToggle.setAttribute("aria-expanded", "false");
            });
        });
    }

    /* ---------------- Dark / Light theme toggle ---------------- */
    const themeToggle = document.getElementById("themeToggle");
    const body = document.body;
    const savedTheme = localStorage.getItem("portfolio-theme");

    function applyTheme(theme) {
        if (theme === "light") {
            body.classList.add("light-mode");
            if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
        } else {
            body.classList.remove("light-mode");
            if (themeToggle) themeToggle.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';
        }
    }

    applyTheme(savedTheme === "light" ? "light" : "dark");

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isLight = body.classList.contains("light-mode");
            const newTheme = isLight ? "dark" : "light";
            applyTheme(newTheme);
            localStorage.setItem("portfolio-theme", newTheme);
        });
    }

    /* ---------------- Scroll reveal (single restrained entrance per element) ---------------- */
    const revealTargets = document.querySelectorAll(".reveal");

    if (revealTargets.length) {
        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        revealObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.15 }
        );

        revealTargets.forEach((el) => revealObserver.observe(el));
    }

    /* ---------------- Photo frame tilt (frame motion) ---------------- */
    const heroPhoto = document.querySelector(".hero-photo");
    const photoImg = document.querySelector(".photo-img");

    if (heroPhoto && photoImg && !prefersReducedMotion) {
        heroPhoto.addEventListener("mousemove", (e) => {
            const rect = heroPhoto.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            const rotateY = (x / (rect.width / 2)) * 8;
            const rotateX = -(y / (rect.height / 2)) * 8;
            photoImg.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });

        heroPhoto.addEventListener("mouseleave", () => {
            photoImg.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg) scale(1)";
        });
    }

    /* ---------------- Animated skill bars ---------------- */
    const skillFills = document.querySelectorAll(".skill-fill");

    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const bar = entry.target;
                    bar.style.width = (bar.getAttribute("data-width") || "0") + "%";
                    skillObserver.unobserve(bar);
                }
            });
        },
        { threshold: 0.4 }
    );

    skillFills.forEach((bar) => skillObserver.observe(bar));

    /* ---------------- Back to top button + navbar scroll state ---------------- */
    const topBtn = document.getElementById("topBtn");
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
        if (topBtn) topBtn.classList.toggle("show", window.scrollY > 400);
        if (navbar) navbar.classList.toggle("scrolled", window.scrollY > 20);
    });

    if (topBtn) {
        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* ---------------- Scrollspy: highlight the active nav link ---------------- */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length && navLinks.length) {
        const spyObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        navLinks.forEach((link) => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") === `#${entry.target.id}`
                            );
                        });
                    }
                });
            },
            { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
        );

        sections.forEach((section) => spyObserver.observe(section));
    }

    /* ---------------- Contact form (client-side, mailto fallback) ---------------- */
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");

    if (contactForm && formStatus) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const message = document.getElementById("message").value.trim();

            formStatus.classList.remove("error", "success");

            if (!name || !email || !message) {
                formStatus.textContent = "Please fill in all fields before sending.";
                formStatus.classList.add("error");
                return;
            }

            const subject = encodeURIComponent(`Portfolio message from ${name}`);
            const body = encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`);
            window.location.href = `mailto:arghochowdury@gmail.com?subject=${subject}&body=${body}`;

            formStatus.textContent = "Opening your email client to send this message...";
            formStatus.classList.add("success");
            contactForm.reset();
        });
    }

    /* ---------------- Background particle network (single accent color, site-wide) ---------------- */
    const bgCanvas = document.getElementById("bgCanvas");

    if (bgCanvas && !prefersReducedMotion) {
        const ctx = bgCanvas.getContext("2d");
        let particles = [];
        let width, height;

        function resize() {
            width = bgCanvas.width = window.innerWidth;
            height = bgCanvas.height = document.documentElement.scrollHeight;
        }

        function createParticles() {
            const count = Math.max(60, Math.floor((width * Math.min(height, window.innerHeight * 1.4)) / 22000));
            particles = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * Math.min(height, window.innerHeight * 1.4),
                vx: (Math.random() - 0.5) * 0.25,
                vy: (Math.random() - 0.5) * 0.25,
                r: Math.random() * 1.8 + 1.2
            }));
        }

        function step() {
            const rgb = accentRGB();
            const viewTop = window.scrollY;
            const viewBottom = viewTop + window.innerHeight;

            ctx.clearRect(0, 0, width, height);

            const maxDist = 120;
            for (let i = 0; i < particles.length; i++) {
                const p1 = particles[i];
                if (p1.y < viewTop - 200 || p1.y > viewBottom + 200) continue;

                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < maxDist) {
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${rgb}, ${(1 - dist / maxDist) * 0.32})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            particles.forEach((p) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                if (p.y < viewTop - 200 || p.y > viewBottom + 200) return;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb}, 0.85)`;
                ctx.fill();
            });

            requestAnimationFrame(step);
        }

        resize();
        createParticles();
        requestAnimationFrame(step);

        let resizeTimer;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                resize();
                createParticles();
            }, 200);
        });
    }

    /* ---------------- Skills section: falling language "rain" (single accent color) ---------------- */
    const skillsCanvas = document.getElementById("skillsCanvas");

    if (skillsCanvas && !prefersReducedMotion) {
        const sctx = skillsCanvas.getContext("2d");
        const langWords = ["HTML", "CSS", "Bootstrap", "JavaScript", "C", "Python"];
        let sWidth, sHeight;
        let columns = [];
        const colGap = 100;

        function resizeSkillsCanvas() {
            const rect = skillsCanvas.parentElement.getBoundingClientRect();
            sWidth = skillsCanvas.width = rect.width;
            sHeight = skillsCanvas.height = rect.height;
        }

        function createColumns() {
            const count = Math.max(6, Math.floor(sWidth / colGap));
            columns = Array.from({ length: count }, (_, i) => ({
                x: (i + 0.5) * (sWidth / count),
                y: Math.random() * -sHeight,
                speed: Math.random() * 0.5 + 0.35,
                word: langWords[Math.floor(Math.random() * langWords.length)],
                size: Math.random() * 6 + 13
            }));
        }

        function stepSkills() {
            const rgb = accentRGB();
            sctx.clearRect(0, 0, sWidth, sHeight);

            columns.forEach((c) => {
                c.y += c.speed;

                if (c.y > sHeight + 20) {
                    c.y = -20;
                    c.word = langWords[Math.floor(Math.random() * langWords.length)];
                    c.speed = Math.random() * 0.5 + 0.35;
                }

                sctx.font = `600 ${c.size}px 'Sora', sans-serif`;
                sctx.textAlign = "center";
                sctx.fillStyle = `rgba(${rgb}, 0.22)`;
                sctx.fillText(c.word, c.x, c.y);
            });

            requestAnimationFrame(stepSkills);
        }

        resizeSkillsCanvas();
        createColumns();
        requestAnimationFrame(stepSkills);

        window.addEventListener("resize", () => {
            resizeSkillsCanvas();
            createColumns();
        });
    }

});