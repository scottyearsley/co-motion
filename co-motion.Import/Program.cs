using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using co_motion.Import.Model;

namespace co_motion.Import
{
    class Program
    {
        static void Main(string[] args)
        {
            var importer = new MoveDataImporter();
            importer.Run();
        }
    }
}
