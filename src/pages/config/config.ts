import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})
export class ConfigPage {

  constructor(public navCtrl: NavController, public alerCtrl: AlertController) {

  }

  startMonitor(){
    //if(){
      const alert = this.alerCtrl.create({
        title: 'Sem dados da caixa',
        subTitle: "Vá na aba configurações e preencha os dados de sua caixa d'agua",
        buttons: ['OK']
      });
      alert.present();
    //}
  }
}
