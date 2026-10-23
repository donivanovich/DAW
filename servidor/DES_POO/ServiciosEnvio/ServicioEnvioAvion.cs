using POO2.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.ServiciosEnvio
{
    public class ServicioEnvioAvion : ServicioEnvio
    {

        public ServicioEnvioAvion(string codigoVerificacion) : base(codigoVerificacion) {}
        
        public override void CancelarEnvio(Order order)
        {
            Console.WriteLine($"Cancelando envio por Avion: {order}");
        }

        public override void DevolverEnvio(Order order)
        {
            Console.WriteLine($"Devolviendo envio por Avion: {order}");
        }

        public override void Enviar(Order order)
        {
            Console.WriteLine($"Enviando por Avion: {order}");
        }

        public override void LocalizarEnvio(Order order)
        {
            Console.WriteLine($"Localizando envio por Avion: {order}");
        }
    }
}
