import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { HeaderColor } from '@ionic-native/header-color';
import { Serial } from '@ionic-native/serial';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { InfoPage } from '../pages/info/info';
import { AboutPage } from '../pages/about/about';
import { ConfigPage } from '../pages/config/config';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../providers/database/database';
import { WaterBoxProvider } from '../providers/water-box/water-box';
import { HistoryProvider } from '../providers/history/history';
import { UserProvider } from '../providers/user/user';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    InfoPage,
    AboutPage,
    ConfigPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    InfoPage,
    AboutPage,
    ConfigPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    InAppBrowser,
    HeaderColor,
    Serial,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatabaseProvider,
    WaterBoxProvider,
    HistoryProvider,
    UserProvider
  ]
})
export class AppModule {}
