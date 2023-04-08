import { useState, useEffect } from 'react';

const useMoveToEffect = (name = 'animate-bounce', time = 5000, dep: string[] = []) => {
    const [moveToEffect, setMoveToEffect] = useState('');
    useEffect(() => {
        setMoveToEffect(name);
        setTimeout(() => {
            setMoveToEffect('');
        }, time);
    }, dep);

    return moveToEffect;
};

export default useMoveToEffect;
