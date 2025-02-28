// Navigation and Sidebar Functions
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.querySelectorAll('#sidebar ul li').forEach(li => li.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
    document.querySelector(`#sidebar ul li[onclick="showPage('${pageId}')"]`).classList.add('active');
    hideSidebar();
    updatePreview();
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
    educational: { name: 'Educational Facts', background: '#E6F7FF', heading: { font: 'Montserrat Bold', color: '#003366', size: 24 }, content: { font: 'Open Sans Regular', color: '#00529B', size: 16 }, subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 } },
    guidance: { name: 'Helpful Guidance', background: '#E8F3E8', heading: { font: 'Montserrat Bold', color: '#2E7D32', size: 24 }, content: { font: 'Open Sans Regular', color: '#388E3C', size: 16 }, subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 } },
    filmmaking: { name: 'Filmmaking', background: '#FFEBEE', heading: { font: 'Montserrat Bold', color: '#8B0000', size: 24 }, content: { font: 'Open Sans Regular', color: '#B71C1C', size: 16 }, subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 } },
    'ai-tech': { name: 'AI Technologies', background: '#E3F2FD', heading: { font: 'Montserrat Bold', color: '#1565C0', size: 24 }, content: { font: 'Open Sans Regular', color: '#1E88E5', size: 16 }, subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 } },
    myself: { name: 'About Myself', background: '#FFF8E1', heading: { font: 'Montserrat Bold', color: '#6D4C41', size: 24 }, content: { font: 'Open Sans Regular', color: '#8D6E63', size: 16 }, subInfo: { font: 'Roboto Light', color: '#A6A6A6', size: 12 } }
};

let currentPreset = 'guidance'; // Default to guidance preset
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
let defaultImageAdjustments = { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 };
let activePlatform = 'instagram'; // Default to Instagram for 4:5 aspect ratio
let bgImage = null;
let middleLayerActive = false;
let activeButton = null;

// Preset and Preview Functions
function updatePreset() {
    const presetValue = document.getElementById('preset').value || 'guidance'; // Default to guidance
    currentPreset = presetValue ? presets[presetValue] : presets['guidance'];
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
    const heading = document.getElementById('headingInput').value || 'Tip for a Better Life';
    const description = document.getElementById('descriptionInput').value || 'Start your day with gratitude: Take 5 minutes every morning to write down 3 things you\'re grateful for. This simple practice can improve your mood and mindset throughout the day! 🌟';
    const subInfo = document.getElementById('hashtagsInput').value || '#SelfImprovement #Gratitude #himthilina';
    
    const previewHeading = document.getElementById('previewHeading');
    const previewContent = document.getElementById('previewContent');
    const previewSubInfo = document.getElementById('previewSubInfo');
    const postPreview = document.getElementById('postPreview');

    previewHeading.textContent = heading;
    previewContent.textContent = description;
    previewSubInfo.textContent = subInfo;

    const adjustments = activePlatform ? imageAdjustments[activePlatform] : defaultImageAdjustments;
    if (bgImage) {
        postPreview.style.backgroundImage = `url(${bgImage})`;
        postPreview.style.backgroundSize = '100%'; // Smaller preview size
        postPreview.style.backgroundPosition = 'center';
        postPreview.style.opacity = adjustments.opacity / 100;
        postPreview.style.filter = `blur(${adjustments.blur}px)`;
    } else if (currentPreset) {
        postPreview.style.backgroundImage = 'none';
        postPreview.style.background = currentPreset.background;
        postPreview.style.opacity = 1;
        postPreview.style.filter = 'none';
    } else {
        postPreview.style.backgroundImage = 'none';
        postPreview.style.background = '#fff';
        postPreview.style.opacity = 1;
        postPreview.style.filter = 'none';
    }

    // Apply aspect ratio to preview (default to Instagram 4:5)
    if (activePlatform) {
        const ratios = {
            youtube: '16/9', facebook: '1/1', instagram: '4/5', tiktok: '9/16',
            twitter: '3/2', linkedin: '1/1', threads: '9/16'
        };
        postPreview.style.aspectRatio = ratios[activePlatform];
    } else {
        postPreview.style.aspectRatio = '4/5'; // Default to Instagram
    }

    if (currentPreset) {
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
    document.querySelectorAll('.customize .tab-btn').forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });
    document.querySelectorAll('.customize .tab-content').forEach(content => content.classList.remove('active'));
    const activeBtn = document.querySelector(`.customize button[onclick="switchCustomizeTab('${tab}')"]`);
    activeBtn.classList.add('active');
    activeBtn.setAttribute('aria-selected', 'true');
    document.getElementById(`${tab}-tab`).classList.add('active');
    hideSlider();
}

