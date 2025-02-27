// Navigation and Sidebar Functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('#sidebar ul li').forEach(li => li.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelector(`#sidebar ul li[onclick="showPage('${pageId}')"]`).classList.add('active');
    hideSidebar();
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('visible');
    sidebar.classList.toggle('hidden');
}

function hideSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.remove('visible');
    sidebar.classList.add('hidden');
}

document.addEventListener('click', (e) => {
    const sidebar = document.getElementById('sidebar');
    const sideIcon = document.querySelector('.side-icon');
    if (!sidebar.contains(e.target) && !sideIcon.contains(e.target)) {
        hideSidebar();
    }
});

function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// Post Details Functions
function clearInputs() {
    document.getElementById('headingInput').value = '';
    document.getElementById('descriptionInput').value = '';
    document.getElementById('hashtagsInput').value = '';
    updatePreview();
}

function finishSubInfo() {
    document.getElementById('hashtagsInput').blur();
    updatePreview();
}

// Presets and Global Variables
const presets = {
    educational: {
        name: 'Educational Facts',
        background: '#E6F7FF',
        heading: { font: 'Montserrat Bold', color: '#003366', size: 24 },
        content: { font: 'Open Sans Regular', color: '#00529B', size: 16 },
        subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 }
    },
    guidance: {
        name: 'Helpful Guidance',
        background: '#E8F3E8',
        heading: { font: 'Montserrat Bold', color: '#2E7D32', size: 24 },
        content: { font: 'Open Sans Regular', color: '#388E3C', size: 16 },
        subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 }
    },
    filmmaking: {
        name: 'Filmmaking',
        background: '#FFEBEE',
        heading: { font: 'Montserrat Bold', color: '#8B0000', size: 24 },
        content: { font: 'Open Sans Regular', color: '#B71C1C', size: 16 },
        subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 }
    },
    'ai-tech': {
        name: 'AI Technologies',
        background: '#E3F2FD',
        heading: { font: 'Montserrat Bold', color: '#1565C0', size: 24 },
        content: { font: 'Open Sans Regular', color: '#1E88E5', size: 16 },
        subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 }
    },
    myself: {
        name: 'About Myself',
        background: '#FFF8E1',
        heading: { font: 'Montserrat Bold', color: '#6D4C41', size: 24 },
        content: { font: 'Open Sans Regular', color: '#8D6E63', size: 16 },
        subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 }
    }
};

let currentPreset = null;
let fontValues = { heading: 24, content: 16, subInfo: 12 };
let spaceValues = { h2c: 10, c2s: 10 };
let imageAdjustments = {
    youtube: { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 },
    facebook: { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 },
    instagram: { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 },
    tiktok: { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 },
    twitter: { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 },
    linkedin: { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 },
    threads: { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 }
};
let activePlatform = null;
let bgImage = null;
let middleLayerActive = false;
let activeButton = null;

// Preset and Preview Functions
function updatePreset() {
    const presetValue = document.getElementById('preset').value;
    currentPreset = presetValue ? presets[presetValue] : null;
    const presetInfo = document.getElementById('preset-info');
    
    if (currentPreset) {
        presetInfo.innerHTML = `
            <strong>Preset Name:</strong> ${currentPreset.name}<br>
            <strong>Background Color:</strong> ${currentPreset.background}<br>
            <strong>Heading Font:</strong> ${currentPreset.heading.font} <strong>Color:</strong> ${currentPreset.heading.color}<br>
            <strong>Content Font:</strong> ${currentPreset.content.font} <strong>Color:</strong> ${currentPreset.content.color}<br>
            <strong>Sub-Info Font:</strong> ${currentPreset.subInfo.font} <strong>Color:</strong> ${currentPreset.subInfo.color}
        `;
    } else {
        presetInfo.textContent = 'Select Preset to Display Details';
    }
    updatePreview();
    updateFinalPreview();
}

