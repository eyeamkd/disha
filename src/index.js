import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Provider } from 'react-redux';

import store from './redux/store';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#F57F17'
            },
        secondary: {
            main: '#F9A825'
            }
        },
    }
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <MuiThemeProvider theme={theme}>
                <App />
            </MuiThemeProvider>
        </BrowserRouter>
    </Provider>

, document.getElementById('root'));

Notification.requestPermission(status=>{
    console.log("Notification Status",status);
}) 


const displayNotification = () => { 
    console.log(Notification.permission)
    if (Notification.permission === 'granted') {
        navigator.serviceWorker.getRegistration().then(reg => {
            const options = {
                body: '',
                icon: 'https://raw.githubusercontent.com/eyeamkd/disha/master/src/assets/DISHA%20-%20Logo%20Black.png',
                vibrate: [100, 50, 100],
                data: {
                    dateOfArrival: Date.now(),
                    primaryKey: 1
                }, 
                actions: [
                        {action: 'explore', title: 'Go to the site',
                            icon: 'images/checkmark.png'},
                        {action: 'close', title: 'Close the notification',
                            icon: 'images/xmark.png'},
                        ]
                
                    // TODO 5.1 - add a tag to the notification
                
                };
        reg.showNotification('Welcome to Disha',options);
        });
} 
} 
// displayNotification();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register(); 
