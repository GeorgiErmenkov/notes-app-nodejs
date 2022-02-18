const fs = require('fs')
const chalk = require('chalk')

const getNotes = () => {
    notes = loadNotes();

    console.log(chalk.yellow.inverse.bold("Your notes..." + "\n"))
    notes.map((note, index) => {
        console.log(chalk.inverse(`Note ${index + 1}`));
        console.log(chalk.green.bold(note.title))
        console.log(chalk.blue(`${note.body}\n`))
    })

}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find(note => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green('New note added!'))
    } else {
        console.log(chalk.red('Note title taken!'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes()
    let notesToKeep = notes.filter(note => note.title !== title)

    if (notesToKeep.length === notes.length) {
        console.log(chalk.red('Note with this name doesnt exist'))
    } else {
        console.log(chalk.green('Note with title ' + title + ' was removed'))
        saveNotes(notesToKeep)
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const readNote = (title) => {
    const notes = loadNotes();

    const noteToBeRead = notes.find((note) => note.title === title)

    if (noteToBeRead) {
        console.log(chalk.green.bold(noteToBeRead.title))
        console.log(chalk.blue(noteToBeRead.body))
    } else {
        console.log(chalk.red('There isn\'t a note with that title'))
    }
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json').toString()
        return JSON.parse(dataBuffer)
    } catch (e) {
        return []
    }

}

module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote,
}