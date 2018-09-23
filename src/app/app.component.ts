import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from '@ionic-native/header-color';
import { Serial } from '@ionic-native/serial';
import { SQLite } from '@ionic-native/sqlite'
import { DatabaseProvider } from '../providers/database/database';


import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { ConfigPage } from '../pages/config/config';

@Component({
  selector: 'page-app',
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = null;
  //rootPage: any = HomePage;
  //rootPage: any = AboutPage;
  //rootPage: any = ConfigPage;

  pages: Array<{title: string, icon: string, component: any}>;

  constructor(private headerColor: HeaderColor, private serial: Serial, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public dbProvider: DatabaseProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Monitoramento', icon:"pulse", component: HomePage },
      { title: 'Sobre', icon:"information-circle", component: AboutPage },
      { title: 'Configurações', icon:"build", component: ConfigPage }      
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.dbProvider.createDatabase()
        .then(() => {
          // fechando a SplashScreen somente quando o banco for criado
          this.openHomePage(this.splashScreen);
        })
        .catch(() => {
          // ou se houver erro na criação do banco
          this.openHomePage(this.splashScreen);
        });
      this.headerColor.tint("#0971c0");
    });
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = HomePage;
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
