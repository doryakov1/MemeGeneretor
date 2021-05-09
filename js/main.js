'use strict'

let gCanvas;
let gCtx;
let gImgSrc;

function onInit() {
    initCanvas()
    createMemes()
    createImages()
    renderImages()
    onLinesSwitch('line', 1)
}

function initCanvas() {
    gCanvas = document.querySelector(`.my-canvas`);
    gCtx = gCanvas.getContext(`2d`);
    gCanvas.width = window.innerWidth - 380;
    gCanvas.height = window.innerHeight - 157;
}


//  **     upload/download    ** //


function onSelectedImg(imgId) {
    gImgSrc = `img/` + imgId + `.jpg`;
    ToggleEditorModal('show')
    createMemes()
    renderCanvas();
}

function onDownloadCanvas(elLink) {
    const data = gCanvas.toDataURL()
    elLink.href = data;
    elLink.download = `MyMeme.jpg`;
}


function onFileInputChange(ev) {
    createMemes()
    handleImageFromInput(ev, renderCanvasFile)
}

function handleImageFromInput(ev, onImageReady) {
    let reader = new FileReader();
    reader.onload = function(event) {
        let img = new Image();
        img.onload = onImageReady.bind(null, img)
        gImgSrc = img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);

}


//  **     modal    ** //


function ToggleEditorModal(key) {
    if (key === 'show') {
        document.querySelector('.editor-panal').style.display = 'block';
        document.querySelector('header').style.display = 'none';
        gCanvas.style.display = 'block';
        document.querySelector('.main-wrapper').style.background = '#323232';
        document.querySelector('.meme-images').style.display = 'none';
        document.querySelector('.second-panel').style.display = 'block';
    } else if (key === 'hide') {
        document.querySelector('.editor-panal').style.display = 'none';
        document.querySelector('.main-wrapper').style.background = 'white';
        document.querySelector('header').style.display = 'block';
        document.querySelector('body').style.background = 'white';
        gCanvas.style.display = 'none';
        document.querySelector('.meme-images').style.display = 'flex';
        document.querySelector('.second-panel').style.display = 'none';
    }

}


//  **     on/set    ** //


function onLinesSwitch(key, value) {
    gCtx[key] = value;
    renderLineValues()
}

function onTextFontSize(value) {
    let textLine = getCurrentLine()
    textLine.font = getTextFont(value)
    document.querySelector('.font-size').textContent = textLine.font;
    drawingTextOnCanvas()
}

function onTextColor(key, value) {
    let textLine = getCurrentLine()
    textLine[key] = value;
    drawingTextOnCanvas()
}

function onTextContent(textValue) {
    let textLine = getCurrentLine()
    textLine.text = textValue;
    document.querySelector('.meme-text').value = textLine.text;
    drawingTextOnCanvas()
}

function OnTextAlign(key, value) {
    let textLine = getCurrentLine()
    textLine[key] = value;
    drawingTextOnCanvas()
}


//  **     render    ** //


function drawingTextOnCanvas() {
    renderCanvas()
    renderLines()
}


function renderLines() {
    gMemes.forEach(textLine => {
        gCtx.fillStyle = textLine.fillStyle;
        gCtx.strokeStyle = textLine.strokeStyle;
        gCtx.font = textLine.font;
        gCtx.textAlign = textLine.textAlign;
        gCtx.fillText(textLine.text, textLine.width, textLine.height);
        gCtx.strokeText(textLine.text, textLine.width, textLine.height);
    });
    resetCurrentLineValues()
}

function renderLineValues() {
    let textLine = getCurrentLine()
    document.querySelector('.meme-text').value = textLine.text;
    document.querySelector('.font-size').textContent = textLine.font;
    document.querySelector('.fill-style').value = textLine.fillStyle;
    document.querySelector('.stroke-style').value = textLine.strokeStyle;
}

function renderCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    let img = new Image();
    img.src = gImgSrc;
    gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
}

function renderCanvasFile(img) {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    gCtx.drawImage(img, 0, 0);
}

function renderImages() {
    gImgs.forEach(img => {
        document.querySelector(`.meme-images`).innerHTML += `
        <div><img onclick='onSelectedImg(${img.id})' src='${img.url}'></div>`
    });
}


//  **     reset line    ** //


function resetCurrentLineValues() {
    let textLine = getCurrentLine()
    gCtx.fillStyle = textLine.fillStyle;
    gCtx.strokeStyle = textLine.strokeStyle;
    gCtx.font = textLine.font;
    gCtx.textAlign = textLine.textAlign;
}
``