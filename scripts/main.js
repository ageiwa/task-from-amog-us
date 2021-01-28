const btnStart = document.querySelector('.container-start');
const showNum = document.querySelectorAll('.show-num');
const wrapNum = document.querySelectorAll('.wrap-num');

let order = [],
    waiting = true,
    counterShowBtn = 0,
    counterPressedBtn = 0,
    stage = 1;

function generateOrder() {
    for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * (showNum.length - 0)) + 0;
        order.push(index);
    }
}

function accessBtn(action) {
    const num = document.querySelectorAll('.num');

    for (let i = 0; i < num.length; i++) {
        if (action === 'unlock') num[i].classList.add('num-active');
        else num[i].classList.remove('num-active');
    }
}

function turnIndicatorOnFirstPanel(action, countIndicators) {
    const indicator = document.querySelectorAll('.fp-i');

    if (action === 'off') countIndicators = indicator.length;

    for (let i = 0; i < countIndicators; i++) {
        if (action === 'on') indicator[i].classList.add('indicator-active');
        else indicator[i].classList.remove('indicator-active');
    }
}

function turnIndicatorOnSecondPanel(action, countIndicators) {
    const indicator = document.querySelectorAll('.sp-i');

    if (action === 'off') countIndicators = indicator.length;

    for (let i = 0; i < countIndicators; i++) {
        if (action === 'on') indicator[i].classList.add('indicator-active');
        else indicator[i].classList.remove('indicator-active');
    }
}

function success() {
    const num = document.querySelectorAll('.num');

    setTimeout(() => {
        for (let i = 0; i < num.length; i++) {
            num[i].classList.add('num-pressed');
        }
    }, 300);

    setTimeout(() => {
        for (let i = 0; i < num.length; i++) {
            num[i].classList.remove('num-pressed');
        }
    }, 700);

    waiting = true;
}

function showOrder() {
    if (counterShowBtn < stage) {
        turnIndicatorOnFirstPanel('on', stage);

        let i = order[counterShowBtn];

        showNum[i].classList.add('show-num-active');
        setTimeout(() => {
            showNum[i].classList.remove('show-num-active');
            counterShowBtn++;
        }, 300);

        setTimeout(() => showOrder(), 500);
    }
    else {
        waiting = false;
        accessBtn('unlock');
        return false;
    }
}

function completeStage() {
    if (stage === order.length) {
        waiting = false;
        success();
        setTimeout(() => {
            accessBtn('lock');
            turnIndicatorOnFirstPanel('off');
            turnIndicatorOnSecondPanel('off');
        }, 700);

        return false;
    }

    stage++;

    counterShowBtn = 0;
    counterPressedBtn = 0;
    waiting = true;

    setTimeout(() => {
        turnIndicatorOnSecondPanel('off');
        accessBtn('lock');
    }, 200)

    setTimeout(() => showOrder(), 1000);
}

function error(n) {
    const indicator = document.querySelectorAll('.sp-i');
    const num = document.querySelectorAll('.num');

    if (n === undefined) n = 0;

    for (let i = 0; i < indicator.length; i++) {
        if (n % 2 === 0) {
            indicator[i].classList.remove('sp-i-error-2');
            indicator[i].classList.add('sp-i-error-1');
        }
        else {
            indicator[i].classList.remove('sp-i-error-1');
            indicator[i].classList.add('sp-i-error-2');
        }
    }
    for (let i = 0; i < num.length; i++) {
        if (n % 2 === 0) {
            num[i].classList.remove('num-error-2');
            num[i].classList.add('num-error-1');
        }
        else {
            num[i].classList.remove('num-error-1');
            num[i].classList.add('num-error-2');
        }
    }

    if (n === 3) {
        for (let i = 0; i < indicator.length; i++) {
            indicator[i].classList.remove('sp-i-error-2');
        }
        for (let i = 0; i < num.length; i++) {
            num[i].classList.remove('num-error-2');
        }

        accessBtn('lock');
        startTask();

        return false;
    }

    n++;

    setTimeout(() => error(n), 300);
}

function checkingPress(i) {
    if (i === order[counterPressedBtn]) {
        counterPressedBtn++;

        turnIndicatorOnSecondPanel('on', counterPressedBtn);

        if (counterPressedBtn === stage) completeStage();
    }
    else {
        counterPressedBtn = 0;
        waiting = true;
        error();
    }
}

for (let i = 0; i < wrapNum.length; i++) {
    wrapNum[i].addEventListener('click', () => btnClick(i));
}

function btnClick(i) {
    if (!waiting) {
        let num = wrapNum[i].firstElementChild;

        num.classList.add('num-pressed');
        setTimeout(() => num.classList.remove('num-pressed'), 200);

        checkingPress(i);
    }
}

function startTask() {
    order = [];
    waiting = true;
    counterShowBtn = 0;
    counterPressedBtn = 0;
    stage = 1;

    turnIndicatorOnFirstPanel('off');
    turnIndicatorOnSecondPanel('off');
    accessBtn('lock');

    generateOrder();
    showOrder();
}

btnStart.addEventListener('click', () => startTask());