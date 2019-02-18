using System;

namespace NewOnline.Models {
    public class Composer {
        public Guid id { get; set; }
        public string first_name { get; set; }
        public string last_name { get; set; }
        public DateTime birth_date { get; set; }
    }
}