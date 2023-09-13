export default class NotesAPI{
  static getAllNotes(){
    const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]")

    // https://stackoverflow.com/questions/10123953/how-to-sort-an-object-array-by-date-property
    return notes.sort((a, b) => {
      return new Date(b.updated) - new Date(a.updated) 
    })
  }

  static saveNote(noteToSave){
    const notes = NotesAPI.getAllNotes()
    const existing = notes.find(note => note.id == noteToSave.id)

    if (existing){
      existing.title = noteToSave.title
      existing.body = noteToSave.body
      existing.updated = new Date().toLocaleString()
    } else {
      noteToSave.id = Math.floor(Math.random() * 1000000)
      noteToSave.updated = new Date().toLocaleString()
      notes.push(noteToSave)
    }

    localStorage.setItem("notesapp-notes", JSON.stringify(notes))
  }

  static deleteNote(id){
    const notes = NotesAPI.getAllNotes()
    const newNotes = notes.filter(note => note.id != id)

    localStorage.setItem("notesapp-notes", JSON.stringify(newNotes))
  }
}