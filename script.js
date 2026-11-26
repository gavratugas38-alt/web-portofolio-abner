const menuButton = document.querySelector("#menu-icon");
const navWrapper = document.querySelector("#nav-wrapper");
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelectorAll(".navbar a");
const header = document.querySelector(".header");
const sections = document.querySelectorAll("section[id]");
const progressBar = document.querySelector("#scroll-progress");
const themeToggle = document.querySelector("#theme-toggle");
const cursorGlow = document.querySelector(".cursor-glow");
const projectModal = document.querySelector("#project-details");
const projectModalCategory = document.querySelector("#project-modal-category");
const projectModalTitle = document.querySelector("#project-modal-title");
const projectModalImage = document.querySelector("#project-modal-image");
const projectModalDescription = document.querySelector("#project-modal-description");
const projectModalTools = document.querySelector("#project-modal-tools");
const projectModalClose = document.querySelector(".project-modal-close");
const siteSearch = document.querySelector("#site-search");
const searchInput = document.querySelector("#site-search-input");
const searchResults = document.querySelector("#search-results");
const contactForm = document.querySelector("#contact-form");
const formStatus = document.querySelector("#form-status");

const sectionLabels = {
    home: "Beranda",
    stats: "Statistik",
    about: "Tentang Saya",
    education: "Pendidikan",
    services: "Keahlian",
    portfolio: "Proyek",
    "contact-information": "Informasi Kontak",
    contact: "Kontak"
};

const navSectionMap = {
    stats: "home",
    "contact-information": "contact"
};

const closeMobileMenu = () => {
    if (!navWrapper || !menuButton) return;
    navWrapper.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Buka menu");

    const icon = menuButton.querySelector("i");
    if (icon) {
        icon.classList.add("bx-menu");
        icon.classList.remove("bx-x");
    }
};

const searchWebsite = () => {
    if (!searchInput || !searchResults) return;
    const query = searchInput.value.trim().toLowerCase();
    searchResults.replaceChildren();

    if (!query) {
        searchResults.classList.remove("show");
        return;
    }

    const matches = [...sections].filter((section) =>
        section.id && section.textContent.toLowerCase().includes(query)
    );

    if (!matches.length) {
        const emptyResult = document.createElement("p");
        emptyResult.className = "search-empty";
        emptyResult.textContent = "Tidak ada hasil ditemukan.";
        searchResults.append(emptyResult);
    } else {
        matches.forEach((section) => {
            const result = document.createElement("a");
            result.href = `#${section.id}`;
            result.setAttribute("role", "option");

            const icon = document.createElement("i");
            icon.className = "bx bx-right-arrow-alt";
            const label = document.createElement("span");
            label.textContent = sectionLabels[section.id] || section.id;

            result.append(icon, label);
            result.addEventListener("click", () => {
                searchResults.classList.remove("show");
                searchInput.value = "";
                closeMobileMenu();
            });
            searchResults.append(result);
        });
    }

    searchResults.classList.add("show");
};

if (searchInput && siteSearch && searchResults) {
    searchInput.addEventListener("input", searchWebsite);
    siteSearch.addEventListener("submit", (event) => {
        event.preventDefault();
        searchWebsite();
    });
    document.addEventListener("click", (event) => {
        if (!siteSearch.contains(event.target)) {
            searchResults.classList.remove("show");
        }
    });
}

