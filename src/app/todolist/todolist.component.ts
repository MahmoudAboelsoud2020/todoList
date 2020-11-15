import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { TodolistService } from './shared/todolist.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.scss'],
  providers: [TodolistService]
})
export class TodolistComponent implements OnInit {
 toDolistArray: any[];
 items: Observable<any[]>;
  constructor(private todolistservice: TodolistService) { }

  ngOnInit() {

   this.items = this.todolistservice.getAllToDoList().snapshotChanges().pipe(
    map(changes =>
      changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
    )
  );
    }

    onAdd(itemtitle){
      this.todolistservice.addTitle(itemtitle.value);
      itemtitle.value = null;
    }


    updateItem(key: string, newText: string) {
      this.todolistservice.updateItem(key, newText );
    }

    deleteItem(key: string) {
      this.todolistservice.deleteItem(key);
    }



}