function showSlider(type) {
    const sliderContainer = document.getElementById('slider-container');
    const imgSliderContainer = document.getElementById('img-slider-container');
    const rangeSlider = document.getElementById('range-slider');
    const imgRange = document.getElementById('img-range');
    const newButton = document.querySelector(`button[onclick="showSlider('${type}')"]`);
    
    if (activeButton === newButton && (!sliderContainer.classList.contains('hidden') || !imgSliderContainer.classList.contains('hidden'))) {
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
            imgRange.value = activePlatform ? imageAdjustments[activePlatform].opacity : defaultImageAdjustments.opacity;
        } else if (type === 'blur') {
            imgRange.min = 0;
            imgRange.max = 20;
            imgRange.value = activePlatform ? imageAdjustments[activePlatform].blur : defaultImageAdjustments.blur;
        } else if (type === 'scale') {
            imgRange.min = -50;
            imgRange.max = 50;
            imgRange.value = activePlatform ? imageAdjustments[activePlatform].scale : defaultImageAdjustments.scale;
        } else if (type === 'horizontal' || type === 'vertical') {
            imgRange.min = -100;
            imgRange.max = 100;
            imgRange.value = activePlatform ? imageAdjustments[activePlatform][type] : defaultImageAdjustments[type];
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
    if (activeButton) {
        if (activePlatform) {
            imageAdjustments[activePlatform][type] = parseInt(value);
        } else {
            defaultImageAdjustments[type] = parseInt(value);
        }
        updateFinalPreview();
        updatePreview();
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
    if (imageTab) {
        const adj = activePlatform ? imageAdjustments[activePlatform] : defaultImageAdjustments;
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
    defaultImageAdjustments = { opacity: 100, blur: 0, scale: 0, horizontal: 0, vertical: 0 };
    middleLayerActive = false;
    document.getElementById('middle-layer-btn').classList.remove('active');
    document.getElementById('middle-layer-btn').setAttribute('aria-pressed', 'false');
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
        if (!file.type.startsWith('image/')) {
            alert('Please upload a valid image file (e.g., JPG, PNG).');
            document.getElementById('bg-image').value = '';
            return;
        }
        if (bgImage) URL.revokeObjectURL(bgImage);
        bgImage = URL.createObjectURL(file);
        updatePreview();
        updateFinalPreview();
    }
}

function clearImage(type) {
    if (type === 'background') {
        if (bgImage) {
            URL.revokeObjectURL(bgImage);
            bgImage = null;
        }
        document.getElementById('bg-image').value = '';
        document.getElementById('background-layer').style.backgroundImage = 'none';
        updatePreview();
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
    if (file) {
        if (!file.type.startsWith('image/')) {
            alert('Please drop a valid image file (e.g., JPG, PNG).');
            return;
        }
        if (bgImage) URL.revokeObjectURL(bgImage);
        bgImage = URL.createObjectURL(file);
        updatePreview();
        updateFinalPreview();
    }
}

// Platform and Final Preview Functions
function setActivePlatform(platform) {
    activePlatform = platform;
    updateFinalPreview();
    updatePreview();
    updatePixelValues();
}

function toggleMiddleLayer() {
    middleLayerActive = !middleLayerActive;
    const middleLayer = document.getElementById('middle-layer');
    const btn = document.getElementById('middle-layer-btn');
    middleLayer.classList.toggle('active', middleLayerActive);
    btn.classList.toggle('active', middleLayerActive);
    btn.setAttribute('aria-pressed', middleLayerActive ? 'true' : 'false');
    updateFinalPreview();
}

function updateFinalPreview() {
    const backgroundLayer = document.getElementById('background-layer');
    const middleLayer = document.getElementById('middle-layer');
    const textLayer = document.getElementById('text-layer');
    const finalPreview = document.getElementById('final-preview-box');
    const postPreview = document.getElementById('postPreview');

    textLayer.innerHTML = postPreview.innerHTML;

    const adjustments = activePlatform ? imageAdjustments[activePlatform] : defaultImageAdjustments;
    if (bgImage && !middleLayerActive) {
        backgroundLayer.style.backgroundImage = `url(${bgImage})`;
        backgroundLayer.style.backgroundSize = 'cover'; // Fill the canvas fully
        backgroundLayer.style.backgroundPosition = `${adjustments.horizontal}px ${adjustments.vertical}px`; // Allow manual positioning
        backgroundLayer.style.opacity = adjustments.opacity / 100;
        backgroundLayer.style.filter = `blur(${adjustments.blur}px) scale(${1 + adjustments.scale / 100})`; // Apply scale as a multiplier
        finalPreview.style.background = 'none';
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

    if (activePlatform) {
        setAspectRatio(activePlatform);
    } else {
        finalPreview.style.aspectRatio = '4/5'; // Default to Instagram
    }

    finalPreview.style.width = '100%';
    finalPreview.style.height = 'auto';
    finalPreview.style.borderRadius = '15px'; // Match rounded corners
    finalPreview.style.background = '#333'; // Dark background for preview

    const heading = textLayer.querySelector('h3');
    const content = textLayer.querySelector('p');
    const subInfo = textLayer.querySelector('span');
    if (heading) {
        heading.style.fontSize = fontValues.heading + 'px';
        heading.style.marginBottom = spaceValues.h2c + 'px';
    }
    if (content) {
        content.style.fontSize = fontValues.content + 'px';
        content.style.marginBottom = spaceValues.c2s + 'px';
    }
    if (subInfo) subInfo.style.fontSize = fontValues.subInfo + 'px';
}

function setAspectRatio(platform) {
    const finalPreview = document.getElementById('final-preview-box');
    const platformInfo = document.getElementById('platform-info');
    const ratios = {
        youtube: { ratio: '16/9', resolution: '1920x1080' },
        facebook: { ratio: '1/1', resolution: '1200x1200' },
        instagram: { ratio: '4/5', resolution: '1080x1350' },
        tiktok: { ratio: '9/16', resolution: '1080x1920' },
        twitter: { ratio: '3/2', resolution: '1200x800' },
        linkedin: { ratio: '1/1', resolution: '1200x1200' },
        threads: { ratio: '9/16', resolution: '1080x1920' }
    };
    const [width, height] = ratios[platform].ratio.split('/');
    finalPreview.style.aspectRatio = `${width}/${height}`;
    platformInfo.textContent = `Aspect Ratio: ${ratios[platform].ratio}, Resolution: ${ratios[platform].resolution}`;
}

// Export Functions
function toggleCheckAll() {
    const checkboxes = document.querySelectorAll('input[name="platform"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);
    checkboxes.forEach(cb => cb.checked = !allChecked);
}

async function exportPosts() {
    const checkboxes = document.querySelectorAll('input[name="platform"]:checked');
    if (checkboxes.length === 0) {
        alert('Please select at least one platform to export.');
        return;
    }
    const exportBtn = document.getElementById('export-btn');
    exportBtn.disabled = true;
    exportBtn.textContent = 'Exporting...';
    
    const heading = document.getElementById('headingInput').value || 'Tip for a Better Life';
    const finalPreview = document.getElementById('final-preview-box');
    const backgroundLayer = document.getElementById('background-layer');
    finalPreview.style.borderRadius = '0'; // Remove border radius for export

    for (const cb of checkboxes) {
        activePlatform = cb.value;
        updateFinalPreview();

        // Temporarily move background to finalPreview for export
        const adjustments = activePlatform ? imageAdjustments[activePlatform] : defaultImageAdjustments;
        if (bgImage && !middleLayerActive) {
            finalPreview.style.backgroundImage = backgroundLayer.style.backgroundImage;
            finalPreview.style.backgroundSize = 'cover'; // Fill the canvas fully
            finalPreview.style.backgroundPosition = `${adjustments.horizontal}px ${adjustments.vertical}px`; // Apply manual positioning
            finalPreview.style.opacity = adjustments.opacity / 100;
            finalPreview.style.filter = `blur(${adjustments.blur}px) scale(${1 + adjustments.scale / 100})`; // Apply scale
            backgroundLayer.style.backgroundImage = 'none';
        }

        await new Promise(resolve => requestAnimationFrame(resolve));
        try {
            const canvas = await html2canvas(finalPreview, { 
                backgroundColor: null,
                scale: 2 
            });
            const link = document.createElement('a');
            link.download = `${heading}-${activePlatform}.jpg`;
            link.href = canvas.toDataURL('image/jpeg', 0.9);
            link.click();
        } catch (error) {
            console.error('Error exporting post:', error);
            alert(`Failed to export for ${activePlatform}. Check console for details.`);
        }

        // Revert background styling
        if (bgImage && !middleLayerActive) {
            backgroundLayer.style.backgroundImage = `url(${bgImage})`;
            finalPreview.style.backgroundImage = 'none';
            finalPreview.style.opacity = 1;
            finalPreview.style.filter = 'none';
        }
    }
    finalPreview.style.borderRadius = '15px'; // Restore border radius
    exportBtn.disabled = false;
    exportBtn.textContent = 'Export Posts';
}

// Feedback Form Submission
document.getElementById('feedback-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    const formData = new FormData(form);
    console.log('Feedback submitted:', Object.fromEntries(formData));
    alert('Feedback submitted successfully! (Note: This is a demo - feedback is logged to console, not sent to a server.)');
    form.reset();
});

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    updatePreview();
    updatePixelValues();

    const debouncedUpdatePreview = debounce(updatePreview, 200);
    document.getElementById('headingInput').addEventListener('input', debouncedUpdatePreview);
    document.getElementById('descriptionInput').addEventListener('input', debouncedUpdatePreview);
    document.getElementById('hashtagsInput').addEventListener('input', debouncedUpdatePreview);

    document.querySelectorAll('.platform label').forEach(label => {
        label.addEventListener('click', (e) => {
            const platform = label.querySelector('input').value;
            setActivePlatform(platform);
        });
    });

    document.getElementById('bg-image').addEventListener('change', loadBackground);
    // Set default platform to Instagram for 4:5 aspect ratio
    setActivePlatform('instagram');
});

// Clean up on page unload
window.addEventListener('unload', () => {
    if (bgImage) URL.revokeObjectURL(bgImage);
});
