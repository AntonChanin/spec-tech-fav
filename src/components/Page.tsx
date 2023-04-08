import { FC } from 'react';

const Page: FC<any> = (props) => {
    const { children } = props;

    return ( 
        <div className="flex mx-auto font-['Manrope', sans-serif] text-[#989898]">
            <div className="flex flex-col">
                <div className="container mx-auto contents">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Page;
