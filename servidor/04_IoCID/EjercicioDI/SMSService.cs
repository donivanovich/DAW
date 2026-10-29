using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EjercicioDI
{
    public class SMSService : IMedioEnvio
    {
        public void Enviar(string mensaje)
        {
            Console.WriteLine("Enviando SMS: " + mensaje);
        }
    }
}
