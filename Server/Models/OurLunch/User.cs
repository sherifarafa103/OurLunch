using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OurLunch.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string Alias { get; set; }

        public string LastName { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
