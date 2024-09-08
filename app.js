const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let books = [
    {
        id: 1,
        name: "Amintiri din copilărie",
        author: {
            firstName: "Ion",
            lastName: "Creanga"
        },
        year: 1892,
        editions: [
            {
                publisher: "Editira Chisinau",
                year: 2000
            }
        ]
    }
];

app.post('/books', (req, res) => {
    const {id, name, author, year, editions} = req.body;

    const existingBook = books.find(b => b.id === id);
    if (existingBook) {
        return res.status(400).json({message: 'Book with this ID already exists'});
    }

    const newBook = {
        id,
        name,
        author,
        year,
        editions
    };

    books.push(newBook);
    res.status(201).json(newBook);
});

app.get('/books', (req, res) => {
    res.json(books);
});

app.get('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({message: 'Book not found'});
    }
    res.json(book);
});

app.put('/books/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).json({message: 'Book not found'});
    }
    const {name, author, year, editions} = req.body;
    book.name = name || book.name;
    book.author = author || book.author;
    book.year = year || book.year;
    book.editions = editions || book.editions;
    res.json(book);
});

app.delete('/books/:id', (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id));
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
