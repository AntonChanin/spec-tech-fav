import { ChangeEventHandler, FC, FocusEventHandler, MouseEventHandler, useState } from 'react';

import uuid from '../../utils/uuid';

type InputType = 'button'
| 'checkbox'
| 'color'
| 'date'
| 'datetime-local'
| 'email'
| 'file'
| 'hidden'
| 'image'
| 'month'
| 'number'
| 'password'
| 'radio'
| 'range'
| 'reset'
| 'search'
| 'submit'
| 'tel'
| 'text'
| 'time'
| 'url'
| 'week'
| (string & {});

type Props = {
    fnType?: InputType;
    label?: string;
    placeholder?: string;
    pattern?: string;
    className?: string;
    onChange?(value: string): void;
};

const Input: FC<Props> = (props) => {
    const {
        fnType = 'text',
        label,
        placeholder,
        pattern,
        className,
        onChange,
    } = props;
    const chainId = uuid();
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect: MouseEventHandler<HTMLInputElement> = (e) =>  {
        e.preventDefault();
        e.currentTarget.blur();
        setIsSelected(false);
    };

    const handleFocus: FocusEventHandler<HTMLInputElement> = (e) =>  {
        e.preventDefault();
        setIsSelected(true);
    };

    const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        e.preventDefault();
        onChange?.(e.target.value);
    };

    return (
        <div className={`flex flex-col font-semibold text-sm leading-5 ${isSelected ? 'text-[#10100F]' : ''} ${className}`.trimEnd()}>
            <label htmlFor={chainId} className="mb-1">{label}</label>
            <input
                className="border rounded-[5px] h-8"
                placeholder={placeholder}
                type={fnType}
                pattern={pattern}
                id={chainId}
                onFocus={handleFocus}
                onMouseLeave={handleSelect}
                onChange={onChange && handleChange}
            />
        </div>
    );
}

export default Input;