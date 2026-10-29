using System.ComponentModel.DataAnnotations;

namespace DES02_REST.Models
{
    public class Author
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;
    }
}
