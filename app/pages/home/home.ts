import {Page} from 'ionic-angular';
import {DatePicker, LocalNotifications} from 'ionic-native';


@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  at:Date;
  formatedDate:string;
  id:number;
  text:string;
  title:string;
  every:string;
  
  constructor() {

  }

  openDatePicker(){
    DatePicker.show({
      date:new Date(),
      minDate:new Date(),
      mode:'datetime',
      titleText:'Start notification'
    }).then(at => this.formatedDate = this.formatDate(at));
  }

  formatDate(date:Date){
    this.at = date;
    var options = { weekday: "long", year: "numeric", month: "short", day: "numeric", hour:"numeric", minute:"numeric" };
    return new Intl.DateTimeFormat("fr-FR", options).format(date);
  }

  notify(){
    LocalNotifications.schedule({
      id:this.id,
      title:this.title,
      text:this.text,
      at:this.at,
      every:this.every
    });
  }

}
