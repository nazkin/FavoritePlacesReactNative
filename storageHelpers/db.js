import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('places.db');

export const init = () => {

 const promise = new Promise((resolve, reject)=> {
     
    db.transaction(tx => {
        tx.executeSql(
            'CREATE TABLE IF NOT EXISTS places (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, imgUri TEXT NOT NULL, address TEXT NOT NULL, lat REAL NOT NULL, lng REAL NOT NULL);',
            [],
            //success
            ()=>{
                resolve();
            },
            //fail
            (_, err)=> {
                reject(err);
            }
        );
    });
 });
return promise;
}

export const insertPlace = (title, imgUri, address, lat, lng) => {
    
    const promise = new Promise((resolve, reject)=> {
        
       db.transaction(tx => {
           tx.executeSql(
               'INSERT INTO places (title, imgUri, address, lat, lng) VALUES (?, ?, ?, ?, ?);',
               [title, imgUri, address, lat, lng],
               //success
               (_, result)=>{
                   resolve(result);
               },
               //fail
               (_, err)=> {
                   reject(err);
               }
           );
       });
    });
   return promise;
   }

   export const fetchPlaces = () => {
    const promise = new Promise((resolve, reject)=> {
        
        db.transaction(tx => {
            tx.executeSql(
                'SELECT * FROM places',
                [],
                //success
                (_, result)=>{
                    resolve(result);
                },
                //fail
                (_, err)=> {
                    reject(err);
                }
            );
        });
     });
    return promise;
   }