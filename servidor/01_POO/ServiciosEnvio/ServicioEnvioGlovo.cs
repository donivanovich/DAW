using POO2.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.ServiciosEnvio
{
    public class ServicioEnvioGlovo :ServicioEnvio
    {

        public ServicioEnvioGlovo(string codigoVerificacion) : base(codigoVerificacion) { }

        public override void CancelarEnvio(Order order)
        {
            Console.WriteLine($"Cancelando envio por Glovo: {order}");
        }

        public override void DevolverEnvio(Order order)
        {
            Console.WriteLine($"Devolviendo envio por Glovo: {order}");
        }

        public override void Enviar(Order order)
        {
            Console.WriteLine($"Enviando por Glovo: {order}");
        }

        public override void LocalizarEnvio(Order order)
        {
            Console.WriteLine($"Localizando envio por Glovo: {order}");
        }
    }
}
