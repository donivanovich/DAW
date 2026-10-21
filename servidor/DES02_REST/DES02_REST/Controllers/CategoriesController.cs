using DES02_REST.Data;
using DES02_REST.Models;
using Microsoft.AspNetCore.Mvc;

namespace DES02_REST.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoriesController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<Category>> GetAll()
        {
            return Ok(BibliotecaData.Categories);
        }

        [HttpGet("{id:int}")]
        public ActionResult<Category> GetById(int id)
        {
            var category = BibliotecaData.Categories
                .FirstOrDefault(c => c.Id == id);

            if (category == null)
                return NotFound();

            return Ok(category);
        }
    }
}
