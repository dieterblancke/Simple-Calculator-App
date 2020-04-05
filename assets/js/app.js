document.addEventListener('DOMContentLoaded', init);

function init() {
    const buttons = document.querySelectorAll('button');

    for (const button of buttons) {
        button.addEventListener('click', handleClick);
    }

    document.querySelector('#clear').addEventListener('click', clearResult);
}

function clearResult() {
    document.querySelector('#result').value = '';
}

function handleClick(event) {
    const action = event.target.getAttribute('data-action');

    // If action is '=', then we'll calculate the result and stop.
    if (action === '=') {
        calculateResult();
        return;
    }
    const resultInput = document.querySelector('#result');

    // Validating action, making sure people cannot type "+*" for example or "*."
    if (validateAction(action, resultInput)) {
        // Adding the action to the result input field.
        resultInput.value += action;
    } else {
        // Replacing the last action to the new action in the result input field.
        resultInput.value = resultInput.value.substr(0, resultInput.value.length - 1) + action;
    }
}

function validateAction(action, input) {
    const lastChar = input.value[input.value.length - 1];

    for (let char of ['.', '-', '+', '/', '*']) {
        if (lastChar === char) {
            for (let c of ['.', '-', '+', '/', '*']) {
                if (action === c) {
                    return false;
                }
            }
        }
    }
    return true;
}

function calculateResult() {
    const resultInput = document.querySelector('#result');

    try {
        resultInput.value = eval(resultInput.value);
    } catch (e) {
        resultInput.value = '0';
    }
}