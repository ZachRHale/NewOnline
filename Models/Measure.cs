using System;

namespace NewOnline.Models {
    public class Measure
        {
            public Guid id { get; set; }
            public Guid score { get; set; }
            public int top { get; set; }
            public int bottom { get; set; }
            public double tempo { get; set; }
            public string beats { get; set; }

        }
}
