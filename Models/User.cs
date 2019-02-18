using System;

namespace NewOnline.Models {
    public class User
        {
            public Guid id { get; set; }
            public string first_name { get; set; }
            public string last_name { get; set; }
            public string handle { get; set; }
            public DateTime create_date { get; set; }

        }
}
