function updatePreview() {
    // ... existing code ...
    const postPreview = document.getElementById('postPreview');

    previewHeading.textContent = heading;
    previewContent.textContent = description;
    previewSubInfo.textContent = subInfo;

    const adjustments = activePlatform ? imageAdjustments[activePlatform] : defaultImageAdjustments;
    if (bgImage) {
        postPreview.style.backgroundImage = `url(${bgImage})`;
        postPreview.style.backgroundSize = 'cover';
        postPreview.style.backgroundPosition = 'center';
        postPreview.style.opacity = adjustments.opacity / 100;
        postPreview.style.filter = `blur(${adjustments.blur}px)`;
    } else if (currentPreset) {
        // ... existing code ...
    } else {
        // ... existing code ...
    }

    // Apply aspect ratio if a platform is active
    if (activePlatform) {
        const ratios = {
            youtube: '16/9', facebook: '1/1', instagram: '4/5', tiktok: '9/16',
            twitter: '3/2', linkedin: '1/1', threads: '9/16'
        };
        postPreview.style.aspectRatio = ratios[activePlatform];
    } else {
        postPreview.style.aspectRatio = '1/1'; // Default
    }

    // ... rest of the function ...
}