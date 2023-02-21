import { usersAPI } from "../../api/api"

export const required = value => {
    if (value) return undefined
    return 'Field is required'
}

export const maxLengthCreator = (maxLength) => (value) => {
    if (value && value.length > maxLength) return `Max length is ${maxLength} symbols`
    return undefined 
}

export const minLengthCreator = (maxLength) => (value) => {
    if (value && value.length < maxLength) return `Min length is ${maxLength} symbols`
    return undefined 
}

export const validateMail = value => {
    let mailformat =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!value.match(mailformat))
        return 'mail is incorrect'
}

export const validatePhone = value => {
    let phoneformat =  /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
    if (!value.match(phoneformat))
        return 'phone is incorrect'
}

export const validateName= value => {
    let nameformat =  /^[A-Z-А-Я'][a-zA-Zа-яА-Я-' ]+[a-zA-Zа-яА-Я']?$/u
    if (!value.match(nameformat))
        return 'name is incorrect'
}

export const usernameCheckValidate = value => {
        if (!value) {
            return 'this username is already taken'
        }
        else return 'this username is not taken'
}

