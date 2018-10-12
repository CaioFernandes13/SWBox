import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { WaterBoxProvider } from '../../providers/water-box/water-box';

@Component({
  selector: 'page-config',
  templateUrl: 'config.html'
})

export class ConfigPage {
  boxOptions: Array<{value: string, description: string, img: string, alt: string;}>;
  formatBox: string;
  box_kind: string;
  height: number;
  width: number;
  depth: number;
  capacity: number;
  typeQuadrado: boolean = false;
  typeCilindro: boolean = false;

  constructor(public navCtrl: NavController, private database: WaterBoxProvider, public alertCtrl: AlertController) { 

    this.boxOptions = [
      {value: 'cilindro', description: 'Cilíndrica', img: "../../assets/imgs/icon.jpg", alt: ""},
      {value: 'retangulo', description: 'Retangular', img: "", alt: ""},
      {value: 'cilindrof', description: 'Cilíndrica Fechada', img: "", alt: ""}
    ]

    this.setValues();

  }

  confirmar() {
    this.showAlert()
    this.capacity = (this.height*this.width*this.depth)/1000
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

  public isFormato(){
    if (this.box_kind == 'quadrado') {
      this.typeQuadrado = true;
    }
    else if(this.box_kind == 'cilindro'){
      this.typeCilindro = true;
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
