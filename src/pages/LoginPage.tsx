import { FC, useState } from 'react';

import Page from '../components/Page';
import Background from '../components/Background';
import Form from '../components/ui/Form';
import useBeginEffect from '../hooks/useBeginEffect';
import Input from '../components/ui/Input';
import useMoveToEffect from '../hooks/useMoveToEffect';
import Picture from '../components/ui/Picture';

const LoginPage: FC = () => {
    const [phone, setPhone] = useState(localStorage.getItem('phone')  ?? '+7');
    const [password, setPassword] = useState(localStorage.getItem('password') ?? '');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const beginEffect = useBeginEffect();
    const moveToEffect = useMoveToEffect('rotate-form', 5000, []);


    const moveToClick = () => {
        setTimeout(() => {
           window.location.href = 'reset';
        }, 3000);
    };

    const handleSubmit = () => {
        localStorage.setItem('password', password);
        localStorage.setItem( 'login', phone);
    };

    const handleClick = () => {
        setIsValid(validate());
        if (isValid.common) {
            setShowErrorMessage(false);
        }  else {
            setShowErrorMessage(true);
        };  
    };

    const phoneFormat = (value: string | string[]) => {
        let content = value;
        if(!content) return;
        content = Array.from(content).filter(ltr => ltr.charCodeAt(0) > 47 && ltr.charCodeAt(0) < 58);
        
        let [countryCode, operatorCode, number3, number21, number22] = [
            content[0], 
            content.slice(1,4).join(''), 
            content.slice(4,7).join(''),
            content.slice(7,9).join(''),
            content.slice(9,11).join(''),
        ]
      
        value = countryCode.length ? `+${countryCode}` : '';
        if(operatorCode.length) value += `(${operatorCode}`;
        if(number3.length) value += `)${number3}`;
        if(number21.length) value += `-${number21}`;
        if(number22.length) value += `-${number22}`;
        if (value.includes('+7')) setPhone(value);
    };

    const passwordFormat = (value: string) => {
        const capsLetterCheck = /[A-Z]/.test(value);
        const numberCheck = /[0-9]/.test(value);
        const pwdLengthCheck = value.length >= 8;
        const specialCharCheck = /[!@#$%^&*]/.test(value);
        return capsLetterCheck && numberCheck && pwdLengthCheck && specialCharCheck;
    };

    const validate = () => {
        const phoneIsValid = phone.length === 16;
        const passwordIsValid = passwordFormat(password);
        return {
            phoneIsValid,
            passwordIsValid,
            common: passwordIsValid && phoneIsValid 
        }; 
    };
    
    const [isValid, setIsValid] = useState(validate());

    const updatePassword = (value: string) => {
        setPassword(value);
    };
    
    return (
        <Page>
            <Background>
                <div className="absolute w-full h-full">
                    <Picture
                        src="src/assets/hook.png"
                        className={`container w-full h-full m-auto ${beginEffect} ${moveToEffect}`.trimEnd()}
                    />
                </div>
                <Form
                    className="relative z-10"
                    beginEffect={beginEffect ? beginEffect + ' top-[-80px]' : ''}
                    moveToEffect={moveToEffect}
                    moveToLabel="Забыли пароль?"
                    moveToClick={moveToClick}
                    exeLabel="ВОЙТИ"
                    exeSubmit={isValid.common ? handleSubmit : undefined}
                    exeClick={handleClick}
                >
                    <Input
                        label={`Введите логин ${!showErrorMessage || isValid.phoneIsValid ? '' : 'Ошибка валидации'}`}
                        fnType="tel"
                        onChange={phoneFormat}
                        value={phone}
                    />
                    <Input
                        label={`Введите пароль ${!showErrorMessage || isValid.passwordIsValid ? '' : 'Ошибка валидации'}`}
                        fnType="password"
                        className="mt-[19px]"
                        onChange={updatePassword}
                        value={password}
                    />
                </Form>
            </Background>
        </Page>
    );
   };

export default LoginPage;
