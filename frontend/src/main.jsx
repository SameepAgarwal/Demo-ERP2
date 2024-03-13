import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { DashboardProvider } from './Reducers/dashboardReducer.jsx';
import { ClassProvider } from './Reducers/classProvider.jsx';
import { UserProvider } from './Reducers/userProvider.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <UserProvider>
        <DashboardProvider>
            <ClassProvider>
                <App />
            </ClassProvider>
        </DashboardProvider>
    </UserProvider>
    ,);
