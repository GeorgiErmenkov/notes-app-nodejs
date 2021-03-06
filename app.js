const chalk = require('chalk')
const yargs = require('yargs')
const process = require('process');
const notes = require('./notes')

// customize yargz

yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Actual note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Title of the note to be removed',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List all notes',
    handler() {
        notes.getNotes()
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read chosen note',
    builder: {
        title: {
            describe: 'Title of the note to be read',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.readNote(argv.title)
    }
})


// add, remove, read, list

yargs.parse()
