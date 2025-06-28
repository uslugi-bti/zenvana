document.addEventListener("DOMContentLoaded", function () {
    function testWebP(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function () {
            callback(webP.height == 2);
        };
        webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
    }
    testWebP(function (support) {
        if (support == true) {
            document.querySelector('body').classList.add('webp');
        } else {
            document.querySelector('body').classList.add('no-webp');
        }
    });

    const body = document.querySelector("body");
    const header = document.querySelector(".header");
    const headerBody = document.querySelector(".header__body");
    const headerList = document.querySelector(".header__list");
    const headerMenu = document.querySelector(".header__menu");
    const headerButton = document.querySelector(".header__button");

    const headerLinks = document.querySelectorAll(".header__item>a");

    headerMenu.addEventListener("click", function () {
        body.classList.toggle("header-lock");
        headerList.classList.toggle("active");
        headerMenu.classList.toggle("active");
    });

    function headerLinksFunction() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        for (let i = 0; i < headerLinks.length; i++) {
            headerLinks[i].addEventListener("click", function (event) {
                if (viewport_width < 767) {
                    body.classList.remove("header-lock");
                    headerList.classList.remove("active");
                    headerMenu.classList.remove("active");
                }
            });
        }
    }
    headerLinksFunction();
    window.addEventListener("resize", headerLinksFunction);

    function moveButton() {
        const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

        if (viewport_width < 425) {
            headerList.insertBefore(headerButton, headerList.children[1]);
        } else {
            headerBody.insertBefore(headerButton, headerBody.children[2]);
        }
    }
    moveButton();
    window.addEventListener("resize", moveButton);

    if (document.getElementById("scrollToServices")) {
        document.getElementById("scrollToServices").addEventListener("click", function () {
            document.getElementById("services").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    function headerPadding() {
        if (window.scrollY > 50) {
            header.classList.add("active");
        } else {
            header.classList.remove("active");
        }
    }
    headerPadding();
    window.addEventListener("scroll", headerPadding);
    window.addEventListener("resize", headerPadding);

    if (document.getElementById("upward")) {
        function showUpward() {
            if (window.scrollY > 50) {
                document.getElementById("upward").classList.add("active");
            } else {
                document.getElementById("upward").classList.remove("active");
            }
        }

        showUpward();
        window.addEventListener("scroll", showUpward);
        window.addEventListener("resize", showUpward);

        document.getElementById("upward").addEventListener("click", function () {
            document.getElementById("hero").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    const links = document.querySelectorAll('[data-link]');
    const sections = [];

    links.forEach(link => {
        const targetId = link.getAttribute('data-link');
        const section = document.getElementById(targetId);
        if (section) {
            sections.push({ link, section });
        }
    });

    function removeActiveClass() {
        links.forEach(link => link.classList.remove('active'));
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                removeActiveClass();
                const activeItem = sections.find(item => item.section === entry.target);
                if (activeItem) {
                    activeItem.link.classList.add('active');
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(item => observer.observe(item.section));

    if (document.querySelector("#gallery")) {
        const galleryItems = document.querySelectorAll(".gallery__item");
        const galleryPopup = document.querySelector(".popup-gallery");
        const galleryPopupClose = document.querySelector(".popup-gallery span#close");
        const galleryPopupImg = document.querySelector(".popup-gallery__img");
        const galleryPopupPrev = document.querySelector(".popup-gallery span#prev");
        const galleryPopupNext = document.querySelector(".popup-gallery span#next");

        let currentIndex = 0;

        function showImage(index) {
            const img = galleryItems[index].querySelector("img");
            const source = galleryItems[index].querySelector("source");

            galleryPopupImg.querySelector("img").src = img.src;
            galleryPopupImg.querySelector("source").srcset = source.srcset;
        }

        for (let i = 0; i < galleryItems.length; i++) {
            galleryItems[i].addEventListener("click", function () {
                currentIndex = i;
                body.classList.add("lock");
                galleryPopup.classList.add("open");
                showImage(currentIndex);
            });
        }

        galleryPopupClose.addEventListener("click", function () {
            body.classList.remove("lock");
            galleryPopup.classList.remove("open");
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
                body.classList.remove("lock");
                galleryPopup.classList.remove("open");
            } else if (event.key === "ArrowRight") {
                currentIndex = (currentIndex + 1) % galleryItems.length;
                showImage(currentIndex);
            } else if (event.key === "ArrowLeft") {
                currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
                showImage(currentIndex);
            }
        });

        galleryPopupNext.addEventListener("click", function () {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            showImage(currentIndex);
        });

        galleryPopupPrev.addEventListener("click", function () {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(currentIndex);
        });
    }

    /*if (document.querySelector(".booking")) {
        const bookLinks = document.querySelectorAll(".services-item__button>a");
        const serviceLabel = document.querySelector("form #service");
        const tarifLabel = document.querySelector("form #tariff");

        function getTarifs(i) {
            let tarifs = bookLinks[i].parentNode.parentNode.querySelectorAll(".services-item__item>span");
            let tarifsArr = [];
            
            for (let i = 0; i < tarifs.length; i++) {
                tarifsArr.push(tarifs[i].innerHTML);
            }

            tarifLabel.innerHTML = "";

            for (let i = 0; i < tarifsArr.length; i++) {
                tarifLabel.insertAdjacentHTML("beforeend", `<option value="${tarifsArr[i]}">${tarifsArr[i]}</option>`)
            }
        }
        getTarifs(0);

        for (let i = 0; i < bookLinks.length; i++) {
            bookLinks[i].addEventListener("click", function () {
                let servicesTitle = bookLinks[i].parentNode.parentNode.parentNode.querySelector(".services-item__title>h2").innerHTML;
                serviceLabel.value = servicesTitle;
                getTarifs(i);
            });
        }

        serviceLabel.addEventListener("change", function () {
            const selectedService = this.value;

            for (let i = 0; i < bookLinks.length; i++) {
                const title = bookLinks[i].parentNode.parentNode.parentNode.querySelector(".services-item__title>h2").innerHTML;

                if (title === selectedService) {
                    getTarifs(i);
                    break;
                }
            }
        });
    }*/
});