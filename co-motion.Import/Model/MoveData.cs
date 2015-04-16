
using System;
using System.Collections.Generic;

namespace co_motion.Import.Model
{
    public class MoveDataItem
    {
        public string date { get; set; }

        public List<SummaryActivity> summary { get; set; }
    }

    public class SummaryActivity
    {
        public string activity { get; set; }

        public string steps { get; set; }

        public string distance { get; set; }
    }
}