function updatePreview() {
    const heading = document.getElementById('headingInput').value || 'Heading';
    const description = document.getElementById('descriptionInput').value || 'Description';
    const subInfo = document.getElementById('hashtagsInput').value || 'Sub-info';
    
    const previewHeading = document.getElementById('previewHeading');
    const previewContent = document.getElementById('previewContent');
    const previewSubInfo = document.getElementById('previewSubInfo');
    const postPreview = document.getElementById('postPreview');

    previewHeading.textContent = heading;
    previewContent.textContent = description;
    previewSubInfo.textContent = subInfo;

    if (currentPreset) {
        postPreview.style.background = currentPreset.background;
        previewHeading.style.fontFamily = currentPreset.heading.font.split(' ')[0];
        previewHeading.style.fontWeight = currentPreset.heading.font.includes('Bold') ? 'bold' : 'normal';
        previewHeading.style.color = currentPreset.heading.color;
        previewHeading.style.fontSize = fontValues.heading + 'px';
        previewHeading.style.marginBottom = spaceValues.h2c + 'px';

        previewContent.style.fontFamily = currentPreset.content.font.split(' ')[0];
        previewContent.style.color = currentPreset.content.color;
        previewContent.style.fontSize = fontValues.content + 'px';
        previewContent.style.textAlign = 'center';
        previewContent.style.marginBottom = spaceValues.c2s + 'px';

        previewSubInfo.style.fontFamily = currentPreset.subInfo.font.split(' ')[0];
        previewSubInfo.style.color = currentPreset.subInfo.color;
        previewSubInfo.style.fontSize = fontValues.subInfo + 'px';
    } else {
        postPreview.style.background = '#fff';
        previewHeading.style.fontFamily = 'Montserrat';
        previewHeading.style.fontWeight = 'bold';
        previewHeading.style.color = '#333';
        previewHeading.style.fontSize = fontValues.heading + 'px';
        previewHeading.style.marginBottom = spaceValues.h2c + 'px';

        previewContent.style.fontFamily = 'Open Sans';
        previewContent.style.color = '#333';
        previewContent.style.fontSize = fontValues.content + 'px';
        previewContent.style.textAlign = 'center';
        previewContent.style.marginBottom = spaceValues.c2s + 'px';

        previewSubInfo.style.fontFamily = 'Roboto';
        previewSubInfo.style.color = '#A6A6A6';
        previewSubInfo.style.fontSize = fontValues.subInfo + 'px';
    }
}

// Slider and Customization Functions
function switchCustomizeTab(tab) {
    document.querySelectorAll('.customize .tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.customize .tab-content').forEach(content => content.classList.remove('active'));
    document.querySelector(`.customize button[onclick="switchCustomizeTab('${tab}')"]`).classList.add('active');
    document.getElementById(`${tab}-tab`).classList.add('active');
    hideSlider();
}

function showSlider(type) {
    const sliderContainer = document.getElementById('slider-container');
    const imgSliderContainer = document.getElementById('img-slider-container');
    const rangeSlider = document.getElementById('range-slider');
    const imgRange = document.getElementById('img-range');
    const newButton = document.querySelector(`button[onclick="showSlider('${type}')"]`);
    
    if (activeButton === newButton && (sliderContainer.classList.contains('hidden') === false || imgSliderContainer.classList.contains('hidden') === false)) {
        hideSlider();
        return;
    }

    sliderContainer.classList.add('hidden');
    imgSliderContainer.classList.add('hidden');

    if (type.includes('size') || type.includes('space')) {
        sliderContainer.classList.remove('hidden');
        rangeSlider.min = 8;
        rangeSlider.max = type.includes('size') ? 48 : 30;
        rangeSlider.value = getCurrentValue(type);
        document.getElementById('slider-value').textContent = rangeSlider.value + 'px';
        highlightButton(type);
    } else {
        imgSliderContainer.classList.remove('hidden');
        if (type === 'opacity') {
            imgRange.min = 0;
            imgRange.max = 100;
            imgRange.value = activePlatform ? imageAdjustments[activePlatform].opacity : 100;
        } else if (type === 'blur') {
            imgRange.min = 0;
            imgRange.max = 20;
            imgRange.value = activePlatform ? imageAdjustments[activePlatform].blur : 0;
        } else if (type === 'scale') {
            imgRange.min = -50;
            imgRange.max = 50;
            imgRange.value = activePlatform ? imageAdjustments[activePlatform].scale : 0;
        } else if (type === 'horizontal' || type === 'vertical') {
            imgRange.min = -100;
            imgRange.max = 100;
            imgRange.value = activePlatform ? imageAdjustments[activePlatform][type] : 0;
        }
        document.getElementById('img-slider-value').textContent = imgRange.value + (type === 'opacity' ? '%' : 'px');
        highlightButton(type);
    }
}

