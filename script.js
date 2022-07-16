const textLeft = document.querySelector('.currency-rate-left')
const textRight = document.querySelector('.currency-rate-right')
let chooseSide = 'left'
let getCurrencyRate = (side = 'left') => {
    let leftCurrency = side === 'left'
        ? document.querySelector('[name=currency]:checked~.currency-button')
        : document.querySelector('[name=another-currency]:checked~.currency-button')
    let rightCurrency = side === 'left'
        ? document.querySelector('[name=another-currency]:checked~.currency-button')
        : document.querySelector('[name=currency]:checked~.currency-button')
    let inputValue = side === 'left'
        ? document.querySelector('[name=valueToConvert]').value
        : document.querySelector('[name=convertedValue]').value
    // let inputRight = side === 'left'
    //     ? document.querySelector('[name=convertedValue]').value
    //     : document.querySelector('[name=valueToConvert]').value

    fetch(`https://api.exchangerate.host/convert?from=${leftCurrency.innerText}&to=${rightCurrency.innerText}&amount=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            // textLeft.textContent = `1 ${leftCurrency.innerText} = ${data.info.rate} ${rightCurrency.innerText}`
            // textRight.textContent = `1 ${rightCurrency.innerText} = ${data.info.rate} ${leftCurrency.innerText}`
            if (side === 'left') {
                document.querySelector('[name=convertedValue]').value = data.result.toFixed(2)
                textLeft.textContent = `1 ${leftCurrency.innerText} = ${data.info.rate} ${rightCurrency.innerText}`
                textRight.textContent = `1 ${rightCurrency.innerText} = ${(1/data.info.rate).toFixed(6)} ${leftCurrency.innerText}`
            }
            else {
                document.querySelector('[name=valueToConvert]').value = data.result.toFixed(2)
                textLeft.textContent = `1 ${rightCurrency.innerText} = ${data.info.rate} ${leftCurrency.innerText}`
                textRight.textContent = `1 ${leftCurrency.innerText} = ${(1/data.info.rate).toFixed(6)} ${rightCurrency.innerText}`
            }
        })
    // fetch(`https://api.exchangerate.host/convert?from=${rightCurrency.innerText}&to=${leftCurrency.innerText}&amount=${inputValue}`)
    // .then(response => response.json())
    // .then(data => {
    //     textRight.textContent = `1 ${rightCurrency.innerText} = ${data.info.rate} ${leftCurrency.innerText}`
    //     document.querySelector('[name=valueToConvert]').value = data.result
    // })
}
getCurrencyRate()

let buttons = document.querySelectorAll('.hidden-button')
buttons.forEach(item => {
    item.addEventListener('click', () => {
        item.checked === true
    })
    item.addEventListener('click', getCurrencyRate)
})

let getCurrencybyInput = () => {
    let inputLeft = document.querySelector('[name=valueToConvert]')

    inputLeft.addEventListener('keyup', () => {

        inputLeft.value = inputLeft.value.replace(/[^\d]/g, "")
        getCurrencyRate()

    })
}

let getCurrencybyInputRight = () => {
    let inputRight = document.querySelector('[name=convertedValue]')
    inputRight.addEventListener('keyup', () => {
        inputRight.value = inputRight.value.replace(/[^\d]/g, "")
        getCurrencyRate('right')

    })
}

getCurrencybyInput()
getCurrencybyInputRight()

    // 

// проверка здорового человека
    // let userLeftText = document.querySelector('.user-input');
    // userLeftText.addEventListener('keyup', (event) => {
    //     if (!isNaN(userLeftText.value)) {
    //         countUserSum();
    //     } else {
    //         userLeftText.value = leftOldValue;
    //     }
    // });
    
    // let userRigthText = document.querySelector('.counted-sum');
    // userRigthText.addEventListener('keyup', ()=> {
    //     if(!isNaN(userRigthText.value)) {
    //         countUserSumBack();
    //     } else {
    //         userRigthText.value = rigthOldValue;
    //     }





