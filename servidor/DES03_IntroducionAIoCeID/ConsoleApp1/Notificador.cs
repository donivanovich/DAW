using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EjercicioDI
{
    public class Notificador
    {
        private readonly IMedioEnvio _medioEnvio;

        public Notificador(IMedioEnvio medioEnvio)
        {
            _medioEnvio = medioEnvio;
        }

        public void Enviar(string mensaje)
        {
            _medioEnvio.Enviar(mensaje);
        }
    }
}
