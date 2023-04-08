import { FC, useEffect, useState } from 'react';

import Page from '../components/Page';
import HomeModel from '../model/HomeModel';
import HomeView from '../view/HomeView';
import LoginModel from '../model/LoginModel';
import ResetModel from '../model/ResetModel';

const HomePage: FC = () => {
    const [model, setModel] = useState<LoginModel | null>(null);

    const backToLogin  = () => {
        setModel(new LoginModel(goToReset));
    };

    const goToReset = () => {
        setModel(new ResetModel(backToLogin));
    };

    const exit = () => {
        setModel(new LoginModel(goToReset));
    };

    useEffect(() => {
       setModel(new HomeModel(exit));
    }, []);

   return (
        <Page>
            {model && <HomeView model={model} />}
        </Page>
    );
   };

export default HomePage;
