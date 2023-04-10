import { FC, FormEventHandler, MouseEventHandler, PropsWithChildren } from 'react';

type Props = {
    href?: string;
    label?: string;
    className?: string;
    onClick?(): void;
};

const Link: FC<PropsWithChildren<Props>> = (props) => {
    const { href = '/', label = '', className = '', onClick, children } = props;

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        onClick?.();
        window.location.href = href;
    };

    return <a className={className} href={href} onClick={handleClick}>{children ?? label}</a>;
}

export default Link;