using Microsoft.EntityFrameworkCore;
using OurLunch.Models.OurLunch;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            optionsBuilder.UseSqlServer(@"Server=(localdb)\mssqllocaldb;Database=OurLunch;Trusted_Connection=True;");
        }

    }
}
