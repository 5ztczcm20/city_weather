import { BrowserRouter, useRoutes } from 'react-router-dom';
import routes from '../routes';

const RenderRoutes = () => {
    const element = useRoutes(routes);
    return element;
};

const Router = () => {
    return (
        <BrowserRouter>
            <RenderRoutes />
        </BrowserRouter>
    );
};

export default Router;