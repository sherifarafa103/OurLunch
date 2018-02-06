using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace OurLunch.Models
{
    [Table("OrderItem")]
    public class OrderItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "orderItemId")]
        public int OrderItemId { get; set; }

        [JsonProperty(PropertyName = "orderId")]
        public int OrderId { get; set; }

        [JsonProperty(PropertyName = "mealId")]
        public int MealId { get; set; }

        [JsonProperty(PropertyName = "userId")]
        public int UserId { get; set; }

        [JsonProperty(PropertyName = "price")]
        public float Price { get; set; }

        [JsonProperty(PropertyName = "quantity")]
        public float Quantity { get; set; }

        [JsonProperty(PropertyName = "notes")]
        public string Notes { get; set; }

        [JsonIgnore]
        public virtual Order Order { get; set; }

        [JsonIgnore]
        public virtual Meal Meal { get; set; }

        [JsonIgnore]
        public virtual User User { get; set; }
    }
}
