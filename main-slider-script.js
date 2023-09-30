// Variables and initialization (as in your existing code)

handle.addEventListener("mousedown", handleDragStart);
handle.addEventListener("touchstart", handleDragStart);

function handleDragStart(e) {
    isDragging = true;
    imageContainer.style.transition = "none";
    
    if (e.type === "touchstart") {
        // For touch devices, use touch events
        const touchX = e.touches[0].clientX - imageContainer.getBoundingClientRect().left;
        handle.style.left = touchX + "px";
    } else {
        // For desktop, use mouse events
        handle.style.left = e.clientX - imageContainer.getBoundingClientRect().left + "px";
    }
    
    // Add event listeners for both mousemove and touchmove
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("touchmove", handleDrag);
    
    // Add event listener for the end of dragging
    window.addEventListener("mouseup", handleDragEnd);
    window.addEventListener("touchend", handleDragEnd);
}

function handleDrag(e) {
    if (!isDragging) return;

    const containerRect = imageContainer.getBoundingClientRect();
    const mouseX = e.clientX - containerRect.left;
    const touchX = e.touches[0].clientX - containerRect.left;
    const containerWidth = containerRect.width;

    const handleX = Math.max(0, Math.min(e.type === "touchmove" ? touchX : mouseX, containerWidth));
    handle.style.left = handleX + "px";

    const percentage = (handleX / containerWidth) * 100;

    beforeImage.style.clipPath = `polygon(0% 0%, ${percentage}% 0%, ${percentage}% 100%, 0% 100%)`;
    afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
    line.style.left = handleX + "px";
}

function handleDragEnd() {
    if (isDragging) {
        imageContainer.style.transition = "";
    }
    isDragging = false;

    // Remove the event listeners for mousemove, touchmove, and drag end
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("touchmove", handleDrag);
    window.removeEventListener("mouseup", handleDragEnd);
    window.removeEventListener("touchend", handleDragEnd);
}
