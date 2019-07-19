import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastController  } from '@ionic/angular';
import { DatePipe } from '@angular/common';

export interface Dev {
  id: number,
  name: string,
  phone: string,
  img: string
}
 
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  numbers = new BehaviorSubject([]);
  //products = new BehaviorSubject([]);
  async presentToast(val:string) {
    const toast = await this.toastController.create({
      message: val,
      duration: 5000
    });
    toast.present();
  }
  constructor(private plt: Platform, private sqlite: SQLite,private http: HttpClient,
    public toastController: ToastController,private datePipe: DatePipe) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'phoneNumber.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
        db.executeSql('CREATE TABLE IF NOT EXISTS allNumber(id INTEGER PRIMARY KEY, name TEXT, phone TEXT, img TEXT)',[])
        .then(res => {
             console.log('Executed SQL');
            //this.presentToast('table created')
          })
        .catch(e => console.log(e));
        //db.executeSql('DROP TABLE ledgerCatagory',[]).then(val=>{console.log("drop success lc")}).catch(err=>{console.log("drop fail lc")});
       // db.executeSql('DROP TABLE ledger',[]).then(val=>{console.log("drop success")}).catch(err=>{console.log("drop fail")});
          db.executeSql('CREATE TABLE IF NOT EXISTS ledgerCatagory(catagory_id INTEGER PRIMARY KEY AUTOINCREMENT,catagory_name VARCHAR,category_date VARCHAR)',[]).then(val=>{}).catch(err=>{});
          db.executeSql('CREATE TABLE IF NOT EXISTS ledger(ledger_id INTEGER PRIMARY KEY AUTOINCREMENT,activityName VARCHAR,spent INTEGER,mdate VARCHAR,mtime VARCHAR,catagory_id INTEGER,CONSTRAINT fk_category FOREIGN KEY (catagory_id) REFERENCES ledgerCatagory(catagory_id))',[]).then(val=>{console.log('done all table')}).catch(err=>{console.log('err in foreign table creation')});
        this.database = db;
        this.loadNumbers();
        this.dbReady.next(true);
        
      });
    });
  }
 
 /* seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadDevelopers();
          this.loadProducts();
          this.dbReady.next(true);
        })
        .catch(e => console.error(e));
    });
  }*/
 
  getDatabaseState() {

    return this.dbReady.asObservable();
  }
 
  getNums(): Observable<any> {
    //resolve(this.loadNumbers.all(promises));
    return this.numbers.asObservable();
    
  }
  loadledgerCatagory() : Promise<any[]>{
    return this.database.executeSql('SELECT * FROM ledgerCatagory', []).then(data => {
      let nums= [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            nums.push({ 
                catagory_id: data.rows.item(i).catagory_id,
                catagory_name: data.rows.item(i).catagory_name,
                category_date: data.rows.item(i).category_date
              });         
        }
      }
      return Promise.all(nums);
    })
  }
  loadCatagory(id: number) : Promise<any[]>{
    return this.database.executeSql('SELECT * FROM ledger WHERE catagory_id = ?', [id]).then(data => {
    //  return this.database.executeSql('SELECT * FROM ledger', []).then(data => {
      let nums= [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
            nums.push({ 
                ledger_id: data.rows.item(i).ledger_id,
                activityName: data.rows.item(i).activityName,
                spent: data.rows.item(i).spent,
                mdate: data.rows.item(i).mdate,
                mtime: data.rows.item(i).mtime
              });         
        }
      }
      return Promise.all(nums);
    })
  }
  /////
  loads() : Promise<any[]> {
    return this.database.executeSql('SELECT * FROM allNumber', []).then(data => {
      let nums= [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

            nums.push({ 
                id: data.rows.item(i).id,
                name: data.rows.item(i).name, 
                phone: data.rows.item(i).phone, 
                img: data.rows.item(i).img
              });         
        }
      }
      return Promise.all(nums)
      //this.numbers.next(numbers);
      //return resolve(this.loads.all(numbers))
    });
  }
  /////
  loadNumbers() {
    return this.database.executeSql('SELECT * FROM allNumber', []).then(data => {
      let numbers: Dev[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {

            numbers.push({ 
            id: data.rows.item(i).id,
            name: data.rows.item(i).name, 
            phone: data.rows.item(i).phone, 
            img: data.rows.item(i).img
           });
        }
      }
      this.numbers.next(numbers);
    });
  }
 
  addNumber(name, phone, img) {
    let data = [name, phone, img];
    return this.database.executeSql('INSERT INTO allNumber (name, phone, img) VALUES (?, ?, ?)', data).then(data => {
      this.loadNumbers;
    });
  }
  addLedgerCategory(catagory_name) {

    let myDate = new Date();
    let category_date = this.datePipe.transform(myDate, 'dd-MM-yyyy');
    let data = [catagory_name, category_date];
    console.log(data);
    console.log("in ledger category");
    return this.database.executeSql('INSERT INTO ledgerCatagory (catagory_name, category_date) VALUES (?, ?)', data).then(data => {
      this.loadledgerCatagory();
    });
  }
  addCategory(activityName,spent,mdate,mtime, catagory_id) {
    let fk_category = catagory_id;
    let data = [activityName,spent,mdate,mtime,Number(catagory_id)];
    console.log(data);
    console.log("in category");
    return this.database.executeSql('INSERT INTO ledger (activityName,spent,mdate,mtime,catagory_id) VALUES (?, ?, ?, ?, ?)', data).then(data => {
      this.loadCatagory(catagory_id);
    });
  }
  getNumber(id): Promise<Dev> {
    return this.database.executeSql('SELECT * FROM allNumber WHERE id = ?', [id]).then(data => {
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name, 
        phone: data.rows.item(0).phone, 
        img: data.rows.item(0).img
      }
    });
  }
  getLedgerCategory(id): Promise<any> {
    return this.database.executeSql('SELECT * FROM ledgerCatagory WHERE catagory_id = ?', [id]).then(data => {
      return {
        catagory_id: data.rows.item(0).catagory_id,
        catagory_name: data.rows.item(0).catagory_name,
        category_date: data.rows.item(0).category_date
      }
    });
  }
  getCategory(id): Promise<any> {
    return this.database.executeSql('SELECT * FROM ledger WHERE ledger_id = ?', [id]).then(data => {
      return {
        ledger_id: data.rows.item(0).ledger_id,
        activityName: data.rows.item(0).activityName,
        spent: data.rows.item(0).spent,
        mdate: data.rows.item(0).mdate,
        mtime: data.rows.item(0).mtime
      }
    });
  }
  getNumberByname(id): Promise<Dev> {
    return this.database.executeSql('SELECT * FROM allNumber WHERE name = ?', [id]).then(data => {

      console.log(id);
      //console.log(data.rows.item(0))
      return {
        id: data.rows.item(0).id,
        name: data.rows.item(0).name, 
        phone: data.rows.item(0).phone, 
        img: data.rows.item(0).img
      }
    });
  }
  deleteNumbers(id) {
    return this.database.executeSql('DELETE FROM allNumber WHERE name = ?', [id]).then(_ => {
      this.loadNumbers();

    });
  }
  deleteLedgerCategory(id) {
    return this.database.executeSql('DELETE FROM ledgerCatagory WHERE catagory_id = ?', [id]).then(_ => {
      this.loadledgerCatagory();

    });
  }
  deletCategory(id) {
    return this.database.executeSql('DELETE FROM ledger WHERE ledger_id = ?', [id]).then(_ => {
      //this.loadCatagory();

    });
  }
  updateNumbers(dev: Dev) {
    let data = [dev.name, dev.phone, dev.img];
    return this.database.executeSql(`UPDATE allNumber SET name = ?, skills = ?, img = ? WHERE id = ${dev.id}`, data).then(data => {
      this.loadNumbers();
    })
  }
 

 

  /////
}