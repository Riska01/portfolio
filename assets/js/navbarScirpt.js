document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger-button");
    const navigationOverlay = document.querySelector(".navigation-overlay");
    const navLinks = document.querySelectorAll(".navigation a");
    const sections = document.querySelectorAll("section[id]");

    // Mobile navigation
    if (hamburger && navigationOverlay) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("open");
            navigationOverlay.classList.toggle("open");
            document.body.classList.toggle("menu-open");
        });

        // Close menu after clicking a link
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                hamburger.classList.remove("open");
                navigationOverlay.classList.remove("open");
                document.body.classList.remove("menu-open");
            });
        });

        // Close menu when clicking outside the menu
        navigationOverlay.addEventListener("click", (event) => {
            if (event.target === navigationOverlay) {
                hamburger.classList.remove("open");
                navigationOverlay.classList.remove("open");
                document.body.classList.remove("menu-open");
            }
        });
    }

    // Active navigation link based on current section
    const updateActiveLink = () => {
        let currentSection = "";

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 130;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

            if (window.scrollY < 200 && href === "/") {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", updateActiveLink);
    updateActiveLink();

    // Scroll reveal animation
    const revealElements = document.querySelectorAll(
        ".card, .experience-card, .skill-card, .education-card, .p-container p"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12
        }
    );

    revealElements.forEach((element, index) => {
        element.style.transitionDelay = `${(index % 4) * 0.08}s`;
        revealObserver.observe(element);
    });

    // Smooth scrolling for internal links
    navLinks.forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href");

            if (targetId && targetId.startsWith("#")) {
                event.preventDefault();

                const target = document.querySelector(targetId);

                if (target) {
                    const offset = 70;
                    const targetPosition =
                        target.getBoundingClientRect().top +
                        window.scrollY -
                        offset;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: "smooth"
                    });
                }
            }
        });
    });


    // ========================================
    // Experience Gallery (swipeable slider)
    // ========================================
    // Ganti path di bawah ini dengan foto kegiatan/sertifikat asli.
    // Tambahkan file gambarnya ke folder: assets/images/experiences/
    const galleryData = {
        she: {
            title: "PT Indokuat Sukses Makmur — Dokumentasi SHE",
            images: [
                "assets/images/experiences/she/1.png",
                "assets/images/experiences/she/2.jpeg",
                "assets/images/experiences/she/3.jpeg"
            ]
        },
        qa: {
            title: "PT Garuda Metalindo — Dokumentasi QA",
            images: [
                "assets/images/experiences/qa/1.jpg",
                "assets/images/experiences/qa/2.jpeg",
                "assets/images/experiences/qa/3.jpeg"
            ]
        },
        store: {
            title: "PT Indomarco Primastama — Dokumentasi Store Crew",
            images: [
                "#",
                "#"
            ]
        },
        org: {
            title: "Kepanitiaan Kampus — Dokumentasi Kegiatan",
            images: [
                "assets/images/experiences/org/1.jpg"
            ]
        },
        project1: {
            title: "APD System Management",
            images: [
                "assets/images/portfolio/project1/1.jpg",
                "assets/images/portfolio/project1/2.jpg",
                "assets/images/portfolio/project1/3.png",
                "assets/images/portfolio/project1/4.png",
                "assets/images/portfolio/project1/5.png",
                "assets/images/portfolio/project1/6.png",
                "assets/images/portfolio/project1/7.jpg"
            ]
        },
        project2: {
            title: "Sistem HRIS",
            images: [
                "assets/images/portfolio/project2/1.png",
                "assets/images/portfolio/project2/2.png",
                "assets/images/portfolio/project2/3.png",
                "assets/images/portfolio/project2/4.png",
                "assets/images/portfolio/project2/5.png",
                "assets/images/portfolio/project2/6.png",
                "assets/images/portfolio/project2/7.png",
                "assets/images/portfolio/project2/8.png",
                "assets/images/portfolio/project2/9.png",
                "assets/images/portfolio/project2/10.png",
                "assets/images/portfolio/project2/11.png",
                "assets/images/portfolio/project2/12.png",
                "assets/images/portfolio/project2/13.png",
                "assets/images/portfolio/project2/14.png",
                "assets/images/portfolio/project2/15.png"
            ]

        },
        project3: {
            title: "Website Penjualan",
            images: [
                "assets/images/portfolio/project3/1.png",
                "assets/images/portfolio/project3/2.png",
                "assets/images/portfolio/project3/3.png",
                "assets/images/portfolio/project3/4.png",
                "assets/images/portfolio/project3/5.png",
                "assets/images/portfolio/project3/6.png"
            ]

        },
        project4: {
            title: "Testing APD System Management",
            images: [
                "assets/images/portfolio/project4/1.png",
                "assets/images/portfolio/project4/2.png",
                "assets/images/portfolio/project4/3.png",
                "assets/images/portfolio/project4/4.png",
                "assets/images/portfolio/project4/5.png",
                "assets/images/portfolio/project4/6.png"
            ]
        
        },
        project5: {
            title: "Certificate",
            images: [
                "assets/images/certificate/1.jpg",
                "assets/images/certificate/2.jpg",
                "assets/images/certificate/3.png",
                "assets/images/certificate/4.png",
                "assets/images/certificate/5.jpg",
                "assets/images/certificate/6.jpg"
            ]
        
        }

        
        
    };

    const galleryModal = document.getElementById("galleryModal");
    const galleryTrack = document.getElementById("galleryTrack");
    const galleryDots = document.getElementById("galleryDots");
    const galleryTitle = document.getElementById("galleryTitle");
    const galleryClose = document.getElementById("galleryClose");
    const galleryPrev = document.getElementById("galleryPrev");
    const galleryNext = document.getElementById("galleryNext");
    const gallerySlider = document.getElementById("gallerySlider");
    const galleryTriggers = document.querySelectorAll(".gallery-trigger");

    if (galleryModal && galleryTrack && galleryTriggers.length) {
        let currentIndex = 0;
        let slideCount = 0;

        // Drag / swipe state
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;

        const getSliderWidth = () => gallerySlider.getBoundingClientRect().width;

        const setPositionByIndex = (animate = true) => {
            galleryTrack.style.transition = animate ? "transform 0.4s ease" : "none";
            currentTranslate = currentIndex * -getSliderWidth();
            prevTranslate = currentTranslate;
            galleryTrack.style.transform = `translateX(${currentTranslate}px)`;
            updateDots();
        };

        const updateDots = () => {
            [...galleryDots.children].forEach((dot, index) => {
                dot.classList.toggle("active", index === currentIndex);
            });
        };

        const buildSlides = (images) => {
            galleryTrack.innerHTML = "";
            galleryDots.innerHTML = "";

            images.forEach((src, index) => {
                const img = document.createElement("img");
                img.src = src;
                img.alt = `Dokumentasi ${index + 1}`;
                img.draggable = false;
                galleryTrack.appendChild(img);

                const dot = document.createElement("span");
                dot.addEventListener("click", () => {
                    currentIndex = index;
                    setPositionByIndex();
                });
                galleryDots.appendChild(dot);
            });

            slideCount = images.length;
            currentIndex = 0;
        };

        const openGallery = (key) => {
            const data = galleryData[key];
            if (!data) return;

            galleryTitle.textContent = data.title;
            buildSlides(data.images);

            galleryModal.classList.add("open");
            document.body.classList.add("menu-open");

            // Wait for layout before positioning slides
            requestAnimationFrame(() => setPositionByIndex(false));
        };

        const closeGallery = () => {
            galleryModal.classList.remove("open");
            document.body.classList.remove("menu-open");
        };

        const goToNext = () => {
            currentIndex = (currentIndex + 1) % slideCount;
            setPositionByIndex();
        };

        const goToPrev = () => {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            setPositionByIndex();
        };

        galleryTriggers.forEach(trigger => {
            trigger.addEventListener("click", () => {
                openGallery(trigger.dataset.gallery);
            });
        });

        galleryClose.addEventListener("click", closeGallery);

        galleryModal.addEventListener("click", (event) => {
            if (event.target === galleryModal) {
                closeGallery();
            }
        });

        galleryNext.addEventListener("click", goToNext);
        galleryPrev.addEventListener("click", goToPrev);

        document.addEventListener("keydown", (event) => {
            if (!galleryModal.classList.contains("open")) return;

            if (event.key === "Escape") closeGallery();
            if (event.key === "ArrowRight") goToNext();
            if (event.key === "ArrowLeft") goToPrev();
        });

        window.addEventListener("resize", () => setPositionByIndex(false));

        // ---- Swipe / drag support (touch + mouse) ----
        const dragStart = (clientX) => {
            isDragging = true;
            startX = clientX;
            galleryTrack.classList.add("dragging");
        };

        const dragMove = (clientX) => {
            if (!isDragging) return;
            const delta = clientX - startX;
            currentTranslate = prevTranslate + delta;
            galleryTrack.style.transform = `translateX(${currentTranslate}px)`;
        };

        const dragEnd = () => {
            if (!isDragging) return;
            isDragging = false;
            galleryTrack.classList.remove("dragging");

            const movedBy = currentTranslate - prevTranslate;
            const threshold = getSliderWidth() * 0.15;

            if (movedBy < -threshold && currentIndex < slideCount - 1) {
                currentIndex += 1;
            } else if (movedBy > threshold && currentIndex > 0) {
                currentIndex -= 1;
            }

            setPositionByIndex();
        };

        // Touch events
        galleryTrack.addEventListener("touchstart", (e) => {
            dragStart(e.touches[0].clientX);
        }, { passive: true });

        galleryTrack.addEventListener("touchmove", (e) => {
            dragMove(e.touches[0].clientX);
        }, { passive: true });

        galleryTrack.addEventListener("touchend", dragEnd);

        // Mouse events (desktop drag)
        galleryTrack.addEventListener("mousedown", (e) => {
            e.preventDefault();
            dragStart(e.clientX);
        });

        window.addEventListener("mousemove", (e) => {
            if (isDragging) dragMove(e.clientX);
        });

        window.addEventListener("mouseup", dragEnd);
    }
});
