import {App, IonicApp, Platform, MenuController} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';


@App({
  templateUrl:'build/app.html' ,
  config: {} // http://ionicframework.com/docs/v2/api/config/Config/
})
export class MyApp {
  rootPage: any = HomePage;
  pages:any[];
  menu:MenuController;
  app:IonicApp;

  constructor(platform: Platform, app: IonicApp, menu: MenuController) {

    this.app = app;
    this.menu = menu;
    
    this.pages = [
      {title:'Home', component:HomePage}
    ];

    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    let nav = this.app.getComponent('nav');
    nav.setRoot(page.component);
  }
}
