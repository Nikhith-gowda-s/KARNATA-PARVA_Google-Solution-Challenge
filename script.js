const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png'];
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const fileInput = document.getElementById('file-input');
const imagePreview = document.getElementById('image-preview');
const previewContainer = document.getElementById('preview-container');
const uploadArea = document.getElementById('upload-area');
const removeImageBtn = document.getElementById('remove-image');
const checkImageBtn = document.getElementById('check-image-btn');
const imageError = document.getElementById('image-error');
const checkTextBtn = document.getElementById('check-text-btn');
const resultText = document.getElementById('result-text');
const textarea = document.querySelector('textarea');
function init() {
    setupTabSwitching();
    setupImageUpload();
    setupTextAnalysis();
}
function setupTabSwitching() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
            
            resultText.textContent = "Select a tab and submit content for analysis";
        });
    });
}

function setupImageUpload() {
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = 'var(--google-blue)';
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '#ddd';
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#ddd';
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            handleFileSelect();
        }
    });
    
    fileInput.addEventListener('change', handleFileSelect);
    removeImageBtn.addEventListener('click', removeImage);
    checkImageBtn.addEventListener('click', analyzeImage);
}

function handleFileSelect() {
    imageError.textContent = '';
    const file = fileInput.files[0];
    
    if (!file) return;
    
    if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        imageError.textContent = 'Only JPG/PNG images are allowed';
        return;
    }
    
    if (file.size > MAX_FILE_SIZE) {
        imageError.textContent = 'File size must be less than 5MB';
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        imagePreview.src = e.target.result;
        uploadArea.style.display = 'none';
        previewContainer.style.display = 'block';
        checkImageBtn.disabled = false;
    }
    reader.readAsDataURL(file);
}

function removeImage() {
    fileInput.value = '';
    uploadArea.style.display = 'block';
    previewContainer.style.display = 'none';
    checkImageBtn.disabled = true;
    imageError.textContent = '';
}

async function analyzeImage() {
    const file = fileInput.files[0];
    if (!file) {
        imageError.textContent = 'Please select an image first';
        return;
    }
    
    checkImageBtn.disabled = true;
    checkImageBtn.innerHTML = '<span>Analyzing...</span> <i class="fas fa-spinner fa-spin"></i>';
    
    try {
        const result = await mockImageAnalysis(file);
        displayResult(result);
    } catch (error) {
        resultText.textContent = 'Error analyzing image. Please try again.';
        console.error('Analysis error:', error);
    } finally {
        checkImageBtn.disabled = false;
        checkImageBtn.innerHTML = '<span>Check Image Authenticity</span> <i class="fas fa-camera"></i>';
    }
}

function mockImageAnalysis(file) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const random = Math.random();
            if (random < 0.3) {
                resolve({
                    title: "✅ Authentic Image",
                    message: "No signs of manipulation detected",
                    confidence: (80 + Math.random() * 15).toFixed(0),
                    details: "This image appears to be original and unaltered."
                });
            } else if (random < 0.6) {
                resolve({
                    title: "⚠️ Possible Manipulation",
                    message: "Signs of potential editing detected",
                    confidence: (60 + Math.random() * 20).toFixed(0),
                    details: "The image shows inconsistencies that suggest digital alteration."
                });
            } else {
                resolve({
                    title: "❌ Fake Image Detected",
                    message: "This image contains manipulated content",
                    confidence: (85 + Math.random() * 10).toFixed(0),
                    details: "This image has been identified as part of known disinformation campaigns."
                });
            }
        }, 2000);
    });
}

function setupTextAnalysis() {
    checkTextBtn.addEventListener('click', analyzeText);
}

function analyzeText() {
    const text = textarea.value.trim();
    
    if (!text) {
        resultText.innerHTML = "⚠️ Please enter some text to analyze.";
        return;
    }
    
    checkTextBtn.disabled = true;
    checkTextBtn.innerHTML = '<span>Analyzing Text...</span> <i class="fas fa-spinner fa-spin"></i>';
    
    setTimeout(() => {
        const random = Math.random();
        let result;
        
        if (random < 0.4) {
            result = {
                title: "✅ Credible Content",
                message: "This text appears to be trustworthy.",
                confidence: (80 + Math.random() * 10).toFixed(0)
            };
        } else if (random < 0.7) {
            result = {
                title: "⚠️ Suspicious Content",
                message: "This text shows signs of potential misinformation.",
                confidence: (65 + Math.random() * 10).toFixed(0)
            };
        } else {
            result = {
                title: "❌ Fake News Detected",
                message: "This text is likely to contain false information.",
                confidence: (85 + Math.random() * 10).toFixed(0),
                details: "The content matches known patterns of disinformation."
            };
        }
        
        displayResult(result);
        checkTextBtn.disabled = false;
        checkTextBtn.innerHTML = '<span>Check Text Authenticity</span> <i class="fas fa-search"></i>';
    }, 1500);
}

function displayResult(result) {
    resultText.innerHTML = `
        <strong>${result.title}</strong><br>
        ${result.message}<br><br>
        Confidence: ${result.confidence}%<br>
        ${result.details ? `<br>${result.details}` : ''}
    `;
}

document.addEventListener('DOMContentLoaded', init);
