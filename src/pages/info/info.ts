import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  public startMonitor(){
    this.navCtrl.push(InfoPage);
  }
}

@Component({
  templateUrl: 'info.html'
})
class InfoPage {
  
  constructor(public navCtrl: NavController) { }

  goBack() {
    this.navCtrl.pop();
  }
}