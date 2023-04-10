import { FC, useState } from 'react';

import Page from '../components/Page';
import Background from '../components/Background';
import Form from '../components/ui/Form';
import Input from '../components/ui/Input';
import useMoveToEffect from '../hooks/useMoveToEffect';
import Picture from '../components/ui/Picture';

const ResetPage: FC = () => {
    const [phone, setPhone] = useState(localStorage.getItem('phone')  ?? '+7');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const moveToEffect = useMoveToEffect('rotate-form', 5000, []);

    const moveToClick = () => {
        setTimeout(() => {
            window.location.href = 'login';
        }, 3000);
    };

    const handleSubmit = () => {
    };

    const handleClick = () => {
        setIsValid(validate());
        if (isValid) {
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
                        src="src/assets/hook.png"
                        className={`container w-full h-full m-auto ${moveToEffect}`.trimEnd()}
                    />
                </div>
                <Form
                    className="relative z-10"
                    moveToEffect={moveToEffect}
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
