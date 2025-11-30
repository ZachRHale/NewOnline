using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Metronome.Server
{
    public class MetronomeContext : DbContext
    {
        public DbSet<Score> Scores { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Composer> Composers { get; set; }
        public DbSet<Measure> Measures { get; set; }

        public MetronomeContext(DbContextOptions<MetronomeContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasKey(s => s.ID);
            modelBuilder.Entity<User>()
                .HasMany(s => s.Scores)
                .WithOne(u => u.User!)
                .HasForeignKey(s => s.UserID);

            modelBuilder.Entity<Composer>()
                .HasKey(c => c.ID);
            modelBuilder.Entity<Composer>()
                .HasMany(s => s.Scores)
                .WithOne(u => u.Composer!)
                .HasForeignKey(s => s.ComposerID);

            modelBuilder.Entity<Score>()
                .HasKey(c => c.ID);
            modelBuilder.Entity<Score>()
                .HasMany(s => s.Measures)
                .WithOne(u => u.Score!)
                .HasForeignKey(s => s.ScoreID);

            modelBuilder.Entity<Measure>()
                .HasKey(c => c.ID);
        }
    }


    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        [JsonIgnore]
        public ICollection<Score> Scores { get; set; } = new List<Score>();
    }

    public class Composer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        [JsonIgnore]
        public ICollection<Score> Scores { get; set; } = new List<Score>();
    }

    public class Score
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        public required string Title { get; set; }
        public required int ComposerID { get; set; }
        [ForeignKey("ComposerID")]
        public Composer? Composer { get; set; }
        public int UserID { get; set; }
        [ForeignKey("UserID")]
        public User? User { get; set; }
        [JsonIgnore]
        public ICollection<Measure> Measures { get; set; } = new List<Measure>();
    }

    public class Measure
    {
        public int ID { get; set; }
        public int Top { get; set; }
        public int Bottom { get; set; }
        public double Tempo { get; set; }
        public string Beats { get; set; }
        public int Number { get; set; }
        public required int ScoreID { get; set; }
        [ForeignKey("ScoreID")] 
        public Score? Score { get; set; }
    }

}