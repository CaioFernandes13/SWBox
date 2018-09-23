import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../../pages/info/info';
import { Serial } from '@ionic-native/serial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  quantAgua;
  altura;
  constructor(public navCtrl: NavController, private serial: Serial) {}

  public startMonitor(){
    this.serial.requestPermission().then(() => {
      this.serial.open({
        baudRate: 9800,
        dataBits: 4,
        stopBits: 1,
        parity: 0,
        dtr: true,
        rts: true,
        sleepOnPause: false
      }).then(() => {
        console.log('Serial connection opened');
      });
    }).catch((error: any) => console.log(error));
    this.altura = this.serial.read();
    this.quantAgua = 1000;
    this.navCtrl.push(InfoPage, {item : this.quantAgua});
  }
}