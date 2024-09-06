import { useState } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([ { title: "Books 1", author: "Person 1", releaseYear: 2024, genre: "Fantasy" },]);
  const [book, setBook] = useState({ title: "", author: "", releaseYear: "", genre:"" });
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState({});

  // List of genres
  const genres = ["Fiction", "Science", "History", "Fantasy"];

  // Handle input change
  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  // Add book
  const addBook = (e) => {
    e.preventDefault();
    setBooks([...books, { id: Date.now(), ...book }]);
    setBook({ title: "", author: "", releaseYear: "",  genre: "" });
    alert("Book added successfully!");
  };

  // Edit book
  const editBook = (book) => {
    setIsEditing(true);
    setCurrentBook(book);
  };

  // Update book
  const updateBook = (e) => {
    e.preventDefault();
    setBooks(
      books.map((item) =>
        item.id === currentBook.id ? { ...currentBook } : item
      )
    );
    setIsEditing(false);
    setCurrentBook({});
    alert("Book updated successfully!");
  };

  // Delete book
  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
    alert("Book deleted successfully!");
  };

  // Clear form
  const clearForm = () => {
    setBook({ title: "", author: "", releaseYear: "", genre: "" });
    setIsEditing(false);
    setCurrentBook({});
  };

  return (
    <>
      <div className="App">
      <h1>{isEditing ? "Update Books" : "Books"}</h1>

      {/* Book Form */}
      <form onSubmit={isEditing ? updateBook : addBook}>
        <label htmlFor="">Title</label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={isEditing ? currentBook.title : book.title}
          onChange={(e) =>
            isEditing
              ? setCurrentBook({ ...currentBook, title: e.target.value })
              : handleChange(e)
          }
          required
        />
        <label htmlFor="">Author</label>
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={isEditing ? currentBook.author : book.author}
          onChange={(e) =>
            isEditing
              ? setCurrentBook({ ...currentBook, author: e.target.value })
              : handleChange(e)
          }
          required
        />
        <label htmlFor="">Release Year</label>
        <input
          type="number"
          name="releaseYear"
          placeholder="Release Year"
          value={isEditing ? currentBook.releaseYear : book.releaseYear}
          onChange={(e) =>
            isEditing
              ? setCurrentBook({ ...currentBook, releaseYear: e.target.value })
              : handleChange(e)
          }
          required
        />
        <label htmlFor="">Genre</label>
        <select
          name="genre"
          value={isEditing ? currentBook.genre : book.genre}
          onChange={(e) =>
            isEditing
              ? setCurrentBook({ ...currentBook, genre: e.target.value })
              : handleChange(e)
          }
          required
        >
          <option value="" disabled>
            Select Genre
          </option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <button className="btn-submit" type="submit">{isEditing ? "Update Book" : "Add Book"}</button>
        <button className="btn-reset" type="button" onClick={clearForm}>Reset</button>
      </form>

      {/* Book List in Table */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Release Year</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.releaseYear}</td>
                <td>{book.genre}</td>
                <td>
                  <button className='btn-edit' onClick={() => editBook(book)}>Edit</button>
                  <button className='btn-delete' onClick={() => deleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No books available</td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </>
  )
}

export default App
