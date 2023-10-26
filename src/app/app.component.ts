import { Component, ElementRef, ViewChild } from '@angular/core';
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
  newNote: string = ''
  logAll() {
    console.log(this.notes);
  }

  openEdit(note: any) {
    const itemIdx = this.notes.findIndex((item: any) => item.id === note.id);
    this.notes[itemIdx].isEditing = true;
  }

  closeEdit(note: any) {
    const itemIdx = this.notes.findIndex((item: any) => item.id === note.id);
    this.notes[itemIdx].isEditing = false;
  }

  updateNote(note: any, newVal: any) {
    this.service.updateNote(note.id, newVal)
    let noteIdx = this.notes.findIndex((item: any) => item.id === note.id )
    this.notes[noteIdx].isEditing = false;
  }

  refreshNotes() {
    this.service.getNotes().subscribe((res) => {
      this.notes = res.map((item, idx) => {
        return {
          ...item,
          isEditing: this.notes.find((note: any) => note.id === item['id'])?.isEditing ?? false
        };  
      });
    });
  }


  addNotes(newNotes: string) {
    this.service.addNote(newNotes);
    this.newNote = ''
    
  }

  deleteNotes(id: string) {
    this.service.deleteNote(id);
  }

  ngOnInit() {
    this.refreshNotes();
  }
}
