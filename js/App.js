import NotesView from "./NotesView.js"
import NotesAPI from "./NotesAPI.js"

export default class App{
  constructor(root) {
    this.notes = []
    this.activeNote = null
    this.view = new NotesView(root, this._handlers()) 
    
    this._refreshNotes()
  }

  _refreshNotes() {
    const notes = NotesAPI.getAllNotes()
    console.log(notes)
    this._setNotes(notes)
    if (notes.length > 0){
      this._setActiveNote(notes[0])
    }
  }

  _setNotes(notes) {
    this.notes = notes;
    this.view.updateNoteList(notes)
  }

  _setActiveNote(note) {
    this.activeNote = note
    this.view.updateActiveNote(note)
  }

  _handlers(){
    return{
      onNoteSelect: (noteId) => {
        const selectedNote = this.notes.find(note => note.id == noteId)
        this._setActiveNote(selectedNote)
      },

      onNoteAdd: () => {
        const newNote = {
          title: "New Note",
          body: "Take Note...",
        }
        console.log("Note added")
        NotesAPI.saveNote(newNote)
        this._refreshNotes()
      },

      onNoteEdit: (content) => {
        if('title' in content){
          NotesAPI.saveNote({
            id: this.activeNote.id,
            title: content.title,
            body: this.activeNote.body || 'abc',
          })
        }
        if('body' in content){
          NotesAPI.saveNote({
            id: this.activeNote.id,
            title: this.activeNote.title || 'def',
            body: content.body
          })
        }
        this._refreshNotes()
      },

      onNoteDelete: (noteId) => {
        NotesAPI.deleteNote(noteId)
        this._refreshNotes()
      }
    }
  }
}