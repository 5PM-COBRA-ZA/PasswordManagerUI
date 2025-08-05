import { createRoot } from 'react-dom/client'
import './main.css'
import {PrimeReactProvider} from "primereact/api";
import {RouterProvider} from "react-router";
import {router} from "./routes/routes.tsx";
import 'primereact/resources/themes/bootstrap4-dark-blue/theme.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

createRoot(document.getElementById('root')!).render(
    <PrimeReactProvider>
        <RouterProvider router={router} />
    </PrimeReactProvider>
  ,
)
