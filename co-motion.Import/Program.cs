using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using co_motion.Import.Model;

namespace co_motion.Import
{
    class Program
    {
        public static bool Working;

        static void Main(string[] args)
        {
            Working = false;
            var timer = new Timer(Run, null, TimeSpan.Zero, TimeSpan.FromSeconds(30));
            Console.WriteLine("Loaded Application");
            Console.Read();
        }

        static void Run(object state)
        {
            if (Working)
            {
                return;
            }
            Working = true;

            try
            {
                Console.WriteLine("Running import");
                var importer = new MoveDataImporter();
                importer.Run();
                Console.WriteLine("Completed import");
            }
            catch (Exception ex)
            {
                Console.WriteLine("Error");
            }

            Working = false;
        }
    }
}