const projectDetails = {
    python: {
        category: "PEMROGRAMAN TERSTRUKTUR",
        title: "Mempelajari dasar-dasar bahasa pemrograman Python",
        image: "Project 2.png",
        imageAlt: "Latihan dasar pemrograman Python di Google Colab",
        description: "Project ini berisi latihan pemrograman dasar Python di Google Colab, mulai dari pengelolaan variabel, input pengguna, hingga logika percabangan if/elif. Latihan disusun secara bertahap agar alur berpikir dan pemecahan masalah menjadi lebih terstruktur.",
        tools: ["Python", "Google Colab", "Logika Pemrograman", "Problem Solving"]
    },
    wordpress: {
        category: "WEB & ARTIKEL TEKNOLOGI",
        title: "Menulis artikel pengenalan BIOS di WordPress",
        image: "Project 3.png",
        imageAlt: "Artikel pengertian BIOS di WordPress",
        description: "Project ini berfokus pada pembuatan dan penyuntingan artikel edukatif di platform WordPress (abner986.wordpress.com) mengenai pengenalan BIOS (Basic Input Output System) dan perannya dalam menginisialisasi perangkat keras komputer.",
        tools: ["WordPress", "Penulisan Artikel IT", "Dasar Hardware & BIOS"]
    },
    pplg: {
        category: "PPLG",
        title: "Menanam tanaman untuk membuat lingkungan yang lebih baik",
        image: "Project 1.png",
        imageAlt: "Tanaman hijau hasil kegiatan PPLG",
        description: "Project ini merupakan kegiatan kolaboratif dalam menerapkan kepedulian terhadap lingkungan. Prosesnya meliputi persiapan media tanam, penanaman, dan perawatan tanaman sebagai langkah sederhana untuk menciptakan lingkungan sekolah yang lebih hijau.",
        tools: ["Kerja Sama", "Perawatan Tanaman", "Peduli Lingkungan"]
    }
};

let lastModalTrigger = null;

const openProjectModal = (event) => {
    event.preventDefault();
    const trigger = event.currentTarget;
    const detail = projectDetails[trigger.dataset.project];

    if (!detail || !projectModal) return;

    lastModalTrigger = trigger;
    projectModalCategory.textContent = detail.category;
    projectModalTitle.textContent = detail.title;
    projectModalDescription.textContent = detail.description;

    if (projectModalImage) {
        if (detail.image) {
            projectModalImage.src = detail.image;
            projectModalImage.alt = detail.imageAlt || detail.title;
            projectModalImage.hidden = false;
        } else {
            projectModalImage.hidden = true;
        }
    }

    projectModalTools.replaceChildren(
        ...detail.tools.map((tool) => {
            const item = document.createElement("span");
            item.textContent = tool;
            return item;
        })
    );

    projectModal.classList.add("show");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    if (projectModalClose) projectModalClose.focus();
};

const closeProjectModal = () => {
    if (!projectModal || !projectModal.classList.contains("show")) return;
    projectModal.classList.remove("show");
    projectModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastModalTrigger) {
        lastModalTrigger.focus({ preventScroll: true });
        lastModalTrigger = null;
    }
};

document.querySelectorAll(".project-detail-trigger").forEach((trigger) => {
    trigger.addEventListener("click", openProjectModal);
});

if (projectModalClose && projectModal) {
    projectModalClose.addEventListener("click", closeProjectModal);
    projectModal.addEventListener("click", (event) => {
        if (event.target === projectModal) closeProjectModal();
    });
}

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeProjectModal();
        closeMobileMenu();
        if (searchResults) searchResults.classList.remove("show");
    }
});

