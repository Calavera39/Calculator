class Calculator {
    constructor(previousOperand, currentOperand) {
        this.previousOperand = previousOperand;
        this.currentOperand = currentOperand
        this.clear()
    }


    clear() {
        this.current = ''
        this.previous = ''
        this.operation = undefined
    }

    delete() {
        this.current = this.current.toString().slice(0, -1)
    }

    appendNumber(number) {
        if(number === '.' && this.current.includes('.')) return
        this.current = this.current.toString() + number.toString()
    }

    chooseOperation(operation) {
        if(this.current === '') return
        if(this.previous !== '') {
            this.compute()
        } 
        this.operation = operation
        this.previous = this.current
        this.current = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previous)
        const curr = parseFloat(this.current)
        if(isNaN(prev) || isNaN(curr)) return
        switch(this.operation) {
            case '+': 
                computation = prev + curr
                break
            case '-': 
                computation = prev - curr
                break
            case '*': 
                computation = prev * curr
                break
            case '/': 
                computation = prev / curr
                break
            default:
                return
        }
        this.current = computation
        this.operation = undefined
        this.previous = ''
    }

    
    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay 
        if(isNaN(integerDigits)) {
            integerDisplay = '' 
        } else {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0})
        }

        if(decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }


    updateDisplay() {
        this.currentOperand.innerText = this.getDisplayNumber(this.current)
        if(this.operation != null) {
            this.previousOperand.innerText = `${this.getDisplayNumber(this.previous)}${this.operation}`
        } else {
            this.previousOperand.innerText = ''
        }
        
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allclearButton = document.querySelector('[data-allclear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperand = document.querySelector('[data-previous-operand]')
const currentOperand = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperand, currentOperand)

numberButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
} )

operationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
} )


equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allclearButton.addEventListener('click', () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})