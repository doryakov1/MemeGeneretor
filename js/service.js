'use strict'

let gImgs;
let gMemes;
let gKeywords = { 'happy': 12, 'funny puk': 1 }


//  **     create   ** //


function createImages() {
    gImgs = [];
    for (let i = 0; i < 25; i++) {
        gImgs.push({
            id: i + 1,
            url: `img/${i+1}.jpg`,
        });
    }
    gImgs[0].keywords = ['happy'];
    gImgs[1].keywords = ['funny puk'];
    gImgs[2].keywords = ['happy'];
    gImgs[3].keywords = ['happy'];
    gImgs[4].keywords = ['dog'];
    gImgs[5].keywords = ['cool'];
}

function createMemes() {
    gMemes = [{
            text: '',
            width: gCanvas.width / 2,
            height: 55,
            font: '40pt Calibri',
            textAlign: 'center',
            fillStyle: '#FFFFFF',
            strokeStyle: '#000000'
        },
        {
            text: '',
            width: gCanvas.width / 2,
            height: gCanvas.height / 2,
            font: '40pt Calibri',
            textAlign: 'center',
            fillStyle: '#FFFFFF',
            strokeStyle: '#000000'
        },
        {
            text: '',
            width: gCanvas.width / 2,
            height: gCanvas.height - 10,
            font: '40pt Calibri',
            textAlign: 'center',
            fillStyle: '#FFFFFF',
            strokeStyle: '#000000'
        }
    ]
}


//  **     get    ** //


function getTextFont(value) {
    let textFont = gCtx.font.split(' ')[0];
    textFont = textFont.match(/\d+/g).map(Number)[0];
    textFont += value;
    textFont += 'px   Calibri';
    return textFont;
}

function getCurrentLine() {
    return gMemes[parseInt(gCtx.line)];
}