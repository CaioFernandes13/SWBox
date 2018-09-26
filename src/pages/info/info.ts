import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { Serial } from '@ionic-native/serial';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  waterItems: Array<{img: string, alt: string, icon: string, items: Array<{description: string, value: string}>}>;
  item: Array<{description: string, value: string}>
  quantAgua;
  altura;
  serial: Serial;
  constructor(params: NavParams) {
    this.quantAgua = params.data.item;
    this.serial = params.data.serial;
    this.waterItems = [

      { img: '../../assets/imgs/water-remain.png', alt: "Água restante!", icon:"water", 
        items: [{description: 'Quantidade de água restante:', value: this.quantAgua + ' L'}] 
      },

      { img: '../../assets/imgs/water-usage.jpg', alt: "Uso de água!", icon:"done-all", 
        items: [{description: 'Minutos restantes de banho:', value: (this.quantAgua/8) + ' minutos'}, 
        {description: 'Quantidade de descargas restantes:', value: (this.quantAgua/10) + ' descargas'},
        {description: 'É possível escovar os dentes:', value: (this.quantAgua/0.5) + ' vezes'}, 
        {description: 'É possível usar máquina de lavar em sua capacidade máxima:', value: (this.quantAgua/16) + ' vezes'}, 
        {description: 'É possível deixar a torneira ligada continuamente, em sua vazão máxima, por:', value: (this.quantAgua/10) + ' minutos'}]
      },

      { img: '../../assets/imgs/water-cost.jpg', alt: "Valor da água!", icon:"logo-usd", 
        items: [{description: 'Quantidade gasta de água :', value: this.quantAgua}, {description: 'Valor a pagar:', value: this.quantAgua*0.018}] 
      }
      
    ];
  }

  public writeSerial(data){
    this.serial.write(data);
  }

  public readSerial(){
    this.altura = this.serial.read();
    console.log(this.altura);
  }
}