import {Page, Toast, NavController} from 'ionic-angular';
import {DatePicker, LocalNotifications} from 'ionic-native';
import {FormBuilder, Validators} from 'angular2/common';


@Page({
  templateUrl: 'build/pages/home/home.html',
})
export class HomePage {

  at:Date;
  every:string;
  formatedDate:string;
  nav:NavController;
  loginForm:any;

  constructor(nav: NavController, form: FormBuilder) {
    this.nav = nav;

    this.loginForm = form.group({
      id:["", Validators.required],
      text:["", Validators.required],
      title:["", Validators.required]

    });
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

  notify(event){
    LocalNotifications.schedule({
      id:this.loginForm.value.id,
      title:this.loginForm.value.title,
      text:this.loginForm.value.text,
      at:this.at,
      every:this.every
    });

    this.nav.present(Toast.create({
      message:'Programmed notification !',
      duration:3000
    }));
  }

  cancelById(){
    LocalNotifications.cancel(this.loginForm.value.id)
      .then(() => this.nav.present(Toast.create({
        message:'Notification '+this.loginForm.value.id+' deleted !',
        duration:3000
      })));
  }

  clearAll(){
    LocalNotifications.clearAll()
    .then(() => this.nav.present(Toast.create({
      message:'All notifications cleared !',
      duration:3000
    })));
  }

}
