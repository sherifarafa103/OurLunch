using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OurLunch.Models;

namespace OurLunch.Data
{
    public class RestaurantRepository : BaseRepository<Restaurant>
    {
        public RestaurantRepository(OurLunchContext context) : base(context) { }

        public virtual List<Restaurant> GetRestaurants()
        {
            return Get().ToList();
        }


        public virtual Restaurant GetRestaurantById(int restaurantId)
        {
            return Get(r => r.RestaurantId == restaurantId).SingleOrDefault();
        }


        public virtual void AddRestaurant(Restaurant restaurant)
        {
            Insert(restaurant);
        }

        public void UpdateRestaurant(Restaurant updatedRestaurant)
        {
            Update(updatedRestaurant);
        }
       
        public virtual void DeleteRestaurant(Restaurant restaurant)
        {
            Delete(restaurant); 
        }


        /*
        public void UpdateRestaurant(Guid restaurantId, string name)
        {
            var record = GetByID(restaurantId);
            record.Name = name;
            Update(record);
        }
        */

        /*
        public virtual void DeleteRestaurant(Guid restaurant)
        {
            var record = GetByID(restaurant);
            Delete(record);
        }
        */
        
       
    }
}
