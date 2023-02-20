import React from "react"
import s from "./form-controls.module.css"
import Select from "react-select";


const FormControl = ({input, child, meta, ...props}) => {
    const hasError = meta.touched && meta.error

    return (
        <div className={s.formControl + " " + (hasError ? s.error : " ")}>
            <div>
                {props.children}
            </div>
            {hasError && <span>{meta.error}</span>}
        </div>
    )
}

export const Textarea = (props) => {
    const {input, child, meta, ...restProps} = props
    return (<FormControl {...props}><textarea {...input} {...restProps} /></FormControl>)
}
export const Input = (props) => {
    const {input, child, meta, ...restProps} = props
    return (<FormControl {...props}><input {...input} {...restProps} /></FormControl>)
}
export const ReduxFormSelect = (props) => {
    const {input, options, className} = props
    return (
        <Select
            {...input}
            onChange={value => input.onChange(value)}
            onBlur={() => input.onBlur(input.value)}
            options={options}
            className={className}
        />
    )
}