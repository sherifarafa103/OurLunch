using Microsoft.EntityFrameworkCore;
using OurLunch.Models;

namespace OurLunch.Data
{
    public class OurLunchContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Order> Order { get; set; }
        public DbSet<Restaurant> Restaurant { get; set; }
        public DbSet<Meal> Meal { get; set; }

        public OurLunchContext()
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseInMemoryDatabase("OurLunch");
            // optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=OurLunch;Trusted_Connection=True;");
        }

    }
}
