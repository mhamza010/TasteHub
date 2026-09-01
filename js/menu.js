
document.addEventListener("DOMContentLoaded", () => {

    const header =
        document.querySelector(".site-header");

    const menuToggle =
        document.querySelector(".menu-toggle");

    const navMenu =
        document.querySelector(".nav-menu");

    const categoryTabs =
        document.querySelectorAll(".category-tab");

    const dietButtons =
        document.querySelectorAll(".diet-btn");

    const menuItems =
        [...document.querySelectorAll(".menu-item")];

    const searchInput =
        document.querySelector("#menuSearch");

    const emptyState =
        document.querySelector("#menuEmpty");

    const resetButton =
        document.querySelector("#resetMenu");


    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener(
            "click",
            () => {

                const isOpen =
                    navMenu.classList.toggle(
                        "mobile-open"
                    );


                menuToggle.setAttribute(
                    "aria-expanded",
                    isOpen
                );


                menuToggle.innerHTML =
                    isOpen ? "×" : "☰";


                document.body.classList.toggle(
                    "no-scroll",
                    isOpen
                );

            }
        );


        navMenu
            .querySelectorAll("a")
            .forEach(link => {

                link.addEventListener(
                    "click",
                    () => {

                        navMenu.classList.remove(
                            "mobile-open"
                        );

                        menuToggle.innerHTML =
                            "☰";

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
       NAVBAR SCROLL
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
       FILTER STATE
    ===================================================== */

    let activeCategory = "all";

    let activeDiet = "all";

    let searchTerm = "";



    /* =====================================================
       FILTER MENU
    ===================================================== */

    function filterMenu() {

        let visibleCount = 0;


        menuItems.forEach(item => {

            const category =
                item.dataset.category;

            const diet =
                item.dataset.diet;

            const name =
                item.dataset.name
                    .toLowerCase();

            const description =
                item.dataset.description
                    .toLowerCase();


            const matchesCategory =
                activeCategory === "all" ||
                category === activeCategory;


            const matchesDiet =
                activeDiet === "all" ||
                diet === activeDiet;


            const matchesSearch =
                searchTerm === "" ||
                name.includes(searchTerm) ||
                description.includes(searchTerm);


            const shouldShow =
                matchesCategory &&
                matchesDiet &&
                matchesSearch;


            if (shouldShow) {

                item.classList.remove(
                    "hidden",
                    "search-hide"
                );


                item.style.animation =
                    "none";


                void item.offsetWidth;


                item.style.animation =
                    "menuItemIn .5s cubic-bezier(.16,1,.3,1)";


                visibleCount++;

            } else {

                item.classList.add(
                    "hidden"
                );

            }

        });


        if (visibleCount === 0) {

            emptyState.classList.add(
                "visible"
            );

        } else {

            emptyState.classList.remove(
                "visible"
            );

        }

    }



    /* =====================================================
       CATEGORY BUTTONS
    ===================================================== */

    categoryTabs.forEach(tab => {

        tab.addEventListener(
            "click",
            () => {

                activeCategory =
                    tab.dataset.category;


                categoryTabs.forEach(
                    button => {

                        button.classList.remove(
                            "active"
                        );

                        button.setAttribute(
                            "aria-selected",
                            "false"
                        );

                    }
                );


                tab.classList.add(
                    "active"
                );


                tab.setAttribute(
                    "aria-selected",
                    "true"
                );


                filterMenu();

            }
        );

    });



    /* =====================================================
       DIET BUTTONS
    ===================================================== */

    dietButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                activeDiet =
                    button.dataset.diet;


                dietButtons.forEach(
                    btn => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                filterMenu();

            }
        );

    });



    /* =====================================================
       SEARCH
    ===================================================== */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            event => {

                searchTerm =
                    event.target.value
                        .trim()
                        .toLowerCase();


                filterMenu();

            }
        );

    }



    /* =====================================================
       RESET
    ===================================================== */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            () => {

                activeCategory = "all";

                activeDiet = "all";

                searchTerm = "";


                if (searchInput) {

                    searchInput.value = "";

                }


                categoryTabs.forEach(
                    button => {

                        button.classList.remove(
                            "active"
                        );

                        button.setAttribute(
                            "aria-selected",
                            "false"
                        );

                    }
                );


                categoryTabs[0]
                    .classList.add(
                        "active"
                    );


                categoryTabs[0]
                    .setAttribute(
                        "aria-selected",
                        "true"
                    );


                dietButtons.forEach(
                    button => {

                        button.classList.remove(
                            "active"
                        );

                    }
                );


                dietButtons[0]
                    .classList.add(
                        "active"
                    );


                filterMenu();

            }
        );

    }



    /* =====================================================
       DISH MODAL
    ===================================================== */

    const modal =
        document.querySelector("#dishModal");

    const modalImage =
        document.querySelector("#modalImage");

    const modalName =
        document.querySelector("#modalName");

    const modalCategory =
        document.querySelector("#modalCategory");

    const modalDescription =
        document.querySelector("#modalDescription");

    const modalPrice =
        document.querySelector("#modalPrice");

    const modalClose =
        document.querySelector("#modalClose");

    const modalBackdrop =
        document.querySelector(".modal-backdrop");



    /* =====================================================
       OPEN MODAL
    ===================================================== */

    function openDishModal(item) {

        const image =
            item.dataset.image;

        const name =
            item.dataset.name;

        const description =
            item.dataset.description;

        const price =
            item.dataset.price;

        const category =
            item.dataset.category;


        modalImage.src = image;

        modalImage.alt = name;

        modalName.textContent =
            name;

        modalDescription.textContent =
            description;

        modalPrice.textContent =
            price;


        modalCategory.textContent =
            category
                .replace(
                    /^./,
                    letter =>
                        letter.toUpperCase()
                );


        modal.classList.add(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "no-scroll"
        );

    }



    /* =====================================================
       CLOSE MODAL
    ===================================================== */

    function closeDishModal() {

        modal.classList.remove(
            "active"
        );


        modal.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "no-scroll"
        );

    }



    /* =====================================================
       MENU ITEM CLICK
    ===================================================== */

    menuItems.forEach(item => {

        item.addEventListener(
            "click",
            () => {

                openDishModal(item);

            }
        );

    });



    /* =====================================================
       MODAL CONTROLS
    ===================================================== */

    modalClose.addEventListener(
        "click",
        closeDishModal
    );


    modalBackdrop.addEventListener(
        "click",
        closeDishModal
    );


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                modal.classList.contains(
                    "active"
                )
            ) {

                closeDishModal();

            }

        }
    );



    /* =====================================================
       FEATURED CARD CLICK
    ===================================================== */

    document
        .querySelectorAll(
            ".featured-card"
        )
        .forEach(card => {

            card.addEventListener(
                "click",
                () => {

                    /*
                     * Featured cards use their own
                     * information, so we create a
                     * temporary modal object.
                     */

                    const title =
                        card.querySelector(
                            "h3"
                        )?.textContent
                        || "TasteHub Dish";


                    const description =
                        card.querySelector(
                            "p"
                        )?.textContent
                        || "";


                    const price =
                        card.querySelector(
                            ".price"
                        )?.textContent
                        || "";


                    const image =
                        card.querySelector(
                            "img"
                        )?.src
                        || "";


                    modalImage.src =
                        image;

                    modalImage.alt =
                        title;

                    modalName.textContent =
                        title;

                    modalDescription.textContent =
                        description;

                    modalPrice.textContent =
                        price;

                    modalCategory.textContent =
                        card.querySelector(
                            ".dish-category"
                        )?.textContent
                        || "TasteHub";


                    modal.classList.add(
                        "active"
                    );

                    modal.setAttribute(
                        "aria-hidden",
                        "false"
                    );

                    document.body.classList.add(
                        "no-scroll"
                    );

                }
            );

        });



    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".menu-intro-grid, .featured-card, .menu-section-header, .menu-item, .menu-cta-content"
        );


    revealElements.forEach(element => {

        element.classList.add(
            "scroll-reveal"
        );

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
                threshold: 0.08,

                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {

        observer.observe(
            element
        );

    });



    /* =====================================================
       INITIAL FILTER
    ===================================================== */

    filterMenu();

});