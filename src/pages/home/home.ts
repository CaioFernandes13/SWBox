import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../../pages/info/info';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  constructor(public navCtrl: NavController) {}

  public startMonitor(){
    this.navCtrl.push(InfoPage, {});
  }
}