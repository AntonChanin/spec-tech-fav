import { FC, PropsWithChildren } from 'react';
import BackgroundSVG from '../assets/background.svg'


const Background: FC<PropsWithChildren> = (props) => {
    const { children } = props;

    return (
        <div className="bg-no-repeat bg-cover bg-center w-screen h-screen" style={{ backgroundImage: 'url(src/assets/background.svg)' }} >
            <div className="flex w-full h-full">
                {children}
            </div>
        </div>
    );
};

export default Background;
