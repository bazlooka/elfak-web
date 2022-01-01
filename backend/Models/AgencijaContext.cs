using Microsoft.EntityFrameworkCore;

namespace Agencija.Models
{
    public class AgencijaContext : DbContext
    {
        //dotnet ef migrations add V1
        //dotnet ef database update
        public DbSet<Krstarenje> Krstarenja { get; set; } 
        public DbSet<Kruzer> Kruzeri { get; set; } 
        public DbSet<Luka> Luke { get; set; } 
        public DbSet<Aktivnost> Aktivnosti { get; set; } 
        public DbSet<ClanPosade> ClanoviPosade { get; set; } 
        public DbSet<Soba> Sobe { get; set; } 
        public DbSet<Putnik> Putnici { get; set; } 
        public DbSet<AngazovanSpoj> AngazovanSpojevi { get; set; } 
        public DbSet<KrstariSpoj> KrstariSpojevi { get; set; } 

        public AgencijaContext(DbContextOptions options) : base(options)
        {
            
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Krstarenje>()
                                .HasMany<Luka>(k => k.UsputneLuke)
                                .WithMany(l => l.UsputnaLukaZa);

            modelBuilder.Entity<Krstarenje>()
                                .HasOne<Luka>(k => k.PolaznaLuka)
                                .WithMany(l => l.PolaznaLukaZa);

            modelBuilder.Entity<Krstarenje>()
                                .HasOne<Luka>(k => k.OdredisnaLuka)
                                .WithMany(l => l.OdredisnaLukaZa);
        }
    }
}