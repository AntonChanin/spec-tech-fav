import { FC, useState } from 'react';

import Page from '../components/Page';
import Background from '../components/Background';
import Form from '../components/ui/Form';
import useBeginEffect from '../hooks/useBeginEffect';
import Input from '../components/ui/Input';
import useMoveToEffect from '../hooks/useMoveToEffect';
import uuid from '../utils/uuid';
import Picture from '../components/ui/Picture';

const LoginPage: FC = () => {
    const [animInitor, setAnimInitor] = useState(uuid());
    const [formName, setFormName] = useState<'login' | 'reset'>('login');
    const beginEffect = useBeginEffect();
    const moveToEffect = useMoveToEffect('rotate-form', 5000, [animInitor]);

    const formData = {
        login: {
            moveToLabel: 'Забыли пароль?',
            exeLabel: 'ВОЙТИ',
        },
        reset: {
            moveToLabel: 'назад',
            exeLabel: 'ПОЗВОНИТЬ',
        },
    };

    const updateAnimInitor = () => setAnimInitor(uuid());

    const moveToClick = () => {
        updateAnimInitor();
        setTimeout(() => {
            if (formName === 'login') {
                setFormName('reset');
            } else {
                setFormName('login');
            }
        }, 3000);
    }
    return (
        <Page>
            <Background>
                <div className="absolute w-full h-full">
                    <Picture src="src/assets/hook.png" className={`container w-full h-full m-auto ${beginEffect} ${moveToEffect}`.trimEnd()} />
                </div>
                <Form
                    className="relative z-10"
                    beginEffect={beginEffect ? beginEffect + ' top-[-80px]' : ''}
                    moveToEffect={moveToEffect}
                    moveToLabel={formData[formName].moveToLabel}
                    moveToClick={moveToClick}
                    exeLabel={formData[formName].exeLabel}
                >
                    {formName === 'login'
                        ? (
                            <>
                                <Input label="Введите логин" />
                                <Input label="Введите пароль" className="mt-[19px]" />
                            </>
                        )
                        : (
                            <Input label="Введите номер телефона " />
                        )
                    }
                </Form>
            </Background>
        </Page>
    );
   };

export default LoginPage;
