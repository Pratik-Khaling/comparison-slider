document.addEventListener("DOMContentLoaded", function() {// JavaScript for Image Comparison Module
const handle = document.querySelector(".handle");
const beforeImage = document.querySelector(".before-image");
const afterImage = document.querySelector(".after-image");
const imageContainer = document.querySelector(".image-container");
const line = document.querySelector(".line");

function initializeSlider() {
    const containerRect = imageContainer.getBoundingClientRect();
    const initialHandleX = containerRect.width / 2; // Initial handle position (center)

    // Set the initial handle position and clip path
    handle.style.left = initialHandleX + "px";
    beforeImage.style.clipPath = `polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)`;
    afterImage.style.clipPath = `polygon(50% 0%, 100% 0%, 100% 100%, 50% 100%)`;
    line.style.left = initialHandleX + "px";
}

initializeSlider(); // Call the initialization function

let isDragging = false;

handle.addEventListener("mousedown", (e) => {
    isDragging = true;
    imageContainer.style.transition = "none";
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;

    const containerRect = imageContainer.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const containerWidth = containerRect.width;

    const handleX = Math.max(0, Math.min(mouseX, containerWidth));
    handle.style.left = handleX + "px";

    const percentage = (handleX / containerWidth) * 100;

    beforeImage.style.clipPath = `polygon(0% 0%, ${percentage}% 0%, ${percentage}% 100%, 0% 100%)`;
    afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
    line.style.left = handleX + "px";
});

window.addEventListener("mouseup", () => {
    if (isDragging) {
        imageContainer.style.transition = "";
    }
    isDragging = false;
});
});
