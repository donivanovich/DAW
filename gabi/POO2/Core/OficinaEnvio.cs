using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.Core
{
    public class OficinaEnvio
    {
        private List<Order> orders;

        private readonly string codigoVerificacion;

        private readonly IServicioEnvio servicioEnvio;

        public OficinaEnvio(IServicioEnvio servicioEnvio,  string codigoVerificacion)
        {
            this.codigoVerificacion = codigoVerificacion;
            orders = CargarPedido();

            this.servicioEnvio = servicioEnvio;

        }

        public void EnviarPedido(int idPedido)
        {
            Order? pedido = orders.FirstOrDefault(p => p.Id == idPedido);
            
            if (pedido != null)
            {
                // Lo enviamos
                servicioEnvio.Enviar(pedido);
            }
            else
            {
                Console.WriteLine($"No se encontró un pedido con ID {idPedido}.");
            }
        }

        public static string GenerarCodigoVerificacion()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 8)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }


        private static List<Order> CargarPedido()
        {
            return
            [
                new(1, [], DateTime.Now, DateTime.Now.AddDays(7)),
                new(2, [], DateTime.Now, DateTime.Now.AddDays(7)),
                new(3, [], DateTime.Now, DateTime.Now.AddDays(7)),
                new(4, [], DateTime.Now, DateTime.Now.AddDays(7)),
                new(5, [], DateTime.Now, DateTime.Now.AddDays(7))
            ];
        }
    }
}
