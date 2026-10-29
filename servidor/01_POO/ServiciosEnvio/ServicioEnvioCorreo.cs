using POO2.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.ServiciosEnvio
{
    public class ServicioEnvioCorreo : ServicioEnvio
    {
        public ServicioEnvioCorreo(string codigoVerificacion) : base(codigoVerificacion){}

        public override void CancelarEnvio(Order order)
        {
            Task.Delay(2000).Wait();
            Console.WriteLine($"Cancelando envio por correo: {order}");
        }

        public override void DevolverEnvio(Order order)
        {
            Task.Delay(2000).Wait();
            Console.WriteLine($"Devolviendo envio por correo: {order}");
        }

        public override void Enviar(Order order)
        {
            Task.Delay(2000).Wait();
            Console.WriteLine($"Enviando por correo: {order}");
        }

        public override void LocalizarEnvio(Order order)
        {
            Task.Delay(2000).Wait();
            Console.WriteLine($"Localizando envio por correo: {order}");
        }
    }
}