function hideSlider() {
    document.getElementById('slider-container').classList.add('hidden');
    document.getElementById('img-slider-container').classList.add('hidden');
    if (activeButton) activeButton.classList.remove('active');
    activeButton = null;
}

document.addEventListener('click', (e) => {
    const sliderContainer = document.getElementById('slider-container');
    const imgSliderContainer = document.getElementById('img-slider-container');
    const isSliderButton = e.target.closest('.button-group button');
    if (!sliderContainer.contains(e.target) && !imgSliderContainer.contains(e.target) && !isSliderButton) {
        hideSlider();
    }
});

function getCurrentValue(type) {
    if (type === 'heading-size') return fontValues.heading;
    if (type === 'content-size') return fontValues.content;
    if (type === 'subinfo-size') return fontValues.subInfo;
    if (type === 'h2c-space') return spaceValues.h2c;
    if (type === 'c2s-space') return spaceValues.c2s;
}

function highlightButton(type) {
    if (activeButton) activeButton.classList.remove('active');
    activeButton = document.querySelector(`button[onclick="showSlider('${type}')"]`);
    if (activeButton) activeButton.classList.add('active');
}

function adjustValue() {
    const value = document.getElementById('range-slider').value;
    document.getElementById('slider-value').textContent = value + 'px';
    if (activeButton) {
        const type = activeButton.getAttribute('onclick').match(/'([^']+)'/)[1];
        if (type === 'heading-size') fontValues.heading = parseInt(value);
        else if (type === 'content-size') fontValues.content = parseInt(value);
        else if (type === 'subinfo-size') fontValues.subInfo = parseInt(value);
        else if (type === 'h2c-space') spaceValues.h2c = parseInt(value);
        else if (type === 'c2s-space') spaceValues.c2s = parseInt(value);
        updatePreview();
        updateFinalPreview();
        updatePixelValues();
    }
}

function adjustImage() {
    const value = document.getElementById('img-range').value;
    const type = activeButton.getAttribute('onclick').match(/'([^']+)'/)[1];
    document.getElementById('img-slider-value').textContent = value + (type === 'opacity' ? '%' : 'px');
    if (activeButton && activePlatform) {
        imageAdjustments[activePlatform][type] = parseInt(value);
        updateFinalPreview();
        updatePixelValues();
    }
}

function updatePixelValues() {
    const fontTab = document.getElementById('font-tab');
    const imageTab = document.getElementById('image-tab');
    if (fontTab) {
        fontTab.querySelectorAll('.px-value').forEach(span => {
            const label = span.previousElementSibling.textContent.toLowerCase();
            if (label === 'heading') span.textContent = `${fontValues.heading}px`;
            else if (label === 'content') span.textContent = `${fontValues.content}px`;
            else if (label === 'sub-info') span.textContent = `${fontValues.subInfo}px`;
            else if (label === 'h2c') span.textContent = `${spaceValues.h2c}px`;
            else if (label === 'c2s') span.textContent = `${spaceValues.c2s}px`;
        });
    }
    if (imageTab && activePlatform) {
        const adj = imageAdjustments[activePlatform];
        imageTab.querySelectorAll('.px-value').forEach(span => {
            const label = span.previousElementSibling.textContent.toLowerCase();
            if (label === 'opacity') span.textContent = `${adj.opacity}%`;
            else if (label === 'blur') span.textContent = `${adj.blur}px`;
            else if (label === 'scale') span.textContent = `${adj.scale}`;
            else if (label === 'horizontal') span.textContent = `${adj.horizontal}px`;
            else if (label === 'vertical') span.textContent = `${adj.vertical}px`;
        });
    }
}

