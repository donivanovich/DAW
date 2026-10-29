using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace POO2.Animales
{
    public class Animal
    {
        public string Nombre {  get; set; }

        public Animal(string nombre)
        {
            Nombre = nombre;    
        }
        public virtual void HacerSonido()
        {
            Console.WriteLine("ANimal haciendo sonido");
        }
    }

    public class Perro : Animal
    {
        public string Propietario { get; set; }
        public string Personalidad { get; set;}

        public Perro(
            
            string propietario, 
            string personalidad, 
            string nombre

            ) : base(nombre)
        {
            Propietario = propietario;
            Personalidad = personalidad;
        }

        public override void HacerSonido()
        {
            Console.WriteLine("El perro ladra.");
        }
    }
}
