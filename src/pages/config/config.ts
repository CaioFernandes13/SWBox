import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { WaterBoxProvider } from '../../providers/water-box/water-box';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})

export class ConfigPage {
  boxOptions: Array<{value: string, description: string, measures: Array<{description: string, type: string}>}>;
  formatBox: string;
  box_kind: string;
  height: number;
  width: number;
  depth: number;
  radius: number;
  capacity: number;
  kindRetangulo: boolean = false;
  kindCilindro: boolean = false;

  constructor(public navCtrl: NavController, private database: WaterBoxProvider, public alertCtrl: AlertController) { 

    this.boxOptions = [
      {value: 'cilindro', description: 'Cilíndrica',
      measures: [{description: 'Altura (cm)', type: "height"}, {description: 'Raio (cm)', type: "radius"}]},
      {value: 'retangulo', description: 'Retangular', 
      measures: [{description: 'Altura (cm)', type: "height"}, {description: 'Largura (cm)', type: "width"}, {description: 'Profundidade (cm)', type: "depth"}]}
    ]

    this.setValues();

  }

  confirmar() {
    this.showAlert();
    this.calcCapacity();
    this.database.insert(this.box_kind, this.height, this.width, this.depth, this.capacity);
    console.log("Formato caixa: "+this.box_kind);
    console.log("Altura: "+this.height);
    console.log("Largura: "+this.width);
    console.log("Profundidade: "+this.depth);
    console.log("Capacidade: "+this.capacity);
  //console.log(this.box_kind);
  //insert(this.box_kind, this.height, this.width, this.depth, this.capacity);
  }

  showAlert(){
    const alert = this.alertCtrl.create({
      title: 'Sucesso!',
      subTitle: 'Caixa D\'Água configurada com sucesso!',
      buttons: ['OK']
    });
    alert.present();
  }

  private setValues(){
    //let waterBox = new WaterBox();
    //waterBox = Promise;
    //waterbox: Promise =  this.database.get(1);
    //this.formatBox = value;
  }

  public setKind(){
    console.log("Formato caixa: "+this.box_kind);
    if (this.box_kind == 'retangulo') {
      this.kindRetangulo = true;
      this.kindCilindro = false;
    }
    else if(this.box_kind == 'cilindro'){
      this.kindCilindro = true;
      this.kindRetangulo = false;
    }
  }

  public calcCapacity(){
    if (this.box_kind == 'retangulo') {
      this.capacity =  (this.height*this.width*this.depth)/1000
    }
    else if(this.box_kind == 'cilindro'){
      this.capacity = (3.14*this.radius*this.radius)*this.height/1000
    }
  }
}

export class WaterBox {
  id: number;
  box_kind: string;
  height: number;
  width: number;
  depth: number;
  capacity: number;
}
