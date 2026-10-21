using DES02_REST.Data;
using DES02_REST.Models;
using Microsoft.AspNetCore.Mvc;

namespace DES02_REST.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetAll(
            [FromQuery] string? title,
            [FromQuery] int? authorId,
            [FromQuery] int? categoryId)
        {
            var books = BibliotecaData.Books.AsEnumerable();

            if (!string.IsNullOrWhiteSpace(title))
            {
                books = books.Where(b =>
                    b.Title.Contains(
                        title,
                        StringComparison.OrdinalIgnoreCase));
            }

            if (authorId.HasValue)
            {
                books = books.Where(b =>
                    b.AuthorId == authorId.Value);
            }

            if (categoryId.HasValue)
            {
                books = books.Where(b =>
                    b.CategoryId == categoryId.Value);
            }

            return Ok(books.ToList());
        }

        [HttpGet("{id:int}")]
        public ActionResult<Book> GetById(int id)
        {
            var book = BibliotecaData.Books
                .FirstOrDefault(b => b.Id == id);

            if (book == null)
                return NotFound();

            return Ok(book);
        }

        [HttpPost]
        public ActionResult<Book> Create(Book book)
        {
            bool authorExists = BibliotecaData.Authors
                .Any(a => a.Id == book.AuthorId);

            bool categoryExists = BibliotecaData.Categories
                .Any(c => c.Id == book.CategoryId);

            if (!authorExists || !categoryExists)
            {
                return BadRequest(
                    "El autor o la categoría no existen.");
            }

            book.Id = BibliotecaData.NextBookId++;

            BibliotecaData.Books.Add(book);

            return CreatedAtAction(
                nameof(GetById),
                new { id = book.Id },
                book);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, Book updatedBook)
        {
            var book = BibliotecaData.Books
                .FirstOrDefault(b => b.Id == id);

            if (book == null)
                return NotFound();

            bool authorExists = BibliotecaData.Authors
                .Any(a => a.Id == updatedBook.AuthorId);

            bool categoryExists = BibliotecaData.Categories
                .Any(c => c.Id == updatedBook.CategoryId);

            if (!authorExists || !categoryExists)
            {
                return BadRequest(
                    "El autor o la categoría no existen.");
            }

            book.Title = updatedBook.Title;
            book.PublicationYear = updatedBook.PublicationYear;
            book.AuthorId = updatedBook.AuthorId;
            book.CategoryId = updatedBook.CategoryId;

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var book = BibliotecaData.Books
                .FirstOrDefault(b => b.Id == id);

            if (book == null)
                return NotFound();

            BibliotecaData.Books.Remove(book);

            return NoContent();
        }
    }
}
