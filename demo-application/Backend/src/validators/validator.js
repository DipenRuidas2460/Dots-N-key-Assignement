const isValid = function (x) {
    if (typeof x === 'undefined' || x === null) return false
    if (typeof x !== "string") return false
    if (typeof x === 'string' && x.trim().length === 0) return false
    return true;
}

const isValidStr = function (x) {
    let strRegex = /^[a-zA-Z,\-.\s|]*$/
    if (strRegex.test(x)) return true
}

const isValidBody = function (x) {
    return Object.keys(x).length > 0
}

const isValidEmail = function (x) {
    let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    if (emailRegex.test(x)) return true
}

const isValidPassword = (x) => {
    let passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/
    if (passwordRegex.test(x)) return true
}

module.exports = { isValid, isValidStr, isValidBody, isValidEmail, isValidPassword }