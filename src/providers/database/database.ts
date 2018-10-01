import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DatabaseProvider {

  constructor(private sqlite: SQLite) {
    console.log('Hello DatabaseProvider Provider');
  }

  public getDB(){
    return this.sqlite.create({
      name: 'water-box.db',
      location: 'default'
    });
  }

  public createDatabase(){
    return this.getDB()
      .then((db: SQLiteObject) =>{
        this.createTables(db);
      })
      .catch(e => console.log(e));
  }

  private createTables(db: SQLiteObject){
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS WaterBox (id integer primary key AUTOINCREMENT NOT NULL, box_kind TEXT, height REAL, width REAL, depth REAL, capacity REAL)'],
      ['CREATE TABLE IF NOT EXISTS History (id integer primary key AUTOINCREMENT NOT NULL, date DATE,  consumption REAL, id_user integer, FOREIGN KEY(id_user) REFERENCES User(id))'],
      ['CREATE TABLE IF NOT EXISTS User (id integer primary key AUTOINCREMENT NOT NULL, mac_adress TEXT, ip_adress TEXT, id_water_box integer, FOREIGN KEY(id_water_box) REFERENCES WaterBox(id))']
    ])

    .then(() => console.log('Tabelas criadas'))
    .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  // private insertDefaultItems(db: SQLiteObject) {
  //   db.executeSql('select COUNT(id) as qtd from WaterBox', {})
  //   .then((data: any) => {
  //     //Se não existe nenhum registro
  //     if (data.rows.item(0).qtd == 0) {
 
  //       // Criando as tabelas
  //       db.sqlBatch([
  //         ['insert into categories (name) values (?)', ['Hambúrgueres']],
  //         ['insert into categories (name) values (?)', ['Bebidas']],
  //         ['insert into categories (name) values (?)', ['Sobremesas']]
  //       ])
  //         .then(() => console.log('Dados padrões incluídos'))
  //         .catch(e => console.error('Erro ao incluir dados padrões', e));
 
  //     }
  //   })
  //   .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  // }

}
