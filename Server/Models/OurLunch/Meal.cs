using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace OurLunch.Models
{
    [Table("Meal")]
    public class Meal
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "mealId")]
        public int MealId { get; set; }

        [JsonProperty(PropertyName = "restaurantId")]
        public int RestaurantId { get; set; }

        [JsonProperty(PropertyName = "name")]
        public string Name { get; set; }

        [JsonIgnore]
        public virtual Restaurant Restaurant { get; set; }

        [JsonIgnore]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
