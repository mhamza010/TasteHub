/* =========================================================
   TASTEHUB — OUR STORY JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });

    if (window.history) {
        window.history.scrollRestoration = "manual";
    }

    document.body.classList.add("page-ready");


    /* =====================================================
       PAGE LOADER
    ====================================================== */

    const loader =
        document.querySelector(".page-loader");

    if (loader) {
        loader.classList.add("loaded");
        loader.remove();
    }

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (loader) {

                loader.classList.add("loaded");
                loader.remove();

            }

        }, 200);

    });



    /* =====================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".reveal, .reveal-left, .reveal-right"
        );


    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });



    /* =====================================================
       NAVBAR SCROLL EFFECT
    ====================================================== */

    const header =
        document.querySelector(".site-header");


    const updateNavbar =
        () => {

            if (!header) return;


            if (window.scrollY > 80) {

                header.classList.add("scrolled");

            } else {

                header.classList.remove("scrolled");

            }

        };


    window.addEventListener(
        "scroll",
        updateNavbar,
        { passive: true }
    );


    updateNavbar();



    /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (menuToggle && navLinks) {

        menuToggle.addEventListener(
            "click",
            () => {

                menuToggle.classList.toggle("open");

                navLinks.classList.toggle("open");

                document.body.classList.toggle(
                    "menu-open"
                );

            }
        );


        const mobileLinks =
            navLinks.querySelectorAll("a");


        mobileLinks.forEach((link) => {

            link.addEventListener(
                "click",
                () => {

                    menuToggle.classList.remove(
                        "open"
                    );

                    navLinks.classList.remove(
                        "open"
                    );

                    document.body.classList.remove(
                        "menu-open"
                    );

                }
            );

        });

    }



    /* =====================================================
       BACK TO TOP
    ====================================================== */

    const backToTop =
        document.querySelector(".back-to-top");


    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    backToTop.classList.add(
                        "show"
                    );

                } else {

                    backToTop.classList.remove(
                        "show"
                    );

                }

            },
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }



    /* =====================================================
       HERO PARALLAX
    ====================================================== */

    const heroBackground =
        document.querySelector(
            ".story-hero-background"
        );


    let ticking = false;


    const updateParallax =
        () => {

            if (!heroBackground) return;


            const scroll =
                window.scrollY;


            if (
                scroll <
                window.innerHeight
            ) {

                heroBackground.style.transform =
                    `translate3d(0, ${scroll * 0.20}px, 0) scale(1.05)`;

            }


            ticking = false;

        };


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
        { passive: true }
    );



    /* =====================================================
       TIMELINE ANIMATION
    ====================================================== */

    const timelineItems =
        document.querySelectorAll(
            ".timeline-item"
        );


    if (timelineItems.length) {

        const timelineObserver =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach(
                        (entry) => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "timeline-active"
                                );

                                timelineObserver.unobserve(
                                    entry.target
                                );

                            }

                        }
                    );

                },
                {
                    threshold: 0.25
                }
            );


        timelineItems.forEach(
            (item) => {

                timelineObserver.observe(
                    item
                );

            }
        );

    }



    /* =====================================================
       IMAGE TILT EFFECT
    ====================================================== */

    const tiltElements =
        document.querySelectorAll(
            ".intro-image, .founder-image"
        );


    tiltElements.forEach(
        (element) => {

            element.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth <
                        769
                    ) {
                        return;
                    }


                    const rect =
                        element.getBoundingClientRect();


                    const mouseX =
                        event.clientX -
                        rect.left;


                    const mouseY =
                        event.clientY -
                        rect.top;


                    const centerX =
                        rect.width / 2;


                    const centerY =
                        rect.height / 2;


                    const rotateX =
                        ((mouseY - centerY) /
                            centerY) *
                        -2;


                    const rotateY =
                        ((mouseX - centerX) /
                            centerX) *
                        2;


                    element.style.transform =
                        `perspective(1000px)
                         rotateX(${rotateX}deg)
                         rotateY(${rotateY}deg)
                         translateY(-5px)`;

                }
            );


            element.addEventListener(
                "mouseleave",
                () => {

                    element.style.transform =
                        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)";

                }
            );

        }
    );



    /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    internalLinks.forEach(
        (link) => {

            link.addEventListener(
                "click",
                (event) => {

                    const targetId =
                        link.getAttribute(
                            "href"
                        );


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


                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }
            );

        }
    );



    /* =====================================================
       MAGNETIC CTA BUTTONS
    ====================================================== */

    const buttons =
        document.querySelectorAll(
            ".luxury-button"
        );


    buttons.forEach(
        (button) => {

            button.addEventListener(
                "mousemove",
                (event) => {

                    if (
                        window.innerWidth <
                        769
                    ) {
                        return;
                    }


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


                    button.style.transform =
                        `translate(${x * 0.08}px,
                                   ${y * 0.08}px)`;

                }
            );


            button.addEventListener(
                "mouseleave",
                () => {

                    button.style.transform =
                        "translate(0, 0)";

                }
            );

        }
    );



    /* =====================================================
       CURSOR GLOW
    ====================================================== */

    const cursorGlow =
        document.createElement("div");


    cursorGlow.className =
        "story-cursor-glow";


    document.body.appendChild(
        cursorGlow
    );


    const cursorStyle =
        document.createElement("style");


    cursorStyle.textContent = `

        .story-cursor-glow {

            position: fixed;

            width: 180px;

            height: 180px;

            border-radius: 50%;

            pointer-events: none;

            z-index: 9998;

            background:
                radial-gradient(
                    circle,
                    rgba(199,165,106,0.08),
                    transparent 70%
                );

            transform:
                translate(-50%, -50%);

            opacity: 0;

            transition:
                opacity 0.4s ease;

        }

        @media (max-width: 768px) {

            .story-cursor-glow {

                display: none;

            }

        }

    `;


    document.head.appendChild(
        cursorStyle
    );


    document.addEventListener(
        "mousemove",
        (event) => {

            cursorGlow.style.left =
                `${event.clientX}px`;

            cursorGlow.style.top =
                `${event.clientY}px`;

            cursorGlow.style.opacity =
                "1";

        }
    );



    /* =====================================================
       IMAGE LAZY LOADING
    ====================================================== */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        (image) => {

            image.addEventListener(
                "load",
                () => {

                    image.classList.add(
                        "image-loaded"
                    );

                }
            );

        }
    );


});