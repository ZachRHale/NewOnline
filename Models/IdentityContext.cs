using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NewOnline.Models;
public class IdentityContext : IdentityDbContext<ApplicationUser>
{

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
        optionsBuilder.UseNpgsql("Host=localhost;Database=OnlineMetronome;Username=postgres;Password=08071998");
    }

    protected override void OnModelCreating(ModelBuilder builder) {
        base.OnModelCreating(builder);
    }



}