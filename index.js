const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const data = require("./data.json")

let books = [...data];

app.post('/books',(req,res)=>{
  try {
    const {book_id,title,author,genre,year,copies} = req.body;
    if(!book_id || !title || !author || !genre || !year || !copies) {
       res.status(400).send({msg:"All fields are required"})
    }
    const newBook = {book_id,title,author,genre,year,copies};
    books.push(newBook);
    return res.status(200).send({msg:"Success",newBook});
    
  } catch (error) {
    return res.status(500).send({msg:"Something went wrong",error});
    
  }
});

app.get('/books',(req,res)=>{
  res.status(200).send(books)
})

app.get('/books/:id',(req,res)=>{
  const book = books.find(b=>b.book_id===req.params.id);

  if(!book){
    return res.status(404).send({msg:"Success",book:"Book not found with this id"});
  }

  res.status(200).send(book);
})

app.put('/books/:id',(req,res)=>{
  const book = books.find(b=>b.book_id===req.params.id);

  if(!book){
    return res.status(404).send({msg:"Success",book:"Book not found with this id"});
  }

  const {title,copies} = req.body;

  if(title) book.title = title;
  if(copies) book.copies = copies;

  res.status(200).send(book);
});

app.delete('/books/:id',(req,res)=>{
  const index = books.findIndex(b=>b.book_id===req.params.id);

  if(index===-1){
    return res.status(404).send({msg:"Book not found"});
  }

  books.splice(index,1);
  res.status(200).send({msg:"Book deleted successfully"})
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});