if (menuButton && navWrapper) {
    menuButton.addEventListener("click", () => {
        const isOpen = navWrapper.classList.toggle("active");
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");

        const icon = menuButton.querySelector("i");
        if (icon) {
            icon.classList.toggle("bx-menu", !isOpen);
            icon.classList.toggle("bx-x", isOpen);
        }
    });

    document.addEventListener("click", (event) => {
        if (header && !header.contains(event.target)) {
            closeMobileMenu();
        }
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
});

const updateScrollState = () => {
    if (header) {
        header.classList.toggle("scrolled", window.scrollY > 30);
    }

    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pageHeight > 0
        ? Math.min(100, Math.max(0, (window.scrollY / pageHeight) * 100))
        : 0;

    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    let currentSection = "home";
    const atBottom = pageHeight > 0 && window.scrollY >= pageHeight - 40;

    if (atBottom) {
        currentSection = "contact";
    } else {
        sections.forEach((section) => {
            if (window.scrollY >= section.offsetTop - 180) {
                const rawId = section.getAttribute("id");
                currentSection = navSectionMap[rawId] || rawId;
            }
        });
    }

    navLinks.forEach((link) => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${currentSection}`
        );
    });
};

window.addEventListener("scroll", updateScrollState, { passive: true });
updateScrollState();

/* Theme switcher */
const applyTheme = (isLight) => {
    document.body.classList.toggle("light-theme", isLight);
    if (!themeToggle) return;

    themeToggle.setAttribute("aria-pressed", String(isLight));
    themeToggle.setAttribute("aria-label", isLight ? "Ubah ke tema gelap" : "Ubah ke tema terang");

    const icon = themeToggle.querySelector("i");
    if (icon) {
        icon.classList.toggle("bx-sun", !isLight);
        icon.classList.toggle("bx-moon", isLight);
    }
};

try {
    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") applyTheme(true);
} catch {
    /* Ignore storage access errors */
}

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        const nextIsLight = !document.body.classList.contains("light-theme");
        applyTheme(nextIsLight);
        try {
            localStorage.setItem("portfolio-theme", nextIsLight ? "light" : "dark");
        } catch {
            /* Ignore storage access errors */
        }
    });
}

/* Cursor glow */
if (cursorGlow) {
    document.addEventListener("mousemove", (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });
}

/* Efek sparkle setiap klik */
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
document.addEventListener("click", (event) => {
    if (prefersReducedMotion.matches || event.detail === 0) return;

    for (let i = 0; i < 8; i++) {
        const sparkle = document.createElement("span");
        sparkle.className = "sparkle";

        sparkle.style.left = `${event.clientX}px`;
        sparkle.style.top = `${event.clientY}px`;
        sparkle.style.setProperty("--x", `${Math.random() * 120 - 60}px`);
        sparkle.style.setProperty("--y", `${Math.random() * 120 - 60}px`);

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 700);
    }
});

/* Contact form handler */
if (contactForm && formStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = contactForm.querySelector("#contact-name")?.value.trim() || "";
        const email = contactForm.querySelector("#contact-email")?.value.trim() || "";
        const subject = contactForm.querySelector("#contact-subject")?.value.trim() || "";
        const message = contactForm.querySelector("#contact-message")?.value.trim() || "";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        formStatus.className = "form-status";
        formStatus.replaceChildren();

        if (!name || !email || !subject || !message) {
            formStatus.classList.add("error");
            formStatus.textContent = "Harap lengkapi semua kolom sebelum mengirim pesan.";
            return;
        }

        if (!emailPattern.test(email)) {
            formStatus.classList.add("error");
            formStatus.textContent = "Harap masukkan alamat email yang valid.";
            return;
        }

        const whatsappUrl = `https://wa.me/62895403703208?text=${encodeURIComponent(`Halo Abner, saya ${name} (${email}).\nSubjek: ${subject}\n\n${message}`)}`;

        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

        formStatus.classList.add("success");
        const messageNode = document.createTextNode("Pesan siap dikirim melalui WhatsApp. Jika tab tidak terbuka otomatis, ");
        const linkNode = document.createElement("a");
        linkNode.href = whatsappUrl;
        linkNode.target = "_blank";
        linkNode.rel = "noopener noreferrer";
        linkNode.textContent = "klik di sini untuk mengirim via WhatsApp";
        formStatus.append(messageNode, linkNode, ".");

        contactForm.reset();
    });
}

/* Progressive reveal on scroll */
const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length && !prefersReducedMotion.matches && "IntersectionObserver" in window) {
    document.documentElement.classList.add("reveal-ready");

    const revealVisibleOrPassed = () => {
        revealElements.forEach((el) => {
            if (el.classList.contains("revealed")) return;
            const rect = el.getBoundingClientRect();
            if (rect.top <= window.innerHeight * 0.96) {
                el.classList.add("revealed");
            }
        });
    };

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting || entry.boundingClientRect.top <= window.innerHeight) {
                    entry.target.classList.add("revealed");
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
    revealVisibleOrPassed();
    window.addEventListener("scroll", revealVisibleOrPassed, { passive: true });
} else {
    revealElements.forEach((el) => el.classList.add("revealed"));
}
