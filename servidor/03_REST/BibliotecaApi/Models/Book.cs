using System.ComponentModel.DataAnnotations;

namespace DES02_REST.Models
{
    public class Book
    {
        public int Id { get; set; }

        [Required]
        [StringLength(150)]
        public string Title { get; set; } = string.Empty;

        [Range(1, 2100)]
        public int PublicationYear { get; set; }

        [Range(1, int.MaxValue)]
        public int AuthorId { get; set; }

        [Range(1, int.MaxValue)]
        public int CategoryId { get; set; }
    }
}
