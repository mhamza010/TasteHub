
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen = navMenu.classList.toggle("mobile-open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen
            );

            menuToggle.innerHTML = isOpen ? "×" : "☰";

            document.body.classList.toggle(
                "no-scroll",
                isOpen
            );
        });


        /* Close menu when clicking a link */

        navMenu.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("mobile-open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.innerHTML = "☰";

                document.body.classList.remove("no-scroll");
            });

        });

    }



    /* =====================================================
       2. PREPARE ELEMENTS FOR REVEAL ANIMATIONS
    ===================================================== */

    const revealSelectors = [
        ".section-heading",
        ".story-content",
        ".story-image",
        ".dish-card",
        ".feature-card",
        ".gallery-item",
        ".review-card",
        ".reservation-content",
        ".reservation-buttons",
        ".social-heading",
        ".social-image",
        ".location-content",
        ".map-container"
    ];


    revealSelectors.forEach(selector => {

        document.querySelectorAll(selector).forEach(element => {

            element.classList.add("reveal");

        });

    });



    /* =====================================================
       3. INTERSECTION OBSERVER
       Luxury scroll reveal
    ===================================================== */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (!entry.isIntersecting) {
                        return;
                    }


                    const element = entry.target;


                    /* Small stagger for cards */

                    const parent =
                        element.parentElement;


                    const siblings =
                        [...parent.children];


                    const index =
                        siblings.indexOf(element);


                    const delay =
                        Math.min(index * 70, 350);


                    setTimeout(() => {

                        element.classList.add("visible");

                    }, delay);


                    observer.unobserve(element);

                });

            },
            {
                threshold: 0.12,

                rootMargin:
                    "0px 0px -60px 0px"
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });



    /* =====================================================
       4. HERO ENTRANCE ANIMATION
    ===================================================== */

    const heroElements = [

        ".hero .eyebrow",
        ".hero h1",
        ".hero-tagline",
        ".hero-description",
        ".hero-buttons",
        ".hero-meta"

    ];


    heroElements.forEach(
        (selector, index) => {

            const element =
                document.querySelector(selector);


            if (!element) {
                return;
            }


            element.classList.add("hero-reveal");


            setTimeout(() => {

                element.classList.add(
                    "hero-reveal-visible"
                );

            }, 250 + (index * 160));

        }
    );



    /* =====================================================
       5. HERO CINEMATIC ZOOM
    ===================================================== */

    const hero = document.querySelector(".hero");


    if (hero) {

        hero.classList.add("hero-loaded");

    }



    /* =====================================================
       6. SUBTLE HERO PARALLAX
    ===================================================== */

    let ticking = false;


    function updateParallax() {

        if (!hero) {
            return;
        }


        /* Disable on mobile */

        if (window.innerWidth <= 680) {
            hero.style.backgroundPosition = "center";
            ticking = false;
            return;
        }


        const rect =
            hero.getBoundingClientRect();


        const viewportHeight =
            window.innerHeight;


        if (
            rect.bottom > 0 &&
            rect.top < viewportHeight
        ) {

            const movement =
                (window.scrollY * 0.12);


            hero.style.backgroundPosition =
                `center ${movement}px`;

        }


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(
                    updateParallax
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );



    /* =====================================================
       7. NAVBAR BACKGROUND ON SCROLL
    ===================================================== */

    const header =
        document.querySelector(".site-header");


    function updateHeader() {

        if (!header) {
            return;
        }


        if (window.scrollY > 70) {

            header.classList.add(
                "header-scrolled"
            );

        } else {

            header.classList.remove(
                "header-scrolled"
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
       8. LUXURY BUTTON MAGNETIC EFFECT
    ===================================================== */

    const buttons =
        document.querySelectorAll(
            ".btn, .nav-reserve"
        );


    /* Desktop only */

    if (
        window.matchMedia(
            "(hover: hover)"
        ).matches
    ) {

        buttons.forEach(button => {

            button.addEventListener(
                "mousemove",
                event => {

                    const rect =
                        button.getBoundingClientRect();


                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;


                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;


                    const strength = 0.12;


                    button.style.transform =
                        `translate(${x * strength}px,
                                   ${y * strength}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform = "";

                }
            );

        });

    }



    /* =====================================================
       9. IMAGE TILT EFFECT
    ===================================================== */

    const interactiveImages =
        document.querySelectorAll(
            ".dish-card, .story-image, .gallery-item"
        );


    if (
        window.matchMedia(
            "(hover: hover)"
        ).matches
    ) {

        interactiveImages.forEach(card => {

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


                    const rotateY =
                        ((x / rect.width) - 0.5) * 3;


                    const rotateX =
                        ((y / rect.height) - 0.5) * -3;


                    card.style.transform =
                        `perspective(900px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

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
       10. GALLERY LIGHTBOX
    ===================================================== */

    const galleryImages =
        document.querySelectorAll(
            ".gallery-item img"
        );


    if (galleryImages.length) {

        const lightbox =
            document.createElement("div");


        lightbox.className =
            "luxury-lightbox";


        lightbox.innerHTML = `
            <button
                class="lightbox-close"
                aria-label="Close image">
                ×
            </button>

            <img
                class="lightbox-image"
                src=""
                alt="">
        `;


        document.body.appendChild(
            lightbox
        );


        const lightboxImage =
            lightbox.querySelector(
                ".lightbox-image"
            );


        const closeButton =
            lightbox.querySelector(
                ".lightbox-close"
            );


        galleryImages.forEach(image => {

            image.parentElement.addEventListener(
                "click",
                () => {

                    lightboxImage.src =
                        image.src;

                    lightboxImage.alt =
                        image.alt;

                    lightbox.classList.add(
                        "active"
                    );

                    document.body.classList.add(
                        "no-scroll"
                    );

                }
            );

        });


        function closeLightbox() {

            lightbox.classList.remove(
                "active"
            );

            document.body.classList.remove(
                "no-scroll"
            );

        }


        closeButton.addEventListener(
            "click",
            closeLightbox
        );


        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeLightbox();

                }

            }
        );

    }



    /* =====================================================
       11. SMOOTH ANCHOR NAVIGATION
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(link => {

            link.addEventListener(
                "click",
                event => {

                    const targetId =
                        link.getAttribute("href");


                    if (
                        !targetId ||
                        targetId === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const targetPosition =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight;


                    window.scrollTo({

                        top: targetPosition,

                        behavior: "smooth"

                    });

                }
            );

        });



    /* =====================================================
       12. DYNAMIC CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(
            ".footer-bottom p"
        );


    if (footerYear) {

        footerYear.innerHTML =
            `© ${new Date().getFullYear()} TasteHub · Fictional Demo`;

    }



    /* =====================================================
       13. IMAGE LAZY LOAD ENHANCEMENT
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            if (
                !image.hasAttribute("loading")
            ) {

                image.setAttribute(
                    "loading",
                    "lazy"
                );

            }

        });



    /* =====================================================
       14. PREVENT IMAGE DRAGGING
    ===================================================== */

    document
        .querySelectorAll("img")
        .forEach(image => {

            image.addEventListener(
                "dragstart",
                event => {
                    event.preventDefault();
                }
            );

        });



    /* =====================================================
       15. CURSOR GLOW
       Desktop only
    ===================================================== */

    if (
        window.matchMedia(
            "(hover: hover)"
        ).matches
    ) {

        const cursor =
            document.createElement("div");


        cursor.className =
            "luxury-cursor";


        document.body.appendChild(
            cursor
        );


        window.addEventListener(
            "mousemove",
            event => {

                cursor.style.left =
                    `${event.clientX}px`;

                cursor.style.top =
                    `${event.clientY}px`;

            }
        );


        document
            .querySelectorAll(
                "a, button, .dish-card, .gallery-item"
            )
            .forEach(element => {

                element.addEventListener(
                    "mouseenter",
                    () => {

                        cursor.classList.add(
                            "cursor-active"
                        );

                    }
                );


                element.addEventListener(
                    "mouseleave",
                    () => {

                        cursor.classList.remove(
                            "cursor-active"
                        );

                    }
                );

            });

    }



  
    document.body.classList.add(
        "page-ready"
    );

});