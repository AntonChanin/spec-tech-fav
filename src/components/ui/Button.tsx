import { FC, FormEventHandler, MouseEventHandler, PropsWithChildren } from 'react';

type Props = {
    fnType?: 'button' | 'reset' | 'submit';
    type?: 'primary' | 'outline' | 'text';
    className?: string;
    onClick?(): void;
    onSubmit?(): void;
};

const Button: FC<PropsWithChildren<Props>> = (props) => {
    const { fnType = 'button', type = 'primary', className, onClick, onSubmit, children } = props;

    const classList = {
        primary: 'text-white bg-[#F6B52E]',
        outline: 'text-[#F6B52E] border border-[#F6B52E]',
        text: 'text-[#F6B52E]',
    };

    const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onClick?.();
    };

    const handleSubmit: FormEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();
        onSubmit?.();
    };

    return (
        <button
            className={`${className ?? 'w-[323px] h-[44px] rounded-[5px] text-xl font-semibold'} ${classList[type]}`.trimEnd()}
            onClick={onClick && handleClick}
            onSubmit={onSubmit && handleSubmit}
            type={fnType}
        >
            {children}
        </button>
    );
}

export default Button;