using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace OurLunch.Models
{
    [Table("Order")]
    public class Order
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "orderId")]
        public int OrderId { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public int UserId { get; set; }

        [JsonProperty(PropertyName = "restaurantId")]
        public int RestaurantId { get; set; }

        [JsonProperty(PropertyName = "time")]
        public DateTime Time { get; set; }

        [JsonProperty(PropertyName = "tax")]
        public float Tax { get; set; }

        [JsonProperty(PropertyName = "delivery")]
        public float Delivery { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }

        [JsonIgnore]
        public virtual Restaurant Restaurant { get; set; }

        [JsonIgnore]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
