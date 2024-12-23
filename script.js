import "./styles/main.css";

// Nav Links
const listElements = document.querySelectorAll(".navbar ul li");
const pagesWrapper = document.querySelector(".pages-wrapper");
const rootElement = document.querySelector("html");
const navBar = document.querySelector(".navbar");
listElements.forEach((element) => {
    element.addEventListener("click", (event) => {
        pagesWrapper.style.left = element.dataset.leftValue;
        rootElement.classList = element.dataset.classValue;
        listElements.forEach((element) => {
            element.classList = "";
        });
        element.classList.add("active");
        menu.classList.toggle("close");
        navBar.classList.toggle("hide-nav");
    });
});

// Nav Bar
const menu = document.querySelector(".menu");
menu.onclick = () => {
    menu.classList.toggle("close");
    navBar.classList.toggle("hide-nav");
};

// Say Hi
const contactBtn = document.querySelector(".contact-btn");
const expertiseBtn = document.querySelector(".expertise-btn");
const contactPage = document.querySelector(".navbar ul li:last-child");
contactBtn.onclick = () => {
    pagesWrapper.style.left = contactPage.dataset.leftValue;
    rootElement.classList = contactPage.dataset.classValue;
    listElements.forEach((element) => {
        element.classList = "";
    });
    contactPage.classList.add("active");
};
expertiseBtn.onclick = () => {
    pagesWrapper.style.left = contactPage.dataset.leftValue;
    rootElement.classList = contactPage.dataset.classValue;
    listElements.forEach((element) => {
        element.classList = "";
    });
    contactPage.classList.add("active");
};

// Typing Animation
const animatingText = document.querySelector(".animating-text");
const animatingCursor = document.querySelector(".animating-cursor");
const words = [
    "Full Stack Web Developer.",
    "UI/UX Designer.",
    "Graphic Designer.",
    "Creative Coder.",
    "Student.",
];
let wordIndex = 0;
let letterIndex = 0;
const type = () => {
    const txt = words[wordIndex];
    if (letterIndex < txt.length) {
        animatingText.textContent += txt.charAt(letterIndex);
        letterIndex++;
        animatingCursor.classList.toggle("animate");
        setTimeout(type, 80);
    } else {
        animatingCursor.classList.toggle("animate");
        setTimeout(erase, 2000);
    }
};
const erase = () => {
    if (animatingText.textContent.length != 0) {
        animatingText.textContent = animatingText.textContent.substring(
            0,
            letterIndex - 1
        );
        letterIndex--;
        animatingCursor.classList.toggle("animate");
        setTimeout(erase, 30);
    } else {
        animatingCursor.classList.toggle("animate");
        wordIndex = wordIndex === words.length - 1 ? 0 : wordIndex + 1;
        setTimeout(type, 500);
    }
};
document.addEventListener("DOMContentLoaded", type());

// Scroll to About to Section
const scrollFunc = () => {
    document.getElementById("about").scrollIntoView({ behavior: "smooth" });
};
document.querySelector(".abt-btn").onclick = scrollFunc;

// Observing the elements on view
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        } else {
            entry.target.classList.remove("show");
        }
    });
});

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((elem) => observer.observe(elem));

// Handle Images Loading
const projectImages = document.querySelectorAll(".image-container img");
projectImages.forEach((image) => {
    image.onload = (event) => handleLoading(event);
});
const handleLoading = (event) => {
    if (event.target.parentNode.tagName === "A") {
        event.target.parentNode.parentNode.classList.remove("loading");
    } else {
        event.target.parentNode.classList.remove("loading");
    }
};

// Mouse Interactions
const cursor = document.getElementById("cursor");
if (cursor) {
    window.addEventListener("mousemove", (event) => {
        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";
    });

    const elementsSelectorList = [
        ".navbar ul li",
        ".btn",
        ".menu",
        "form input",
        "form textarea",
        ".worked-on .tech-list li",
        ".project-card a img",
        ".social-list li",
    ];
    elementsSelectorList.forEach((elementSelector) => {
        document.querySelectorAll(elementSelector).forEach((element) => {
            element.addEventListener("mouseenter", () => {
                cursor.style.transform = "scale(1.5)";
            });
            element.addEventListener("mouseleave", () => {
                cursor.style.transform = "scale(1)";
            });
        });
    });

    // Hide cursor in touch devices like - Smart Phones
    if (window.matchMedia("(pointer:fine)").matches) {
        cursor.style.display = "initial";
    } else {
        cursor.style.display = "none";
    }
}

// Handle Form
const handleSubmit = (event) => {
    event.preventDefault();
    fetch("https://portfolio-messages.onrender.com/message", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            message: document.getElementById("message").value,
        }),
    })
        .then((res) => res.json())
        .then((data) => console.log(data.message))
        .catch(() => console.error("Something went wrong!"));

        document.getElementById("name").value = "";
        document.getElementById("message").value = ""
};
document.getElementById("contact-form").onsubmit = handleSubmit;
