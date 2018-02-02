using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OurLunch.Models
{
    public class Restaurant
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int RestaurantId { get; set; }

        public string Name { get; set; }

        public virtual ICollection<Order> Orders { get; set; }

        public virtual ICollection<Meal> Meals { get; set; }
    }
}
 

