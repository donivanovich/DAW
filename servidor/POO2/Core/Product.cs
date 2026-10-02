using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.Core
{
    public class Product
    {
        // Properties
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }

        // Constructor
        public Product(int id, string name, decimal price, string description)
        {
            Id = id;
            Name = name;
            Price = price;
            Description = description;
        }

        // Method to display product information

        public string GetProductInfo()
        {
            return $"ID: {Id}, Name: {Name}, Price: {Price:C}, Description: {Description}";
        }

    }
}
