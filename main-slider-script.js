// Wait for the DOM content to fully load
document.addEventListener("DOMContentLoaded", function() {
    // JavaScript for Image Comparison Module
    const handle = document.querySelector(".handle");
    const beforeImage = document.querySelector(".before-image");
    const afterImage = document.querySelector(".after-image");
    const imageContainer = document.querySelector(".image-container");
    const line = document.querySelector(".line");

    let isDragging = false;

    function initializeSlider() {
        const containerRect = imageContainer.getBoundingClientRect();
        const containerWidth = containerRect.width;

        // Initial handle position (center)
        const initialHandleX = containerWidth / 2;

        // Set the initial handle position and clip path
        handle.style.left = initialHandleX + "px";
        updateClipPath(initialHandleX, containerWidth);
    }

    function updateClipPath(handleX, containerWidth) {
        const percentage = (handleX / containerWidth) * 100;

        beforeImage.style.clipPath = `polygon(0% 0%, ${percentage}% 0%, ${percentage}% 100%, 0% 100%)`;
        afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
        line.style.left = handleX + "px";
    }

    initializeSlider(); // Call the initialization function

    handle.addEventListener("mousedown", startDrag);
    handle.addEventListener("touchstart", startDrag);

    function startDrag(e) {
        isDragging = true;
        imageContainer.style.transition = "none";

        // Prevent default behavior for touch events
        if (e.type === "touchstart") {
            e.preventDefault();
        }

        // Calculate the initial position of the handle relative to the mouse/touch event
        const handleRect = handle.getBoundingClientRect();
        const offsetX = e.clientX - handleRect.left;

        window.addEventListener("mousemove", moveSlider);
        window.addEventListener("touchmove", moveSlider);

        function moveSlider(e) {
            if (!isDragging) return;

            let clientX;

            if (e.type === "mousemove") {
                clientX = e.clientX;
            } else if (e.type === "touchmove") {
                clientX = e.touches[0].clientX;
            }

            // Calculate the new handle position while considering the initial offset
            const handleX = clientX - offsetX;
            const containerWidth = imageContainer.clientWidth;

            const clampedHandleX = Math.max(0, Math.min(handleX, containerWidth));
            handle.style.left = clampedHandleX + "px";
            updateClipPath(clampedHandleX, containerWidth);
        }

        window.addEventListener("mouseup", stopDrag);
        window.addEventListener("touchend", stopDrag);

        function stopDrag() {
            if (isDragging) {
                imageContainer.style.transition = "";
            }
            isDragging = false;

            window.removeEventListener("mousemove", moveSlider);
            window.removeEventListener("touchmove", moveSlider);
            window.removeEventListener("mouseup", stopDrag);
            window.removeEventListener("touchend", stopDrag);
        }
    }
});
