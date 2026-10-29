using POO2.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.ServiciosEnvio
{
    public abstract class ServicioEnvio : IServicioEnvio
    {
        protected readonly string codigoVerificacion;

        protected ServicioEnvio(string codigoVerificacion)
        {
            this.codigoVerificacion = codigoVerificacion;
            VerificarCodigo();
        }

        public abstract void CancelarEnvio(Order order);
        public abstract void DevolverEnvio(Order order);
        public abstract void Enviar(Order order);
        public abstract void LocalizarEnvio(Order order);

        private bool VerificarCodigo()
        {
            // Simulacion de llamada a api / dependencia externa
            Console.WriteLine($"Verificando codigo {this.codigoVerificacion}");
            Task.Delay(2000).Wait();
            return true;
        }
    }
}
