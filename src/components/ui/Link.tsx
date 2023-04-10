import { FC, MouseEventHandler, PropsWithChildren } from 'react';

type Props = {
    href?: string;
    label?: string;
    className?: string;
};

const Link: FC<PropsWithChildren<Props>> = (props) => {
    const { href = '/', label = '', className = '', children } = props;

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (e) => {
        e.preventDefault();
        window.location.href = href;
    };

    return <a className={className} href={href} onClick={handleClick}>{children ?? label}</a>;
}

export default Link;