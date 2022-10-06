const addBtn = document.querySelector(`.add`)
const delAllBtn = document.querySelector(`.delete-all`)
const delBtn = document.getElementsByClassName(`delete`)
const saveBtn = document.querySelector(`.save`)
const cancelBtn = document.querySelector(`.cancel`)

const shadowPanel = document.querySelector(`.panel-shadow`)
const noteArea = document.querySelector(`.notes`)
const category = document.querySelector(`#category`)
const textarea = document.querySelector(`#text`)
const error = document.querySelector(`.error`)

let selectedValue
let cardID = 0

const showPanel = () => {
	textarea.value = ``
	category.value = '0'
	error.style.visibility = `hidden`
	if (shadowPanel.style.display !== `block`) {
		shadowPanel.style.display = `block`
	} else {
		shadowPanel.style.display = `none`
	}
}

const addNote = () => {
	if (textarea.value != `` && category.options[category.selectedIndex].value != `0`) {
		error.style.visibility = `hidden`
		createNote()
	} else {
		error.style.visibility = `visible`
	}
}

const createNote = () => {
	const newNote = document.createElement(`div`)
	newNote.classList.add(`note`)
	newNote.setAttribute(`id`, cardID)

	newNote.innerHTML = `
    <div class="note-header">
        <h3 class="note-title">${selectedValue}</h3>
        <button class="delete" onclick="deleteNote(${cardID})">
            <i class="fas fa-times icon"></i>
        </button>
    </div>
    <div class="note-body">
        <p>${textarea.value}</p>
    </div>`

	noteArea.append(newNote)
	checkColor(newNote)
	cardID++
}

const selectValue = () => {
	selectedValue = category.options[category.selectedIndex].text
}

const checkColor = note => {
	switch (selectedValue) {
		case `Shoping`:
			note.style.backgroundColor = `rgb(240,240,0)`
			break
		case `Work`:
			note.style.backgroundColor = `rgb(240,0,240)`
			break
		case `Other`:
			note.style.backgroundColor = `rgb(0,255,255)`
			break
	}
}

const deleteNote = id => {
	const noteToDel = document.getElementById(id)
	noteArea.removeChild(noteToDel)
}
const deleteAll = () => {
	noteArea.textContent = ``
}

addBtn.addEventListener(`click`, showPanel)
cancelBtn.addEventListener(`click`, showPanel)
saveBtn.addEventListener(`click`, addNote)
delAllBtn.addEventListener(`click`, deleteAll)
window.addEventListener(`click`, e => {
	e.target === shadowPanel ? showPanel() : false
})
