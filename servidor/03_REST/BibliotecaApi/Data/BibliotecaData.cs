using DES02_REST.Models;

namespace DES02_REST.Data
{
    public static class BibliotecaData
    {
        public static List<Author> Authors { get; } = new()
        {
            new Author
            {
                Id = 1,
                Name = "Antoine de Saint-Exupéry"
            },
            new Author
            {
                Id = 2,
                Name = "Miguel de Cervantes"
            }
        };

        public static List<Category> Categories { get; } = new()
        {
            new Category
            {
                Id = 1,
                Name = "Novela"
            },
            new Category
            {
                Id = 2,
                Name = "Ficción"
            }
        };

        public static List<Book> Books { get; } = new()
        {
            new Book
            {
                Id = 1,
                Title = "El principito",
                PublicationYear = 1943,
                AuthorId = 1,
                CategoryId = 2
            },
            new Book
            {
                Id = 2,
                Title = "Don Quijote de la Mancha",
                PublicationYear = 1605,
                AuthorId = 2,
                CategoryId = 1
            }
        };

        public static int NextBookId = 3;
        public static int NextAuthorId = 3;
    }
}
