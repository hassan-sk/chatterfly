import React from 'react';

const NormalInput = (props) => {
    return (
        <input name={props.name} disabled={props.disabled} maxLength={props.maxLength} value={props.value}
            autoComplete={props.autoComplete === false? 'off': null}
            onKeyDown={e => props.onKeyDown(e)}
            onChange={(e)=>{
                if (props.numberOnly === true){
                    if (!isNaN(Number(e.target.value))){
                        if (!/\s/.test(e.target.value)){
                            props.onChange(e)
                        }
                    }
                } else if (props.noNumbers ===  true){
                    if (!/[^A-Za-z ]/.test(e.target.value)){
                        props.onChange(e)
                    }
                } else props.onChange(e)
                }
            }
            disabled={props.disabled} type={props.type} required
        />
    )
}

const NormalUnderlineLabelInput = (props) => {
    return (
        <div className={props.error === false? 'ce_underline_input':'ce_underline_input error'}>
            <span className="label">
                {props.label}
            </span>
            <input className={props.inputActive?'active':null} maxLength={props.maxLength} value={props.value}
                onKeyDown={e => props.onKeyDown(e)}
                onChange={(e)=>{
                    if (props.numberOnly === true){
                        if (!isNaN(Number(e.target.value))){
                            if (!/\s/.test(e.target.value)){
                                props.onChange(e)
                            }
                        }
                    } else if (props.noNumbers ===  true){
                        if (!/[^A-Za-z ]/.test(e.target.value)){
                            props.onChange(e)
                        }
                    } else props.onChange(e)
                    }
                }
                disabled={props.disabled} type={props.type} required
            />
        </div>
    )
}

const BorderedLabelInput = (props) => {
    return (
        <div className={props.error === false? 'ce_bordered_input':'ce_bordered_input error'}>
            <span className="label">
                {props.label}
            </span>
            <input className={props.inputActive?'active':null} maxLength={props.maxLength} value={props.value}
                onKeyDown={e => props.onKeyDown(e)}
                onChange={(e)=>{
                    if (props.numberOnly === true){
                        if (!isNaN(Number(e.target.value))){
                            if (!/\s/.test(e.target.value)){
                                props.onChange(e)
                            }
                        }
                    } else if (props.noNumbers ===  true){
                        if (!/[^A-Za-z ]/.test(e.target.value)){
                            props.onChange(e)
                        }
                    } else props.onChange(e)
                }
            }
            disabled={props.disabled} type={props.type} required
            />
        </div>
    )
}

NormalUnderlineLabelInput.defaultProps = {
    error: false,
    maxLength: null,
    inputActive: false,
    onKeyDown: () => {},
    onChange: () => {}
}
BorderedLabelInput.defaultProps = {
    error: false,
    maxLength: null,
    inputActive: false,
    onKeyDown: () => {},
    onChange: () => {}
}
NormalInput.defaultProps = {
    error: false,
    maxLength: null,
    inputActive: false,
    onKeyDown: () => {},
    type: 'text'
}

export {NormalUnderlineLabelInput, NormalInput, BorderedLabelInput};

