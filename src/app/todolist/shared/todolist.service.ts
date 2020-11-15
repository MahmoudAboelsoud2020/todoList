import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TodolistService {
// url:string
  toDolist: AngularFireList<any>;
  items: Observable<any[]>;

constructor(private firebasedb: AngularFireDatabase) {
}


 getAllToDoList(){
    this.toDolist = this.firebasedb.list('/items');
    return this.toDolist;
 }

 addTitle(title: string){
   this.firebasedb.list('/items').push({
    title: title,
    isChecked : false
    });
 }

//  CheckOrNotTitle($key: string , flag: boolean){
//    this.toDolist.update($key , {isChecked : flag});
//  }


//  removeTitle($key: string){
//    this.toDolist.remove($key);
// }

updateItem(key: string, newText: string) {
  this.toDolist.set(key, { title: newText });
}
deleteItem(key: string) {
  this.toDolist.remove(key);
}


}
