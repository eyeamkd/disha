import Notification from 'react-web-notification';  

const options = { 
    body:'Hi',
    lang:'en'
}

export const sendNotificaiton = () => {

}  

export const checkNotificationPermission = () => {
  
    console.log(window.Notification.permission);
  } 
  

