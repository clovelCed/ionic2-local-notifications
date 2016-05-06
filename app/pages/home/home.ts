import {Page, Toast, NavController} from 'ionic-angular';
import {LocalNotifications} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  nav:NavController;

  constructor(nav: NavController) {
    this.nav = nav;

    LocalNotifications.on('click', function(notif){
      nav.present(Toast.create({
        message:'Notification id : ' + notif.id + ' clicked !',
        duration:3000
      }));
    });

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

  clearAll(){
    LocalNotifications.clearAll()
    .then(() => this.toast('All notifications cleared !'));
  }

  public toast(msg: string){
    this.nav.present(Toast.create({
      message:msg,
      duration:3000
    }));
  }

}
