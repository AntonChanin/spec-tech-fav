import { FC, PropsWithChildren } from 'react';

type Props = {
    href?: string;
    label?: string;
    className?: string;
};

const Link: FC<PropsWithChildren<Props>> = (props) => {
    const { href = '/', label = '', className, children } = props;

    return (
        <a className={className} href={href}>{children ?? label}</a>
    );
}

export default Link;