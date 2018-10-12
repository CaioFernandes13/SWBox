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
  waterItems: Array<{img: string, alt: string, icon: string, items: Array<{description: string, before: string, value: number, after: string}>}>;
  item: Array<{description: string, value: string}>
  
  box_kind: string = "retangulo";
  height: number = 100;
  width: number = 100;
  depth: number = 100;
  radius: number = 50;
  capacity: number;
  water: number;

  measurement: Observable<any>;
  public obj: any;
  public heightSensor: any;

  url:string = 'http://127.0.0.1:5000/';

  constructor(public navCtrl: NavController, public httpClient: HttpClient) { 
    this.measurement = this.httpClient.get(this.url);
    this.measurement
    .subscribe(data => {
      this.obj = data
      this.heightSensor = this.obj.distance
      this.water = this.calcWater(this.heightSensor);
      console.log('Water: ', this.water);
      this.updateData();
      console.log('Height Sensor: ', this.heightSensor);
    })
  }

  public update(){
    this.measurement = this.httpClient.get(this.url);
    this.measurement
    .subscribe(data => {
      this.obj = data
      this.heightSensor = this.obj.distance
      this.water = this.calcWater(this.heightSensor);
      console.log('Water: ', this.water);
      this.updateData();
      console.log('Height Sensor: ', this.heightSensor);
    })
  }

  private updateData(){
    this.waterItems = [

      { img: '../../assets/imgs/water-remain.png', alt: "Água restante!", icon:"water", 
        items: [{description: 'Quantidade de água restante:', before:"", value: this.water, after: ' L'}] 
      },

      { img: '../../assets/imgs/water-usage.jpg', alt: "Uso de água!", icon:"done-all", 
        items: [{description: 'Minutos restantes de banho:', before:"", value: (this.water/8), after: ' minutos'}, 
        {description: 'Quantidade de descargas restantes:', before:"", value: (this.water/10), after: ' descargas'},
        {description: 'É possível escovar os dentes:', before:"", value: (this.water/0.5), after: ' vezes'}, 
        {description: 'É possível usar máquina de lavar em sua capacidade máxima:', before:"", value: (this.water/16), after: ' vezes'}, 
        {description: 'É possível deixar a torneira ligada continuamente, em sua vazão máxima, por:', before:"", value: (this.water/10), after: ' minutos'}]
      },

      { img: '../../assets/imgs/water-cost.jpg', alt: "Valor da água!", icon:"logo-usd", 
        items: [{description: 'Quantidade gasta de água :', before:"", value: this.water, after: " L"}, {description: 'Valor a pagar:', before:"R$", value: this.water*0.018, after:""}] 
      }
      
    ];
  }

  public calcWater(heightSensor){
    heightSensor = this.height - heightSensor;
    console.log('Height Sensor2: ', heightSensor);
    if (this.box_kind == 'retangulo') {
      return (heightSensor*this.width*this.depth)/1000
    }
    else if(this.box_kind == 'cilindro'){
      return (3.14*this.radius*this.radius)*heightSensor/1000
    }
  }


}