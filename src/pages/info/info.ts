import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  waterItems: Array<{img: string, alt: string, icon: string, items: Array<{description: string, before: string, value: number, after: string}>}>;
  item: Array<{description: string, value: string}>
  
  box_kind: string = "retangulo";
  height: number = 14;
  width: number = 10;
  depth: number = 14.5;
  radius: number = 50;
  capacity: number;
  water: number;

  measurement: Observable<any>;
  public obj: any;
  public heightSensor: any;
  success = (data) => console.log(data);
  fail = (error) => console.log("ERROR");
  url:string = 'http://127.0.0.1:5000/';

  constructor(public navCtrl: NavController, public httpClient: HttpClient, private bluetoothSerial: BluetoothSerial) { 
    this.bluetoothSerial.connect("SWB Device").subscribe(this.success, this.fail);
    this.update();
  }

  public update(){
    this.bluetoothSerial.write('1').then(this.success, this.fail);
    this.bluetoothSerial.readUntil("\n").then((data) => { console.log(data);
        var geral = data.split(",");
        var heightSensor = [0, 0, 0, 0];
        heightSensor[0] = parseInt(geral[0]);
        heightSensor[1] = parseInt(geral[1]);
        heightSensor[2] = parseInt(geral[2]);
        heightSensor[3] = parseInt(geral[3]);
        console.log('Height Sensor: ', this.heightSensor);
        if(this.heightSensor != '' && this.heightSensor <= this.height){
          this.water = this.calcWater(this.heightSensor);
          console.log('Water: ', this.water);
          this.updateData();
        }
      }   
    );
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