export function NewUserAdded(){ 
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