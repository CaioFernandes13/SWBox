import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, Platform } from 'ionic-angular';
import { Serial } from '@ionic-native/serial';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  waterItems: Array<{img: string, alt: string, icon: string, items: Array<{description: string, value: string}>}>;
  item: Array<{description: string, value: string}>
  
  altura;
  serial: Serial;

  measurement: Observable<any>;
  public obj: any;
  public quantAgua: any;

  url:string = 'http://127.0.0.1:5000/';

  constructor(public navCtrl: NavController, public httpClient: HttpClient) { 
    this.measurement = this.httpClient.get(this.url);
    this.measurement
    .subscribe(data => {
      this.obj = data
      this.quantAgua = this.obj.distance
      this.waterItems[0].items[0].value = (this.quantAgua + ' L')
      console.log('my data: ', this.quantAgua);
    })
    
    //this.serial = params.data.serial;
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
    //this.teste();
  }
  //  private teste(){
  //   this.http.get('http://ionic.io', {})
  //   .then(data => {

  //     console.log(data.status);
  //     console.log(data.data); // data received by server
  //     console.log(data.headers);

  //   })
  // }

  atualizar(){
    this.measurement = this.httpClient.get(this.url);
    this.measurement
    .subscribe(data => {
      this.obj = data
      this.quantAgua = this.obj.distance
      this.waterItems[0].items[0].value = (this.quantAgua + ' L')
      console.log('my data: ', this.quantAgua);
    })
  }
}