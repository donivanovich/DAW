using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.Core
{
    public class OficinaEnvio
    {
        private List<Order> orders;

        private readonly string codigoVerificacion;

        private readonly IServicioEnvio servicioEnvio;

        public OficinaEnvio(IServicioEnvio servicioEnvio,  string codigoVerificacion)
        {
            this.codigoVerificacion = codigoVerificacion;
            orders = OficinaEnvioHelper.CargarPedidos();

            this.servicioEnvio = servicioEnvio;

        }

        public void EnviarPedido(int idPedido)
        {
            Order? pedido = orders.FirstOrDefault(p => p.Id == idPedido);
            
            if (pedido != null)
            {
                // Lo enviamos
                servicioEnvio.Enviar(pedido);
            }
            else
            {
                Console.WriteLine($"No se encontró un pedido con ID {idPedido}.");
            }
        }
    }
}
