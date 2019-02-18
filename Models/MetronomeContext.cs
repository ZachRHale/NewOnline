using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System;
using NewOnline.Models.ModelConfigurations;


namespace NewOnline.Models
{
    public class MetronomeContext : DbContext
    {
        public DbSet<Score> Score { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Composer> Composer { get; set; }

        public DbSet<Measure> Measure { get; set; }

        public MetronomeContext() {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("Host=localhost;Database=OnlineMetronome;Username=postgres;Password=08071998");
        }          

        protected override void OnModelCreating(ModelBuilder builder) {
            builder.ApplyConfiguration(new ComposerConfig());
            builder.ApplyConfiguration(new UserConfig());
        } 
        
    }


}
