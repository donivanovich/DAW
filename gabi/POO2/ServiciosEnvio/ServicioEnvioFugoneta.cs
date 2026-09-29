using POO2.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.ServiciosEnvio
{
    public class ServicioEnvioFurgoneta : IServicioEnvio
    {
        private readonly string codigoVerificacion;

        public ServicioEnvioFurgoneta(string codigoVerificacion)
        {
            this.codigoVerificacion = codigoVerificacion;
            VerificarCodigo();
        }

        public void CancelarEnvio(Order order)
        {
            Task.Delay(2000).Wait();
            Console.WriteLine($"Cancelando envio por furgoneta: {order}");
        }

        public void DevolverEnvio(Order order)
        {
            Task.Delay(2000).Wait();
            Console.WriteLine($"Devolviendo envio por furgoneta: {order}");
        }

        public void Enviar(Order order)
        {
            Task.Delay(2000).Wait();
            Console.WriteLine($"Enviando por furgoneta: {order}");
        }

        public void LocalizarEnvio(Order order)
        {
            Task.Delay(2000).Wait();
            Console.WriteLine($"Localizando envio por furgoneta: {order}");
        }

        private bool VerificarCodigo()
        {
            // Simulacion de llamada a api / dependencia externa
            Task.Delay(2000).Wait();
            return true;
        }



    }
}
