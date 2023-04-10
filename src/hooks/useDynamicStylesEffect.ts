import { useState, useEffect } from 'react';

const useDynamicStylesEffect = (name = 'animate-bounce', time = 1550, isActive = true) => {
    const [dynamicEffect, setDynamicEffect] = useState(name);
    const [isAdd, setIsAdd] = useState(isActive) 

    useEffect(() => {
        if (!isAdd) setIsAdd(true);
        setTimeout(() => {
            setIsAdd(false);
        }, time);
    }, []);

    return {
        dynamicEffect,
        isAdd,
        current: () => isAdd ? dynamicEffect : '',
        update: (isAdd?: boolean) => isAdd ? dynamicEffect : ''
    };
};

export default useDynamicStylesEffect;
