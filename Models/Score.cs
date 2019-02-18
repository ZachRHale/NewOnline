using System;

namespace NewOnline.Models {
    public class Score
        {
            public Guid id { get; set; }
            public string title { get; set; }
            public Guid composer { get; set; }
            public Guid creator { get; set; }
            public DateTime create_date { get; set; }

            public Score() {}

        }
}