function resetAdjustments() {
    fontValues = { heading: 24, content: 16, subInfo: 12 };
    spaceValues = { h2c: 10, c2s: 10 };
    Object.keys(imageAdjustments).forEach(platform => {
        imageAdjustments[platform] = { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 };
    });
    middleLayerActive = false;
    document.getElementById('middle-layer-btn').classList.remove('active');
    document.getElementById('middle-layer').classList.remove('active');
    hideSlider();
    updatePreview();
    updateFinalPreview();
    updatePixelValues();
}

// Image Management Functions
function loadBackground() {
    const file = document.getElementById('bg-image').files[0];
    if (file) {
        bgImage = URL.createObjectURL(file);
        updateFinalPreview(); // Apply directly to final preview
    }
}

function clearImage(type) {
    if (type === 'background') {
        bgImage = null;
        document.getElementById('bg-image').value = '';
        document.getElementById('background-layer').style.backgroundImage = 'none';
        updateFinalPreview();
    }
}

function dragOver(event) {
    event.preventDefault();
    document.querySelector('.drop-zone').classList.add('dragover');
}

function dragEnter(event) {
    event.preventDefault();
    document.querySelector('.drop-zone').classList.add('dragover');
}

function dragLeave(event) {
    event.preventDefault();
    document.querySelector('.drop-zone').classList.remove('dragover');
}

function dropHandler(event) {
    event.preventDefault();
    document.querySelector('.drop-zone').classList.remove('dragover');
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
        bgImage = URL.createObjectURL(file);
        updateFinalPreview(); // Apply directly to final preview
    }
}

// Platform and Final Preview Functions
function setActivePlatform(platform) {
    activePlatform = platform;
    updateFinalPreview();
    updatePixelValues();
}

function toggleMiddleLayer() {
    middleLayerActive = !middleLayerActive;
    const middleLayer = document.getElementById('middle-layer');
    const btn = document.getElementById('middle-layer-btn');
    middleLayer.classList.toggle('active', middleLayerActive);
    btn.classList.toggle('active', middleLayerActive);
    updateFinalPreview();
}

function updateFinalPreview() {
    const backgroundLayer = document.getElementById('background-layer');
    const middleLayer = document.getElementById('middle-layer');
    const textLayer = document.getElementById('text-layer');
    const finalPreview = document.getElementById('final-preview-box');
    const postPreview = document.getElementById('postPreview');

    // Copy content from post preview
    textLayer.innerHTML = postPreview.innerHTML;

    // Handle background image display
    if (bgImage && !middleLayerActive) {
        backgroundLayer.style.backgroundImage = `url(${bgImage})`;
        finalPreview.style.background = 'none'; // Clear container background to show image
        if (activePlatform) {
            const adjustments = imageAdjustments[activePlatform];
            backgroundLayer.style.backgroundSize = `${100 + adjustments.scale}%`; // Scale adjustment
            backgroundLayer.style.backgroundPosition = `${adjustments.horizontal}px ${adjustments.vertical}px`;
            backgroundLayer.style.opacity = adjustments.opacity / 100;
            backgroundLayer.style.filter = `blur(${adjustments.blur}px)`;
        } else {
            backgroundLayer.style.backgroundSize = 'cover'; // Default to cover
            backgroundLayer.style.backgroundPosition = 'center';
            backgroundLayer.style.opacity = 1;
            backgroundLayer.style.filter = 'none';
        }
    } else {
        backgroundLayer.style.backgroundImage = 'none';
        if (middleLayerActive && currentPreset) {
            middleLayer.style.backgroundColor = currentPreset.background;
            finalPreview.style.background = 'none';
        } else {
            middleLayer.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
            finalPreview.style.background = currentPreset ? currentPreset.background : '#fff';
        }
    }

    // Apply platform-specific aspect ratio
    if (activePlatform) {
        setAspectRatio(activePlatform);
    } else {
        finalPreview.style.aspectRatio = '1/1'; // Default square if no platform selected
    }

    // Ensure proper sizing
    finalPreview.style.width = '100%';
    finalPreview.style.height = 'auto';

    // Adjust text sizing
    const heading = textLayer.querySelector('h3');
    const content = textLayer.querySelector('p');
    const subInfo = textLayer.querySelector('span');
    if (heading) heading.style.fontSize = fontValues.heading + 'px';
    if (heading) heading.style.marginBottom = spaceValues.h2c + 'px';
    if (content) content.style.fontSize = fontValues.content + 'px';
    if (content) content.style.marginBottom = spaceValues.c2s + 'px';
    if (subInfo) subInfo.style.fontSize = fontValues.subInfo + 'px';
}

