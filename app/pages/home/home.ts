import {Page, Toast, NavController} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  nav:NavController;

  constructor(nav: NavController) {
    this.nav = nav;
  }

  singleNotification(id: number, minute: number){

    let date = new Date();
    date.setMinutes(date.getMinutes() + minute);

    LocalNotifications.schedule({
      id:id,
      title:'Single notification',
      text:'This is a single notification',
      at:date
    });

    this.toast('Notification scheduled !');
  }

  multipleNotification(){

    let first = new Date();
    let second = new Date();
    second.setMinutes(first.getMinutes()+1);

    LocalNotifications.schedule([{
      id:2,
      title:'Multiple notification 1',
      text:'This is the first notification',
      at:first
    },
    {
      id:3,
      title:'Multiple notification 2',
      text:'This is the second notification',
      at:second
    }]);

    this.toast('Notification scheduled !');
  }

  cancelNotification(){
    LocalNotifications.cancel(4)
      .then(() => this.toast('Notification canceled'));
  }

  clearNotification(){

  }

  notify(event){
    /*LocalNotifications.schedule({
      id:this.loginForm.value.id,
      title:this.loginForm.value.title,
      text:this.loginForm.value.text,
      at:this.at,
      every:this.every
    });*/


  }


  clearAll(){
    LocalNotifications.clearAll()
    .then(() => this.nav.present(Toast.create({
      message:'All notifications cleared !',
      duration:3000
    })));
  }

  toast(msg: string){
    this.nav.present(Toast.create({
      message:msg,
      duration:3000
    }));
  }

}
