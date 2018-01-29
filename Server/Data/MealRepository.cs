using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OurLunch.Models;

namespace OurLunch.Data
{
    public class MealRepository : BaseRepository<Meal>
    {
        public MealRepository(OurLunchContext context): base(context) {}

        public virtual Meal GetMealById(int mealId)
        {
            return Get(m => m.MealId == mealId).SingleOrDefault();
        }

        public virtual List<Meal> GetMealsByRestaurantId(int restaurantId)
        {
            return Get(m => m.RestaurantId == restaurantId).ToList();
        }

        public virtual void AddMeal(Meal Meal)
        {
            Insert(Meal);
        }

        public void UpdateMeal(Meal updatedMeal)
        {
            Update(updatedMeal);
        }

        public virtual void DeleteMeal(Meal meal)
        {
            Delete(meal);
        }

        /*
        public void UpdateMeal(Guid mealId, string restaurantId, string name)
        {
            var record = GetByID(mealId);
            record.RestaurantId = restaurantId;
            record.Name = name;
            Update(record);
        }
        */
        /*
        public virtual void DeleteOrder(Guid mealId)
        {
            var record = GetByID(mealId);
            Delete(record);
        }
        */

    }
}
