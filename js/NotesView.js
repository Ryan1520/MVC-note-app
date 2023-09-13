export default class NotesView{
  constructor(root, {onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete} = {}){
    this.root = root
    this.onNoteAdd = onNoteAdd
    this.onNoteSelect = onNoteSelect
    this.onNoteEdit = onNoteEdit
    this.onNoteDelete = onNoteDelete
    // this.root.innerHTML = `
    //   <div class="notes__sidebar">
    //     <button class="notes__add" type="button">Add Note</button>
    //     <div class="notes__list"></div>
    //   </div>
    //   <div class="notes__preview">
    //     <input class="notes__title" type="text" placeholder="New Note..." />
    //     <textarea class="notes__body">Take Note...</textarea>
    //   </div>
    // `

    const btnAddNote = document.querySelector(".notes__add")
    const inpTitle = document.querySelector(".notes__title")
    const inpBody = document.querySelector(".notes__body")

    btnAddNote.addEventListener("click", () => {
      this.onNoteAdd()
    })
    
    inpTitle.addEventListener("blur", () => {
      const updatedTitle = inpTitle.value.trim()
      console.log(updatedTitle)
      this.onNoteEdit({title: updatedTitle})
    })

    inpBody.addEventListener("blur", () => {
      const updatedBody = inpBody.value.trim()
      console.log(updatedBody)
      this.onNoteEdit({body: updatedBody})
    })
  }

  _createListItemHTML(note){
    const MAX_BODY_LENGTH = 60

    return `
      <div class="notes__list-item" data-note-id="${note.id}">
        <div class="notes__small-title">${note.title}</div>
        <div class="notes__small-body">
          ${note.body.substring(0, MAX_BODY_LENGTH)}
          ${note.body.length > MAX_BODY_LENGTH ? "..." : ""}
        </div>
        <div class="notes__small-updated">
          ${
            // new Date(note.updated.toLocaleString("en-US", {   
            // timeZone: "Asia/Jakarta", 
            // dateStyle: "full", 
            // timeStyle: "short",
            // timeZoneName: "short" 
            // }))
            note.updated
          }
        </div>
      </div>
    `
  }

  updateNoteList(notes){
    console.log("Note List Updated")
    const notesListContainer = this.root.querySelector(".notes__list")

    notesListContainer.innerHTML = ""

    notes.forEach(note => {
      const html = this._createListItemHTML(note)

      notesListContainer.insertAdjacentHTML("beforeend", html)
    })
      
    notesListContainer.querySelectorAll(".notes__list-item").forEach(noteListItem => {
      noteListItem.addEventListener('click', () => {
        // console.log(noteListItem.dataset.noteId)
        this.onNoteSelect(noteListItem.dataset.noteId)
      })

      noteListItem.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you want to delete this note?");

        if (doDelete) {
          this.onNoteDelete(noteListItem.dataset.noteId);
        }
    });
    })
  }

  updateActiveNote(note){
    console.log('Update active note ' + note.id)
    this.root.querySelector(".notes__title").value = note.title
    this.root.querySelector(".notes__body").value = note.body

    this.root.querySelectorAll(".notes__list-item").forEach(noteListItem => {
      noteListItem.classList.remove("notes__list-item--selected")
    })
    // console.log(this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`))
    this.root.querySelector(`.notes__list-item[data-note-id="${note.id}"]`).classList.add("notes__list-item--selected")
  }
}