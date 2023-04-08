import { FC } from 'react';

import Page from '../components/Page';
import Link from '../components/ui/Link';
import Button from '../components/ui/Button';


const HomePage: FC = () => {
   return (
        <Page>
            <Link href='/'>
                <Button>ВЫХОД</Button>
            </Link>
        </Page>
    );
   };

export default HomePage;
