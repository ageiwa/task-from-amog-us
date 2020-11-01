const btnStart = document.querySelector('.container-start');
const showNum = document.querySelectorAll('.show-num');
const num = document.querySelectorAll('.wrap-num');

let needClick = [],
    clicked = [],
    waiting = true,
    clickCount = 0,
    count = 1;

for (let i = 0; i < num.length; i++) {
    num[i].addEventListener('click', () => btnClick(i));
}

function btnClick(i) {
    if (!waiting) {
        if (clicked[clickCount] === undefined) clicked.push(i);

        num[i].firstElementChild.classList.add('num-pressed');
        if (count > 1 && clickCount < 4) setTimeout(() => num[i].firstElementChild.classList.remove('num-pressed'), 200);

        if (clicked[clickCount] === needClick[clickCount]) {
            clickCount++;

            switchSecondPanelIndicator(clickCount);
            
            if (clicked.length === count) {
                if (count === 5) {
                    waiting = true;
                    finish();
                    return false;
                }

                if (count < 5) count++;

                clicked = [];
                clickCount = 0;
                waiting = true;

                setTimeout(() => {
                    num[i].firstElementChild.classList.remove('num-pressed');

                    switchNum('diactive');
                    switchSecondPanelIndicator(clickCount);
                    start(0);
                }, 200);
            }
        }
        else {
            clickCount = 0;
            error(1);
        }
    }
}

function error(a) {
    let i = a;

    const indicator = document.querySelectorAll('.sp-i');
    const num = document.querySelectorAll('.num');

    if (i === 1 || i === 3) {
        for (let i = 0; i < indicator.length; i++) {
            indicator[i].classList.remove('sp-i-error-2');
            indicator[i].classList.add('sp-i-error-1');
        }
    
        for (let i = 0; i < num.length; i++) {
            num[i].classList.remove('num-error-2');
            num[i].classList.add('num-error-1');
        }

        i++;
    }
    else if (i === 2) {
        for (let i = 0; i < indicator.length; i++) {
            indicator[i].classList.remove('sp-i-error-1');
            indicator[i].classList.add('sp-i-error-2');
        }
    
        for (let i = 0; i < num.length; i++) {
            num[i].classList.remove('num-error-1');
            num[i].classList.add('num-error-2');
        }

        i++
    }
    else {
        for (let i = 0; i < indicator.length; i++) {
            indicator[i].classList.remove('sp-i-error-1');
            indicator[i].classList.remove('sp-i-error-2');
        }
    
        for (let i = 0; i < num.length; i++) {
            num[i].classList.remove('num-error-1');
            num[i].classList.remove('num-error-2');
        }

        restart();

        return false;
    }

    setTimeout(() => error(i), 200);
}

function generateNeedClick() {
    let array = [];

    for (let i = 0; i < 5; i++) {
        let index = Math.floor(Math.random() * (showNum.length - 0)) + 0;
        array.push(index);
    }

    needClick = array;
}

function switchFirstPanenlIndicator(state) {
    const indicator = document.querySelectorAll('.fp-i');

    if (state === 'active') {
        for (let i = 0; i < count; i++) {
            indicator[i].classList.add('indicator-active');
        }
    }
    else {
        for (let i = 0; i < indicator.length; i++) {
            indicator[i].classList.remove('indicator-active');
        }
    }
}

function switchSecondPanelIndicator(clickCount) {
    const indicator = document.querySelectorAll('.sp-i');

    for (let i = 0; i < indicator.length; i++) {
        indicator[i].classList.remove('indicator-active');
    }

    for (let i = 0; i < clickCount; i++) {
        indicator[i].classList.add('indicator-active');
    }
}

function switchNum(state) {
    const num = document.querySelectorAll('.num');

    for (let i = 0; i < num.length; i++) {
        if (state === 'active') num[i].classList.add('num-active');
        else {
            num[i].classList.remove('num-active');
            num[i].classList.remove('num-pressed');
        }
    }
}

function start(a) {
    let i = a;

    if (i < count) {
        switchFirstPanenlIndicator('active');

        setTimeout(() => showNum[needClick[i]].classList.add('show-num-active'), 100);

        setTimeout(() => {
            showNum[needClick[i]].classList.remove('show-num-active');
            i++;
        }, 300);

        setTimeout(() => start(i), 500);
    }
    else {
        waiting = false;
        switchNum('active');

        return false;
    }
}

function finish() {
    const num = document.querySelectorAll('.num');

    for (let i = 0; i < num.length; i++) {
        num[i].classList.add('num-pressed');
    }
}

function restart() {
    needClick = [];
    clicked = [];
    waiting = true;
    clickCount = 0;
    count = 1;

    switchFirstPanenlIndicator('diactive');
    switchSecondPanelIndicator(clickCount)
    switchNum('diactive');

    generateNeedClick();
    start(0);
}

btnStart.addEventListener('click', () => restart());