using POO2.Core;
using POO2.ServiciosEnvio;

string codigoVerificacion = OficinaEnvio.GenerarCodigoVerificacion();

ServicioEnvioCorreo servicioEnvioCorreo = new(codigoVerificacion);

ServicioEnvioAvion servicioAvion = new(codigoVerificacion);

OficinaEnvio oficinaEnvio = new(servicioAvion, codigoVerificacion);


