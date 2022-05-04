var express = require('express');
var router = express.Router();

let booksArray = [
    { title: "Sagan om ringen", written: "1919", pages: "5000", author: "JRR Tolkien", available: true },
    { title: "Sagan om dig", written: "2022", pages: "1000", author: "Du McDuson", available: true },
    { title: "Sagan om mig", written: "2002", pages: "2000", author: "Jag Jackson", available: false }
]


router.get("/", function (req, res) {

    let outputBooksListHTML = "<ul>"

    for (let i = 0; i < booksArray.length; i++) {
        const book = booksArray[i];
        if (book.available === true) {
            outputBooksListHTML += "<li>" + book.title + " : tillgänglig</li> <a href='biblioteket/details/" + i + "'>mer info</a>"
        } else {
            outputBooksListHTML += "<li>" + book.title + " : utlånad</li> <a href='biblioteket/details/" + i + "'>mer info</a>"
        }
    }

    outputBooksListHTML += "</ul>"

    let mainHtml = "<div><a href='biblioteket/addnewbook/'>Lägg till en ny bok</a>" + outputBooksListHTML + "</div>"

    res.send(mainHtml)
})

router.get("/details/:id", function (req, res) {
    let outputDetailsHtml = "<a href='/biblioteket'>tillbaka</a> <div> Titel: " + booksArray[req.params.id].title + "</div> <div> År: " + booksArray[req.params.id].written + "</div> <div> Antal sidor: " + booksArray[req.params.id].pages + "</div> <div> Författare: " + booksArray[req.params.id].author + "</div>"

    if (booksArray[req.params.id].available) {
        outputDetailsHtml += "<div> Status: tillgänglig</div><a href='/biblioteket/update" + req.params.id + "'>låna mig</a>"
    } else {
        outputDetailsHtml += "<div> Status: utlånad tyvärr</div>"
    }

    res.send(outputDetailsHtml)
})

router.get("/addnewbook", function (req, res) {
    let formHtml = "<a href='/biblioteket'>tillbaka</a> <form action='/biblioteket' method='post'> <input type='text' name='title' placeholder='titel'> <input type='text' name='written' placeholder='år'> <input type='text' name='pages' placeholder='antal sidor'><input type='text' name='author' placeholder='författare'><button>spara ny bok</button></form>"
    res.send(formHtml)
})

router.post("/", function (req, res) {
    let newBookToAdd = { title: req.body.title, written: req.body.written, pages: req.body.pages, author: req.body.author, available: true }
    booksArray.push(newBookToAdd)

    res.redirect("/biblioteket")
})

router.get("/update:id", function(req, res){
    booksArray[req.params.id].available = false;
    
    res.redirect("/biblioteket")
})


module.exports = router;