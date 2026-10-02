using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.Core
{
    public interface IServicioEnvio
    {
        public void Enviar(Order order);
        public void CancelarEnvio(Order order);
        public void LocalizarEnvio(Order order);
        public void DevolverEnvio(Order order);
    }
}
