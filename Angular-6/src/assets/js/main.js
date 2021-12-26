console.log("Hello");
function ripple() {
    console.log("ripple");
    "use strict";
    [].map.call(document.querySelectorAll('[anim="ripple"]'), el => {
        el.addEventListener('click', e => {
            e = e.touches ? e.touches[0] : e;
            const r = el.getBoundingClientRect(), d = Math.sqrt(Math.pow(r.width, 2) + Math.pow(r.height, 2)) * 2;
            el.style.cssText = `--s: 0; --o: 1;`;
            el.offsetTop;
            el.style.cssText = `--t: 1; --o: 0; --d: ${d}; --x:${e.clientX - r.left}; --y:${e.clientY - r.top};`;
        });
    });
}

const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".step-forms");
const progressSteps = document.querySelectorAll(".progress-step");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
    console.log(btn);
    btn.addEventListener("click", () => {
        formStepsNum++;
        if (formStepsNum == 1) {
            var e = document.getElementById("drop-1");
            var value = e.options[e.selectedIndex].value;
            console.log(value);
            if (value == "Influencer") {
                var input = document.getElementById("input-category");
                input.placeholder = "Influencer Category";
            }
            else {
                var input = document.getElementById("input-category");
                input.placeholder = "Brand Category";
            }
        }
        updateFormSteps();
        updateProgressbar();

    });
});

prevBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        formStepsNum--;
        updateFormSteps();
        updateProgressbar();

    });
});

function updateFormSteps() {
    formSteps.forEach((formStep) => {
        formStep.classList.contains("step-forms-active") &&
            formStep.classList.remove("step-forms-active");
    });

    formSteps[formStepsNum].classList.add("step-forms-active");
}

function updateProgressbar() {
    progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum + 1) {
            progressStep.classList.add("progress-step-active");
        }
        else {
            progressStep.classList.remove("progress-step-active");
        }
    });

    progressSteps.forEach((progressStep, idx) => {
        if (idx < formStepsNum) {
            progressStep.classList.add("progress-step-check");
        }
        else {
            progressStep.classList.remove("progress-step-check");
        }
    });
    const progressActive = document.querySelectorAll(".progress-step-active");
    progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

document.getElementById("submit-form").addEventListener("click", function () {
    progressSteps.forEach((progressStep, idx) => {
        if (idx <= formStepsNum) {
            progressStep.classList.add("progress-step-check");
        }
        else {
            progressStep.classList.remove("progress-step-check");
        }
    });
    var forms = document.getElementById("forms"); forms.classList.remove("form");
    forms.innerHTML = '<div class="welcome"><div class="content"><svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg><h2>Thanks for signup!</h2><span>We will contact you soon!</span><div></div>';
});