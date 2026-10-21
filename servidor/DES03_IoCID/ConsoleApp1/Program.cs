using EjercicioDI;

class Program
{
    static void Main(string[] args)
    {
        IMedioEnvio email = new EmailService();
        Notificador notificadorEmail = new Notificador(email);

        notificadorEmail.Enviar("Hola, este es un correo.");

        IMedioEnvio sms = new SMSService();
        Notificador notificadorSMS = new Notificador(sms);

        notificadorSMS.Enviar("Hola, este es un SMS.");
    }
}