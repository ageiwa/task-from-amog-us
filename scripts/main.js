const btnStart = document.querySelector('.container-start');
const showNum = document.querySelectorAll('.show-num');

let needClick = [],
    clicked = [];

function generateNeedClick() {
    for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * (showNum.length - 0)) + 0;
        needClick.push(index);
    }
}