using System;
using Microsoft.AspNetCore.Identity;

namespace NewOnline.Models {
    public class ApplicationUser : IdentityUser
        {
            public string first_name { get; set; }
            public string last_name { get; set; }
            public string handle { get; set; }

        }
}
