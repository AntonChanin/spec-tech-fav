import { useState, useEffect } from 'react';

const useBeginEffect = (name = 'animate-bounce', time = 1550) => {
    const [beginEffect, setBeginEffect] = useState(name);
    useEffect(() => {
        setTimeout(() => {
            setBeginEffect('');
        }, time);
    }, []);

    return beginEffect;
};

export default useBeginEffect;
