using POO2.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.ServiciosEnvio
{
	public class ServicioEnvioPaloma : IServicioEnvio
	{
		private readonly string codigoVerificacion;

		public ServicioEnvioPaloma(string codigoVerificacion)
		{
			this.codigoVerificacion = codigoVerificacion;
			VerificarCodigo();
		}

		public void CancelarEnvio(Order order)
		{
			Task.Delay(2000).Wait();
			Console.WriteLine($"Cancelando envio por paloma: {order}");
		}

		public void DevolverEnvio(Order order)
		{
			Task.Delay(2000).Wait();
			Console.WriteLine($"Devolviendo envio por paloma: {order}");
		}

		public void Enviar(Order order)
		{
			Task.Delay(2000).Wait();
			Console.WriteLine($"Enviando por paloma: {order}");
		}

		public void LocalizarEnvio(Order order)
		{
			Task.Delay(2000).Wait();
			Console.WriteLine($"Localizando envio por paloma: {order}");
		}

		private bool VerificarCodigo()
		{
			// Simulacion de llamada a api / dependencia externa
			Task.Delay(2000).Wait();
			return true;
		}



	}
}
