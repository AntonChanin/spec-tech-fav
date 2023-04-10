import { FC, PropsWithChildren } from 'react';

import Picture from './Picture';
import Column from './Column';
import Button from './Button';

type Props = {
    className?: string;
    beginEffect?: string;
    moveToEffect?: string;
    moveToLabel?: string;
    moveToClick?(): void;
    exeLabel?: string
    exeClick?(): void;
    exeSubmit?(): void;
    redirectTo?: string;
};

const Form: FC<PropsWithChildren<Props>> = (props) => {
    const {
        className,
        beginEffect,
        moveToEffect,
        moveToLabel = '',
        moveToClick,
        exeLabel = '',
        exeClick,
        exeSubmit,
        children,
    } = props;

    return (
        <form
            className={`bg-white m-auto rounded-[1.25rem] shadow-[-10px_7px_20px_0px_rgba(0,0,0,0.25)] w-[343px] h-[504px] px-2.5 ${beginEffect} ${moveToEffect} ${className}`.trimEnd()}
            onSubmit={exeSubmit}
        >
            <Picture src="src/assets/logo.svg" />
            <Column>
                {children}
                <Button
                  type="text"
                  className="w-[128px] h-[22px] rounded-[5px] text-base font-semibold ml-auto mt-2.5 text-end"
                  onClick={moveToClick}
                >
                    {moveToLabel}
                </Button>   
            </Column>
            <Button onClick={exeClick} fnType="submit">{exeLabel}</Button>
        </form>
    );
}

export default Form;
