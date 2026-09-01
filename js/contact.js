document.addEventListener("DOMContentLoaded", () => {

    /* ================================
       LOADER
    ================================= */

    const loader = document.querySelector(".contact-loader");

    function hideLoader() {
        if (loader) {
            loader.classList.add("loaded");
        }
    }

    window.addEventListener("load", () => {
        setTimeout(hideLoader, 400);
    });

    // Safety fallback
    setTimeout(hideLoader, 1800);


    /* ================================
       HEADER
    ================================= */

    const header = document.querySelector(".contact-header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 60) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });

    updateHeader();


    /* ================================
       MOBILE MENU
    ================================= */

    const menuToggle = document.querySelector(".contact-menu-toggle");
    const nav = document.querySelector(".contact-nav-links");

    if (menuToggle && nav) {

        menuToggle.addEventListener("click", () => {

            menuToggle.classList.toggle("open");
            nav.classList.toggle("open");

        });

        nav.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                menuToggle.classList.remove("open");
                nav.classList.remove("open");

            });

        });
    }


    /* ================================
       SCROLL REVEAL
    ================================= */

    const revealElements = document.querySelectorAll(
        ".reveal, .reveal-left, .reveal-right"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* ================================
       HERO PARALLAX
    ================================= */

    const heroImage = document.querySelector(
        ".contact-hero-image"
    );

    if (heroImage) {

        window.addEventListener(
            "scroll",
            () => {

                const scroll = window.scrollY;

                if (scroll < window.innerHeight) {

                    heroImage.style.transform =
                        `translate3d(0, ${scroll * 0.16}px, 0) scale(1.06)`;

                }

            },
            {
                passive: true
            }
        );

    }


    /* ================================
       DATE INPUT
    ================================= */

    const dateInput = document.querySelector(
        "#reservationDate"
    );

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");

        dateInput.min =
            `${year}-${month}-${day}`;

    }


    /* ================================
       RESERVATION FORM
    ================================= */

    const form = document.querySelector(
        "#reservationForm"
    );

    const success = document.querySelector(
        "#formSuccess"
    );

    if (form) {

        const fields = {

            name: document.querySelector(
                "#guestName"
            ),

            phone: document.querySelector(
                "#guestPhone"
            ),

            email: document.querySelector(
                "#guestEmail"
            ),

            date: document.querySelector(
                "#reservationDate"
            ),

            time: document.querySelector(
                "#reservationTime"
            ),

            guests: document.querySelector(
                "#guestCount"
            )

        };


        function showError(field, message) {

            if (!field) return;

            const group =
                field.closest(".form-group");

            if (!group) return;

            group.classList.add("invalid");

            const error =
                group.querySelector(".form-error");

            if (error) {
                error.textContent = message;
            }

        }


        function clearError(field) {

            if (!field) return;

            const group =
                field.closest(".form-group");

            if (!group) return;

            group.classList.remove("invalid");

            const error =
                group.querySelector(".form-error");

            if (error) {
                error.textContent = "";
            }

        }


        Object.values(fields).forEach(field => {

            if (!field) return;

            field.addEventListener("input", () => {
                clearError(field);
            });

            field.addEventListener("change", () => {
                clearError(field);
            });

        });


        form.addEventListener("submit", event => {

            event.preventDefault();

            let valid = true;


            /* NAME */

            if (!fields.name.value.trim()) {

                showError(
                    fields.name,
                    "Please enter your name."
                );

                valid = false;

            }


            /* PHONE */

            const phoneValue =
                fields.phone.value.trim();

            if (!phoneValue) {

                showError(
                    fields.phone,
                    "Please enter your phone number."
                );

                valid = false;

            } else if (phoneValue.length < 7) {

                showError(
                    fields.phone,
                    "Please enter a valid phone number."
                );

                valid = false;

            }


            /* EMAIL */

            const emailValue =
                fields.email.value.trim();

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailValue) {

                showError(
                    fields.email,
                    "Please enter your email."
                );

                valid = false;

            } else if (
                !emailPattern.test(emailValue)
            ) {

                showError(
                    fields.email,
                    "Please enter a valid email."
                );

                valid = false;

            }


            /* DATE */

            if (!fields.date.value) {

                showError(
                    fields.date,
                    "Please select a date."
                );

                valid = false;

            }


            /* TIME */

            if (!fields.time.value) {

                showError(
                    fields.time,
                    "Please select a time."
                );

                valid = false;

            }


            /* GUESTS */

            if (!fields.guests.value) {

                showError(
                    fields.guests,
                    "Please select the number of guests."
                );

                valid = false;

            }


            /* INVALID */

            if (!valid) {

                const firstInvalid =
                    form.querySelector(
                        ".invalid input, .invalid select"
                    );

                if (firstInvalid) {
                    firstInvalid.focus();
                }

                return;

            }


            /* SUBMITTING */

            const submitButton =
                form.querySelector(
                    ".reservation-submit"
                );

            if (submitButton) {

                submitButton.disabled = true;

                const buttonText =
                    submitButton.querySelector("span");

                if (buttonText) {
                    buttonText.textContent =
                        "Processing...";
                }

            }


            /* DEMO SUCCESS */

            setTimeout(() => {

                form.reset();

                if (success) {
                    success.classList.add("show");
                }

                if (submitButton) {

                    submitButton.disabled = false;

                    const buttonText =
                        submitButton.querySelector("span");

                    if (buttonText) {
                        buttonText.textContent =
                            "Request Reservation";
                    }

                }

            }, 700);

        });

    }


    /* ================================
       MAGNETIC BUTTONS
    ================================= */

    const magneticButtons =
        document.querySelectorAll(
            ".luxury-magnetic"
        );

    magneticButtons.forEach(button => {

        button.addEventListener("mousemove", event => {

            if (window.innerWidth < 769) return;

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
                `translate(${x * 0.08}px, ${y * 0.08}px)`;

        });


        button.addEventListener("mouseleave", () => {

            button.style.transform =
                "translate(0, 0)";

        });

    });


    /* ================================
       BACK TO TOP
    ================================= */

    const backTop =
        document.querySelector(
            ".contact-back-top"
        );

    if (backTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {

                    backTop.classList.add("show");

                } else {

                    backTop.classList.remove("show");

                }

            },
            {
                passive: true
            }
        );


        backTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* ================================
       SMOOTH INTERNAL LINKS
    ================================= */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* ================================
       FORM FOCUS
    ================================= */

    document.querySelectorAll(
        ".form-group input, .form-group textarea, .form-group select"
    ).forEach(field => {

        field.addEventListener("focus", () => {

            const group =
                field.closest(".form-group");

            if (group) {
                group.classList.add("focused");
            }

        });


        field.addEventListener("blur", () => {

            const group =
                field.closest(".form-group");

            if (group) {
                group.classList.remove("focused");
            }

        });

    });

});