import React, { useEffect } from "react";
import '../checkbox/inputCheckbox.css'
const 

InputCheckbox = (props) => {
    useEffect(() => { }, [props])
    return (
        <>
            <label className="container-checkbox" style={{ display: props.checkBoxType == "category" ? "block" : "none" }}>
                <input type="checkbox" onClick={props.onChange} className={props.className} value={props.value} name={props.checkBoxName} checked={props.checked} />
                <span className="checkmark"></span>
                {props.label}
            </label>

            <div className="checkbox" style={{ display: props.checkBoxType == "Zodiac" ? "block" : "none" }}>
                <label className="checkbox-wrapper">
                    <input type="checkbox" onClick={props.onClick} className={props.className} value={props.value} name={props.checkBoxName} />
                    {props.addSpan}
                </label>
            </div>

        </>
    )
}
export default InputCheckbox