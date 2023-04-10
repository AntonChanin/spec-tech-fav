import { FC, useState } from 'react';

import Page from '../components/Page';
import Background from '../components/Background';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import Picture from '../components/ui/Picture';
import useDynamicStylesEffect from '../hooks/useDynamicStylesEffect';;

const ResetPage: FC = () => {
    const [phone, setPhone] = useState(localStorage.getItem('login')  ?? '+7');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [isAdd, setIsAdd] = useState(false);
    const { current: fallDown } = useDynamicStylesEffect('fall-down');
    const { update: rotateForm } = useDynamicStylesEffect('rotate-form', 5000);

    const moveToClick = () => {
        setIsAdd(true);
        setTimeout(() => {
            window.location.href = 'login';
        }, 400);
    };

    const handleSubmit = () => {
        localStorage.setItem('password', '');
    };

    const handleClick = () => {
        setIsValid(validate());
        if (isValid) {
            setShowErrorMessage(false);
            window.open(`tel: ${phone})`);
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

    const validate = () => {
        const phoneIsValid = phone.length === 16;
        return phoneIsValid; 
    };
    
    const [isValid, setIsValid] = useState(validate());
    
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
                    moveToLabel="назад"
                    moveToClick={moveToClick}
                    exeLabel="ПОЗВОНИТЬ"
                    exeSubmit={isValid ? handleSubmit : undefined}
                    exeClick={handleClick}
                >
                    <Input
                        label={`Введите номер телефона ${!showErrorMessage || isValid ? '' : 'Ошибка валидации'}`}
                        fnType="tel"
                        onChange={phoneFormat}
                        value={phone}
                    />
                </Form>
            </Background>
        </Page>
    );
   };

export default ResetPage;
