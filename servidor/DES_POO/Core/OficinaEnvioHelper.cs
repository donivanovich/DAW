using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.Core
{
    public static class OficinaEnvioHelper
    {
        public static string GenerarCodigoVerificacion()
        {
            Random random = new Random();
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 8)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }


        public static List<Order> CargarPedidos()
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
