import React, { TextareaHTMLAttributes } from 'react';

import "./styles.css"

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
    name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, ...restProps }) => {
    return (
        <div className="textarea-block">
            <label htmlFor={name}>{label}</label>
            <textarea id={name} {...restProps} />
        </div>
    )
}

export default TextArea;