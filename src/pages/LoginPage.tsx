import { FC, useState } from 'react';

import Page from '../components/Page';
import Background from '../components/Background';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import Picture from '../components/ui/Picture';
import useDynamicStylesEffect from '../hooks/useDynamicStylesEffect';

const LoginPage: FC = () => {
    localStorage.setItem('target_login', '+7(111)111-11-11');
    localStorage.setItem('taget_password', '123456');
    const targetLogin = localStorage.getItem('target_login');
    const targetPassword = localStorage.getItem('taget_password');

    const [phone, setPhone] = useState(localStorage.getItem('login')  ?? '+7');
    const [password, setPassword] = useState(localStorage.getItem('password') ?? '');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const { current: fallDown } = useDynamicStylesEffect('fall-down');
    const { update: rotateForm } = useDynamicStylesEffect('rotate-form', 5000);

    const moveToClick = () => {
        setIsAdd(true);
        setTimeout(() => {
            window.location.href = 'reset';
        }, 400)
    };

    const handleClick = () => {
        setIsValid(validate());
        if (isValid.common && isValid.truthLogin && isValid.truthPassword) {
            setShowErrorMessage(false);
            localStorage.setItem('password', password);
            localStorage.setItem( 'login', phone);
            window.location.href = '/';
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
        const pwdLengthCheck = value.length >= 6;
        const specialCharCheck = /[!@#$%^&*]/.test(value);
        return pwdLengthCheck;
    };

    const validate = () => {
        const phoneIsValid = phone.length === 16;
        const passwordIsValid = passwordFormat(password);
        return {
            phoneIsValid,
            passwordIsValid,
            common: passwordIsValid && phoneIsValid,
            truthLogin: targetLogin === phone,
            truthPassword: targetPassword === password
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
                        src="src/assets/hook_pressed.png"
                        className={`container w-auto h-auto m-auto ${fallDown()} ${rotateForm(isAdd)}`.trimEnd()}
                    />
                </div>
                <Form
                    className="relative z-10"
                    beginEffect={fallDown()}
                    moveToEffect={rotateForm(isAdd)}
                    moveToLabel="Забыли пароль?"
                    moveToClick={moveToClick}
                    exeLabel="ВОЙТИ"
                    exeClick={handleClick}
                >
                    <Input
                        label={`Введите логин ${!showErrorMessage || isValid.phoneIsValid ? (isValid.truthLogin ? '' : 'Неверный логин') : 'Ошибка валидации'}`}
                        fnType="tel"
                        onChange={phoneFormat}
                        value={phone}
                    />
                    <Input
                        label={`Введите пароль ${!showErrorMessage || isValid.passwordIsValid ? (isValid.truthPassword ? '' : 'Неверный пароль') : 'Ошибка валидации'}`}
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
