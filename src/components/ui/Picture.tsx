import { FC } from 'react';

type Props = {
    src: string;
    alt?: string;
    caption?: string;
    className?: string;
};

const Picture: FC<Props> = (props) => {
    const { src, alt = '', caption = '', className } = props;
    
    return (
        <figure>
            {
               src.includes('.svg')
                ? (
                    <svg className={className ?? 'w-[263px] h-[162px] m-auto'}>
                        <image xlinkHref={src} className={className ?? 'w-[263px] h-[162px] m-auto'} />
                    </svg>
                )
                : <img
                    className={className ?? 'w-[263px] h-[162px] m-auto'}
                    src={src}
                    alt={alt ?? ''}
                />
            }
           {caption && <figcaption>{caption}</figcaption>}
        </figure>
    );
}

export default Picture;
