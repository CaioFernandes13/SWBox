import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { InfoPage } from '../../pages/info/info';
import { Serial } from '@ionic-native/serial';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  quantAgua;
  altura;
  delta:number;
  pot:number;
  str;
  lastRead: number = 0;
  isStarted: boolean = false;
  constructor(public navCtrl: NavController, private serial: Serial) {}

  public startMonitor(){
    this.serial.requestPermission().then(() => {
      this.serial.open({
        baudRate: 9600,
        dataBits: 4,
        stopBits: 1,
        parity: 0,
        dtr: true,
        rts: true,
        sleepOnPause: false
      }).then(() => {
        console.log('Serial connection opened');
        this.isStarted = true;
      });
    }).catch((error: any) => console.log(error));
    this.altura = this.serial.read();
    console.log("teste");
    console.log(this.altura);
    this.altura = this.serial.registerReadCallback();
    var view = new Uint8Array(this.altura);
    // if(view.length >= 1) {
    //     for(var i=0; i < view.length; i++) {
    //         // if we received a \n, the message is complete, display it
    //         if(view[i] == 13) {
    //             // check if the read rate correspond to the arduino serial print rate
    //             var now;
    //             this.delta = now - this.lastRead;
    //             this.lastRead = now;
    //             // display the message
    //             var value = (this.str);
    //             this.pot = value;
    //             this.str = '';
    //         }
    //         // if not, concatenate with the begening of the message
    //         else {
    //             var temp_str = String.fromCharCode(view[i]);
    //             var str_esc = escape(temp_str);
    //             this.str += unescape(str_esc);
    //         }
    //     }
    // }
    console.log(this.altura);
    console.log(view);
    this.quantAgua = 1000;
    this.navCtrl.push(InfoPage, {item : this.quantAgua, serial : this.serial});
  }
  
}