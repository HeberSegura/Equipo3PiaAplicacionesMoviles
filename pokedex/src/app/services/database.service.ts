import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Storage } from '@ionic/storage';

export interface Log {
  id: number,
  user: string,
  pwd: string
}

@Injectable()
export class DatabaseService {
  database: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  logs = new BehaviorSubject([]);
 
  //Lógica para crear la base de datos
  constructor(public sqlitePorter: SQLitePorter, private storage: Storage, private sqlite: SQLite, private platform: Platform, private http: HttpClient) {
    this.databaseReady = new BehaviorSubject(false);
    this.platform.ready().then(() => {
      return this.sqlite.create({
        name: 'logs.db',
        location: 'default'
      })
        .then((db: SQLiteObject) => {
          this.database = db;
          this.fillDatabase();
          });
        });
  }
  
  //Lógica que llena la base de datos
  fillDatabase() {
    this.http.get('assets/login.sql', { responseType: 'text' })
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.database, sql)
          .then(data => {
            this.loadLogs();
            this.databaseReady.next(true);
          })
          .catch(e => console.error(e));
      });
  }

  //Ayudando a llenar la base de datos
  loadLogs() {
    return this.database.executeSql('SELECT * FROM log', []).then(data => {
      let logs: Log[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          logs.push({ 
            id: data.rows.item(i).id,
            user: data.rows.item(i).user, 
            pwd: data.rows.item(i).pwd
           });
        }
      }
      this.logs.next(logs);
    });
  }
 
  //Lógica que lee la base de datos
  getLogs() {
    return this.database.executeSql("SELECT * FROM log", []).then((data) => {
      let logs = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          logs.push({ user: data.rows.item(i).user, pwd: data.rows.item(i).pwd });
        }
      }
      return logs;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
 
  getDatabaseState() {
    return this.databaseReady.asObservable();
  }
 
}