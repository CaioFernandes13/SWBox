import { Injectable } from '@angular/core';
import {SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../database/database';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  constructor(private dbProvider: DatabaseProvider) {
    console.log('Hello UserProvider Provider');
  }

}