function setAspectRatio(platform) {
    const finalPreview = document.getElementById('final-preview-box');
    const platformInfo = document.getElementById('platform-info');
    const ratios = {
        youtube: { ratio: '16:9', resolution: '1920x1080' },
        facebook: { ratio: '1:1', resolution: '1200x1200' },
        instagram: { ratio: '4:5', resolution: '1080x1350' },
        tiktok: { ratio: '9:16', resolution: '1080x1920' },
        twitter: { ratio: '3:2', resolution: '1200x800' },
        linkedin: { ratio: '1:1', resolution: '1200x1200' },
        threads: { ratio: '9:16', resolution: '1080x1920' }
    };
    const [width, height] = ratios[platform].ratio.split(':');
    finalPreview.style.aspectRatio = `${width}/${height}`;
    platformInfo.textContent = `Aspect Ratio: ${ratios[platform].ratio}, Resolution: ${ratios[platform].resolution}`;
}

// Export Functions
function toggleCheckAll() {
    const checkboxes = document.querySelectorAll('input[name="platform"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
}

function exportPosts() {
    const checkboxes = document.querySelectorAll('input[name="platform"]:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one platform to export.');
        return;
    }
    const heading = document.getElementById('headingInput').value || 'post';
    checkboxes.forEach(cb => {
        activePlatform = cb.value;
        updateFinalPreview();
        const finalPreview = document.getElementById('final-preview-box');
        finalPreview.style.borderRadius = '0';
        
        setTimeout(() => {
            html2canvas(finalPreview, { 
                backgroundColor: null,
                scale: 2 
            }).then(canvas => {
                const link = document.createElement('a');
                link.download = `${heading}-${activePlatform}.jpg`;
                link.href = canvas.toDataURL('image/jpeg', 0.9);
                link.click();
                finalPreview.style.borderRadius = '15px';
            }).catch(error => {
                console.error('Error exporting post:', error);
                alert('Failed to export the post. Check the console for details.');
            });
        }, 100);
    });
}

// Feedback Form Submission
document.getElementById('feedback-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('https://your-backend-api.com/feedback', {
        method: 'POST',
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => alert('Feedback submitted successfully!'))
    .catch(error => console.error('Error submitting feedback:', error));
    e.target.reset();
});

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
    updatePixelValues();

    document.getElementById('headingInput').addEventListener('input', updatePreview);
    document.getElementById('descriptionInput').addEventListener('input', updatePreview);
    document.getElementById('hashtagsInput').addEventListener('input', updatePreview);

    document.querySelectorAll('.platform label').forEach(label => {
        label.addEventListener('click', (e) => {
            const platform = label.querySelector('input').value;
            setActivePlatform(platform);
        });
    });
});