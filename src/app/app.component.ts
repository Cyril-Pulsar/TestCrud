import { Component } from '@angular/core';
import { SharedService } from './shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AngularFireCrud';
  constructor(private service: SharedService) {}
  notes: any = [];
  refreshNotes() {
    this.service.getNotes().subscribe((res) => {
      this.notes = res;
    });
  }

  addNotes(newNotes: string) {
    this.service.addNote(newNotes);
  }

  deleteNotes(id: string) {
    this.service.deleteNote(id);
  }

  ngOnInit() {
    this.refreshNotes();
  }
}
