using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
//using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace OurLunch.Models
{
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderId { get; set; }

        public int UserId { get; set; }

        public int RestaurantId { get; set; }

        public DateTime Time { get; set; }

        public virtual User User { get; set; }

        public virtual Restaurant Restaurant { get; set; }

        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
