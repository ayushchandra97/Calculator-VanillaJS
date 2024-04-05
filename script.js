class Calculator {

    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.allClear()
    }

    allClear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operator = undefined
    }

    clear() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNum(number) {
        if (this.currentOperand == undefined) this.currentOperand = ''
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    operation(operator) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.evaluate()
        }
        this.operator = operator
        this.previousOperand = this.currentOperand
        this.currentOperand = ''

    }

    percentage() {
        if (this.currentOperand === '' || isNaN(this.currentOperand)) return
        this.currentOperand = parseFloat(this.currentOperand) / 100
    }

    evaluate() {
        let result
        const cf = 10
        const prev = parseFloat(this.previousOperand)
        const curr = parseFloat(this.currentOperand)
        let prevDecimalPointDigits = 0, currDecimalPointDigits = 0
        let prevDecimalPointString = prev.toString().split('.')[1]
        if (prevDecimalPointString != undefined) {
            prevDecimalPointDigits = prevDecimalPointString.length
        }
        console.log(prevDecimalPointDigits)
        let currDecimalPointString = curr.toString().split('.')[1]
        if (currDecimalPointString != undefined) {
            currDecimalPointDigits = currDecimalPointString.length
        }
        console.log(currDecimalPointDigits)
        let decimalPointDigits = prevDecimalPointDigits >= currDecimalPointDigits ? prevDecimalPointDigits : currDecimalPointDigits
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operator) {
            case '+':
                result = prev + curr
                if (decimalPointDigits > 0) {
                    result = result.toFixed(decimalPointDigits)
                }
                break
            case '-':
                result = prev - curr
                if (decimalPointDigits > 0) {
                    result = result.toFixed(decimalPointDigits)
                }
                break
            case '×':
                result = prev * curr
                if (decimalPointDigits > 0) {
                    decimalPointDigits = prevDecimalPointDigits + currDecimalPointDigits
                    result = result.toFixed(decimalPointDigits)
                }
                break
            case '÷':
                if (curr == 0) {
                    result = undefined
                } else {
                    result = (prev * cf)/ (curr * cf)
                }
                break
            case '^':
                result = Math.pow(prev, curr)
                break
            default:
                return
        }
        this.currentOperand = result
        this.operator = undefined
        this.previousOperand = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        let decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        if (this.currentOperand == undefined) {
            this.currentOperandTextElement.innerText = 'undefined'
        } else {
            this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
        }
        if (this.operator != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operator}`
        } else {
            this.previousOperandTextElement.innerText = ''
        }
    }

    swapUnit(unitBtn) {
        if (unitBtn.innerText == 'deg') {
            unitBtn.innerText = 'rad'
        } else {
            unitBtn.innerText = 'deg'
        }
    }

    swapTrig(btn) {
        let btnText = btn.innerHTML
        if (btnText == 'sin' || btnText == 'cos' || btnText == 'tan') {
            btn.innerHTML = `${btnText}<sup id="super-1">-1</sup>`
        } else {
            let element = document.getElementById('super-1')
            btn.removeChild(element)
        }
    }

    squareRoot() {
        if (this.currentOperand === '' || isNaN(this.currentOperand)) return
        this.currentOperand = Math.sqrt(parseFloat(this.currentOperand))
    }

    logTen() {
        if (this.currentOperand === '' || isNaN(this.currentOperand)) return
        this.currentOperand = Math.log10(parseFloat(this.currentOperand))
    }

    logNatural() {
        if (this.currentOperand === '' || isNaN(this.currentOperand)) return
        this.currentOperand = Math.log(parseFloat(this.currentOperand))
    }

    evaluateTrigExpression(trigBtnText, unit) {
        if (this.currentOperand === '' || isNaN(this.currentOperand)) return
        let number = (unit === 'deg') ? parseFloat(this.currentOperand) * Math.PI/180 : parseFloat(this.currentOperand)
        switch (trigBtnText) {
            case 'sin':
                this.currentOperand = Math.sin(number)
                break
            case 'cos':
                this.currentOperand = Math.cos(number)
                break
            case 'tan':
                if (unit === 'deg' && this.currentOperand >= 90) {
                    this.currentOperand = undefined
                } else {
                    this.currentOperand = Math.tan(number)
                }
                break
            case 'sin-1':
                this.currentOperand = Math.asin(number)
                break
            case 'cos-1':
                this.currentOperand = Math.acos(number)
                break
            case 'tan-1':
                this.currentOperand = Math.atan(number)
                break
            default:
                return
        }
    }

}


const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const allClearBtn = document.querySelector('[data-all-clear]')
const clearBtn = document.querySelector('[data-clear]')
const percentBtn = document.querySelector('[data-percent]')
const operatorBtns = document.querySelectorAll('[data-operator]')
const numberBtns = document.querySelectorAll('[data-number]')
const equalBtn = document.querySelector('[data-equality]')
const toggleBtn = document.querySelector('[data-toggle-btn]')
const trigSwitchBtn = document.querySelector('[data-swap]')
const swapUnitBtn = document.querySelector('[data-deg-rad]')
const trigBtns = document.querySelectorAll('[data-trig]')
const bracketBtn = document.querySelector('[data-brackets]')
const sqrtBtn = document.querySelector('[data-root]')
const logTenBtn = document.querySelector('[data-log-base-ten]')
const naturalLogBtn = document.querySelector('[data-natural-log]')
const heading = document.querySelector('[data-heading]')
const container = document.querySelector('.calculator-container')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

allClearBtn.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateDisplay()

})

clearBtn.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()

})

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNum(button.innerText)
        calculator.updateDisplay()
    })
})

operatorBtns.forEach(button => {
    button.addEventListener('click', () => {
        if (button.innerHTML == `x<sup>y</sup>`) {
            calculator.operation('^')
        }
        calculator.operation(button.innerText)
        calculator.updateDisplay()
    })
})

equalBtn.addEventListener('click', () => {
    calculator.evaluate()
    calculator.updateDisplay()

})

percentBtn.addEventListener('click', () => {
    calculator.percentage()
    calculator.updateDisplay()
})


toggleBtn.addEventListener('click', () => {
    const hiddenBtns = document.querySelectorAll('.hidden')
    hiddenBtns.forEach(btn => {
        btn.classList.toggle('visible')
    })
    container.classList.toggle('expanded')
    equalBtn.classList.toggle('span-two')
    heading.innerText = container.classList.contains('expanded') ? 'Scientific Calculator' : 'Simple Calculator'
    toggleBtn.innerHTML = container.classList.contains('expanded') ? `<img src="app-open.png" alt="app-open">` : `<img src="app-closed.png" alt="app-closed">`
})

swapUnitBtn.addEventListener('click', () => {
    calculator.swapUnit(swapUnitBtn)
})

trigSwitchBtn.addEventListener('click', () => {
    trigBtns.forEach(btn => {
        calculator.swapTrig(btn)
    })
})

sqrtBtn.addEventListener('click', () => {
    calculator.squareRoot()
    calculator.updateDisplay()
})

logTenBtn.addEventListener('click', () => {
    calculator.logTen()
    calculator.updateDisplay()
})

naturalLogBtn.addEventListener('click', () => {
    calculator.logNatural()
    calculator.updateDisplay()
})

trigBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        calculator.evaluateTrigExpression(btn.innerText, swapUnitBtn.innerText)
        calculator.updateDisplay()
    })
})