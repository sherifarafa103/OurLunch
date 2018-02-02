using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace OurLunch.Models
{
    [Table("Meal")]
    public class Meal
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int MealId { get; set; }

        public int RestaurantId { get; set; }

        public string Name { get; set; }

        public virtual Restaurant Restaurant { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
