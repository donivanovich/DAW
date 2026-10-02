using POO2.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.ServiciosEnvio
{
    public class ServicioEnvioAvion : IServicioEnvio
    {
        private readonly string codigoVerificacion;

        public ServicioEnvioAvion(string codigoVerificacion)
        {
            this.codigoVerificacion = codigoVerificacion;
            VerificarCodigo();
        }
        public void CancelarEnvio(Order order)
        {
            Console.WriteLine($"Cancelando envio por Avion: {order}");
        }

        public void DevolverEnvio(Order order)
        {
            Console.WriteLine($"Devolviendo envio por Avion: {order}");
        }

        public void Enviar(Order order)
        {
            Console.WriteLine($"Enviando por Avion: {order}");
        }

        public void LocalizarEnvio(Order order)
        {
            Console.WriteLine($"Localizando envio por Avion: {order}");
        }

        private bool VerificarCodigo()
        {
            // Simulacion de llamada a api / dependencia externa
            Task.Delay(2000).Wait();
            return true;
        }
    }
}
