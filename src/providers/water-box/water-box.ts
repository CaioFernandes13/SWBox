import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';
/*
  Generated class for the WaterBoxProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WaterBoxProvider {

  constructor(private dbProvider: DatabaseProvider) {
    console.log('Hello WaterBoxProvider Provider');
  }

  public insert(box_kind: string, height: number, width: number, depth: number, capacity: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'insert into WaterBox (box_kind, height, width, depth, capacity) values (?, ?, ?, ?, ?)';
        let data = [box_kind, height, width, depth, capacity];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public update(waterBox: WaterBox) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'update WaterBox set box_kind = ?, height = ?, width = ?, depth = ?, capacity = ? where id = ?';
        let data = [waterBox.box_kind, waterBox.height, waterBox.width, waterBox.depth, waterBox.capacity, waterBox.id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public remove(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'delete from WaterBox where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  public get(id: number) {
    return this.dbProvider.getDB()
      .then((db: SQLiteObject) => {
        let sql = 'select * from WaterBox where id = ?';
        let data = [id];
 
        return db.executeSql(sql, data)
          .then((data: any) => {
            if (data.rows.length > 0) {
              let item = data.rows.item(0);
              let waterBox = new WaterBox();
              waterBox.id = item.id;
              waterBox.box_kind = item.box_kind;
              waterBox.height = item.height;
              waterBox.width = item.width;
              waterBox.depth = item.depth;
              waterBox.capacity = item.capacity;
 
              return waterBox;
            }
 
            return null;
          })
          .catch((e) => console.error(e));
      })
      .catch((e) => console.error(e));
  }
 
  // public getAll(active: boolean, name: string = null) {
  //   return this.dbProvider.getDB()
  //     .then((db: SQLiteObject) => {
  //       let sql = 'SELECT p.*, c.name as category_name FROM products p inner join categories c on p.category_id = c.id where p.active = ?';
  //       var data: any[] = [active ? 1 : 0];
 
  //       // filtrando pelo nome
  //       if (name) {
  //         sql += ' and p.name like ?'
  //         data.push('%' + name + '%');
  //       }
 
  //       return db.executeSql(sql, data)
  //         .then((data: any) => {
  //           if (data.rows.length > 0) {
  //             let products: any[] = [];
  //             for (var i = 0; i < data.rows.length; i++) {
  //               var product = data.rows.item(i);
  //               products.push(product);
  //             }
  //             return products;
  //           } else {
  //             return [];
  //           }
  //         })
  //         .catch((e) => console.error(e));
  //     })
  //     .catch((e) => console.error(e));
  // }
}
 
export class WaterBox {
  id: number;
  box_kind: string;
  height: number;
  width: number;
  depth: number;
  capacity: number;
}
