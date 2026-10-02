using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.Core
{
    public class Order
    {
        public int Id { get; set; }
        List<Product> Products { get; set; }

        public DateTime creationDate { get; set; }

        public DateTime stipulatedDate { get; set; }

        public decimal ShippingCost { get; set; }

        public decimal TotalCost => Products.Sum(p => p.Price) + ShippingCost;

        public Order(int id, List<Product> products, DateTime creationDate, DateTime stipulatedDate)
        {
            Id = id;
            Products = products;
            this.creationDate = creationDate;
            this.stipulatedDate = stipulatedDate;
            CargarProductos();
        }
        public override string ToString()
        {
            return $"Order ID: {Id}, Creation Date: {creationDate}, Stipulated Date: {stipulatedDate}, Shipping Cost: {ShippingCost:C}, Total Cost: {TotalCost:C}";
        }

        // Cargar 5 Prodctos temporales a la lista de productos
        private void CargarProductos()
        {
            Products = new List<Product>
            {
                new Product(1, "Product 1", 10.0m, "Description 1"),
                new Product(2, "Product 2", 20.0m, "Description 2"),
                new Product(3, "Product 3", 30.0m, "Description 3"),
                new Product(4, "Product 4", 40.0m, "Description 4"),
                new Product(5, "Product 5", 50.0m, "Description 5")
            };
        }

    }
}
