using DES02_REST.Data;
using DES02_REST.Models;
using Microsoft.AspNetCore.Mvc;

namespace DES02_REST.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthorsController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Author>> GetAll()
        {
            return Ok(BibliotecaData.Authors);
        }

        [HttpGet("{id:int}")]
        public ActionResult<Author> GetById(int id)
        {
            var author = BibliotecaData.Authors
                .FirstOrDefault(a => a.Id == id);

            if (author == null)
                return NotFound();

            return Ok(author);
        }

        [HttpPost]
        public ActionResult<Author> Create(Author author)
        {
            author.Id = BibliotecaData.NextAuthorId++;

            BibliotecaData.Authors.Add(author);

            return CreatedAtAction(
                nameof(GetById),
                new { id = author.Id },
                author);
        }

        [HttpPut("{id:int}")]
        public IActionResult Update(int id, Author updatedAuthor)
        {
            var author = BibliotecaData.Authors
                .FirstOrDefault(a => a.Id == id);

            if (author == null)
                return NotFound();

            author.Name = updatedAuthor.Name;

            return NoContent();
        }

        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var author = BibliotecaData.Authors
                .FirstOrDefault(a => a.Id == id);

            if (author == null)
                return NotFound();

            bool hasBooks = BibliotecaData.Books
                .Any(b => b.AuthorId == id);

            if (hasBooks)
            {
                return Conflict(
                    "No se puede eliminar un autor que tiene libros.");
            }

            BibliotecaData.Authors.Remove(author);

            return NoContent();
        }
    }
}
