
document.addEventListener("DOMContentLoaded", () => {
    const header =
        document.querySelector(".site-header");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const galleryGrid =
        document.querySelector("#galleryGrid");

    const galleryCards =
        [...document.querySelectorAll(".gallery-card")];

    const galleryEmpty =
        document.querySelector("#galleryEmpty");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const open =
                navMenu.classList.toggle(
                    "mobile-open"
                );

            menuToggle.setAttribute(
                "aria-expanded",
                open
            );

            menuToggle.innerHTML =
                open ? "×" : "☰";

            document.body.classList.toggle(
                "no-scroll",
                open
            );

        });


        navMenu.querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navMenu.classList.remove(
                            "mobile-open"
                        );

                        menuToggle.innerHTML = "☰";

                        menuToggle.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                        document.body.classList.remove(
                            "no-scroll"
                        );

                    }
                );

            });

    }



    /* =====================================================
       3. NAVBAR ON SCROLL
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 70) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();



    /* =====================================================
       4. FILTER SYSTEM
    ===================================================== */

    filterButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const filter =
                    button.dataset.filter;


                /* Active button */

                filterButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                    btn.setAttribute(
                        "aria-selected",
                        "false"
                    );

                });


                button.classList.add(
                    "active"
                );

                button.setAttribute(
                    "aria-selected",
                    "true"
                );


                let visibleCount = 0;


                /* Filter cards */

                galleryCards.forEach(card => {

                    const category =
                        card.dataset.category;


                    const shouldShow =
                        filter === "all" ||
                        category === filter;


                    if (shouldShow) {

                        visibleCount++;


                        card.classList.remove(
                            "filter-hidden"
                        );


                        /*
                         * Force browser to restart
                         * the animation.
                         */

                        card.classList.remove(
                            "filter-visible"
                        );


                        void card.offsetWidth;


                        card.classList.add(
                            "filter-visible"
                        );

                    } else {

                        card.classList.remove(
                            "filter-visible"
                        );

                        card.classList.add(
                            "filter-hidden"
                        );

                    }

                });


                /* Empty state */

                if (visibleCount === 0) {

                    galleryEmpty.classList.add(
                        "visible"
                    );

                } else {

                    galleryEmpty.classList.remove(
                        "visible"
                    );

                }

            }
        );

    });



    /* =====================================================
       5. LIGHTBOX ELEMENTS
    ===================================================== */

    const lightbox =
        document.querySelector(
            "#galleryLightbox"
        );

    const lightboxImage =
        document.querySelector(
            "#lightboxImage"
        );

    const lightboxClose =
        document.querySelector(
            "#lightboxClose"
        );

    const lightboxPrev =
        document.querySelector(
            "#lightboxPrev"
        );

    const lightboxNext =
        document.querySelector(
            "#lightboxNext"
        );

    const lightboxCategory =
        document.querySelector(
            "#lightboxCategory"
        );

    const lightboxTitle =
        document.querySelector(
            "#lightboxTitle"
        );

    const lightboxCounter =
        document.querySelector(
            "#lightboxCounter"
        );

    const lightboxBackdrop =
        document.querySelector(
            ".lightbox-backdrop"
        );


    /* =====================================================
       6. LIGHTBOX DATA
    ===================================================== */

    let currentIndex = 0;

    let visibleCards =
        galleryCards.filter(
            card =>
                !card.classList.contains(
                    "filter-hidden"
                )
        );


    function refreshVisibleCards() {

        visibleCards =
            galleryCards.filter(
                card =>
                    !card.classList.contains(
                        "filter-hidden"
                    )
            );

    }



    /* =====================================================
       7. OPEN LIGHTBOX
    ===================================================== */

    function openLightbox(index) {

        refreshVisibleCards();


        if (!visibleCards.length) {
            return;
        }


        currentIndex =
            (index + visibleCards.length) %
            visibleCards.length;


        updateLightbox();


        lightbox.classList.add(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }



    /* =====================================================
       8. UPDATE LIGHTBOX
    ===================================================== */

    function updateLightbox() {

        const card =
            visibleCards[currentIndex];


        if (!card) {
            return;
        }


        const image =
            card.querySelector("img");


        const category =
            card.dataset.category;


        const caption =
            card.querySelector(
                "figcaption strong"
            );


        /* Animation reset */

        lightboxImage.style.opacity = "0";

        lightboxImage.style.transform =
            "scale(.94)";


        setTimeout(() => {

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt;


            lightboxCategory.textContent =
                category;


            lightboxTitle.textContent =
                caption
                    ? caption.textContent
                    : "";


            lightboxCounter.textContent =
                `${String(currentIndex + 1).padStart(2, "0")} / ${String(visibleCards.length).padStart(2, "0")}`;


            requestAnimationFrame(() => {

                lightboxImage.style.opacity =
                    "1";

                lightboxImage.style.transform =
                    "scale(1)";

            });

        }, 150);

    }



    /* =====================================================
       9. CLOSE LIGHTBOX
    ===================================================== */

    function closeLightbox() {

        lightbox.classList.remove(
            "active"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "no-scroll"
        );

    }


    /* =====================================================
       10. NEXT / PREVIOUS
    ===================================================== */

    function nextImage() {

        refreshVisibleCards();


        if (!visibleCards.length) {
            return;
        }


        currentIndex =
            (currentIndex + 1) %
            visibleCards.length;


        updateLightbox();

    }


    function previousImage() {

        refreshVisibleCards();


        if (!visibleCards.length) {
            return;
        }


        currentIndex =
            (currentIndex - 1 +
                visibleCards.length) %
            visibleCards.length;


        updateLightbox();

    }



    /* =====================================================
       11. CARD CLICK
    ===================================================== */

    galleryCards.forEach(card => {

        card.addEventListener(
            "click",
            () => {

                refreshVisibleCards();


                const index =
                    visibleCards.indexOf(
                        card
                    );


                if (index !== -1) {

                    openLightbox(index);

                }

            }
        );

    });



    /* =====================================================
       12. LIGHTBOX CONTROLS
    ===================================================== */

    lightboxClose.addEventListener(
        "click",
        closeLightbox
    );


    lightboxPrev.addEventListener(
        "click",
        previousImage
    );


    lightboxNext.addEventListener(
        "click",
        nextImage
    );


    lightboxBackdrop.addEventListener(
        "click",
        closeLightbox
    );



    /* =====================================================
       13. KEYBOARD CONTROLS
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                !lightbox.classList.contains(
                    "active"
                )
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowRight") {

                nextImage();

            }


            if (event.key === "ArrowLeft") {

                previousImage();

            }

        }
    );



    /* =====================================================
       14. SWIPE SUPPORT
    ===================================================== */

    let touchStartX = 0;

    let touchEndX = 0;


    lightbox.addEventListener(
        "touchstart",
        event => {

            touchStartX =
                event.changedTouches[0].screenX;

        },
        {
            passive: true
        }
    );


    lightbox.addEventListener(
        "touchend",
        event => {

            touchEndX =
                event.changedTouches[0].screenX;


            const difference =
                touchStartX - touchEndX;


            if (Math.abs(difference) < 50) {
                return;
            }


            if (difference > 0) {

                nextImage();

            } else {

                previousImage();

            }

        },
        {
            passive: true
        }
    );



    /* =====================================================
       15. REVEAL ANIMATION
    ===================================================== */

    const revealItems = [
        ".intro-heading",
        ".intro-text",
        ".gallery-toolbar",
        ".gallery-card",
        ".gallery-cta-content"
    ];


    revealItems.forEach(selector => {

        document
            .querySelectorAll(selector)
            .forEach(element => {

                element.classList.add(
                    "scroll-reveal"
                );

            });

    });


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }


                    entry.target.classList.add(
                        "revealed"
                    );


                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -50px 0px"
            }
        );


    document
        .querySelectorAll(".scroll-reveal")
        .forEach(element => {

            observer.observe(
                element
            );

        });



    /* =====================================================
       16. GALLERY CARD MOUSE EFFECT
    ===================================================== */

    if (
        window.matchMedia(
            "(hover: hover)"
        ).matches
    ) {

        galleryCards.forEach(card => {

            card.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        card.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left;


                    const y =
                        event.clientY -
                        rect.top;


                    const rotateX =
                        ((y / rect.height) - 0.5)
                        * -2;


                    const rotateY =
                        ((x / rect.width) - 0.5)
                        * 2;


                    card.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)`;

                }
            );


            card.addEventListener(
                "mouseleave",
                () => {

                    card.style.transform = "";

                }
            );

        });

    }



    /* =====================================================
       17. LAZY IMAGE FADE
    ===================================================== */

    document
        .querySelectorAll(".gallery-card img")
        .forEach(image => {

            if (image.complete) {

                image.classList.add(
                    "loaded"
                );

            } else {

                image.addEventListener(
                    "load",
                    () => {

                        image.classList.add(
                            "loaded"
                        );

                    }
                );

            }

        });



    /* =====================================================
       18. INITIAL STATE
    ===================================================== */

    galleryCards.forEach(
        (card, index) => {

            card.style.animationDelay =
                `${index * 70}ms`;

        }
    );

});
