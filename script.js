const toggleModeBtn = document.getElementById("toggle-mode");
const addNoteBtn = document.getElementById("add-note");
const notesArea = document.getElementById("notes-area");

// Initialize theme
document.documentElement.setAttribute("data-theme", localStorage.getItem("theme") || "light");

// Toggle Light/Dark Mode
toggleModeBtn.addEventListener("click", () => {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  toggleModeBtn.textContent = newTheme === "light" ? "Dark Mode" : "Light Mode";
});

// Load saved notes
const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
savedNotes.forEach(addNoteToDOM);

// Add New Note
addNoteBtn.addEventListener("click", () => {
  const newNote = { id: Date.now(), content: "" };
  savedNotes.push(newNote);
  addNoteToDOM(newNote);
  saveNotesToLocalStorage();
});

// Save Notes to Local Storage
function saveNotesToLocalStorage() {
  localStorage.setItem("notes", JSON.stringify(savedNotes));
}

// Add Note to DOM
function addNoteToDOM(note) {
  const noteDiv = document.createElement("div");
  noteDiv.classList.add("note");

  const textarea = document.createElement("textarea");
  textarea.value = note.content;
  textarea.placeholder = "Write your note here...";
  textarea.addEventListener("input", (e) => {
    note.content = e.target.value;
    saveNotesToLocalStorage();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", () => {
    notesArea.removeChild(noteDiv);
    const index = savedNotes.findIndex((n) => n.id === note.id);
    savedNotes.splice(index, 1);
    saveNotesToLocalStorage();
  });

  noteDiv.appendChild(textarea);
  noteDiv.appendChild(deleteBtn);
  notesArea.appendChild(noteDiv);
}