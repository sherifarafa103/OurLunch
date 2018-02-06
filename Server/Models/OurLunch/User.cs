using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace OurLunch.Models
{
    public class User
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [JsonProperty(PropertyName = "userId")]
        public int UserId { get; set; }

        [JsonProperty(PropertyName = "firstName")]
        public string FirstName { get; set; }

        [JsonProperty(PropertyName = "alias")]
        public string Alias { get; set; }

        [JsonProperty(PropertyName = "lastName")]
        public string LastName { get; set; }

        [JsonIgnore]
        public virtual ICollection<Order> Orders { get; set; }

        [JsonIgnore]
        public virtual ICollection<OrderItem> OrderItems { get; set; }
    }
}
