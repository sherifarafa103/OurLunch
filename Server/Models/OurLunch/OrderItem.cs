using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace OurLunch.Models
{
    public class OrderItem
    {
        public int OrderItemId { get; set; }

        public int OrderId { get; set; }

        public int MealId { get; set; }

        public int UserId { get; set; }

        public float Price { get; set; }

        public virtual Order Order { get; set; }

        public virtual Meal Meal { get; set; }

        public virtual User User { get; set; }
    }
}
