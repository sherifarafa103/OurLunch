using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;

namespace TodoApi.Controllers
{
    [Route("api/restaurants")]
    public class RestaurantController : Controller
    {
        [HttpGet]
        public IEnumerable<Restaurant> GetRestaurants() //retrieve from database
        {
            using (var db = new OurLunchDatabase())
            {
                return db.RestaurantRepository.GetRestaurants();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetRestaurantById(int id)  //retrieve from database for a certain index
        {
            Restaurant restaurant;

            using (var db = new OurLunchDatabase())
            {
                restaurant = db.RestaurantRepository.GetRestaurantById(id);
            }

            if (restaurant == null)
            {
                return NotFound();
            }

            return new ObjectResult(restaurant);
        }


        [HttpPost]
        public IActionResult AddRestaurant([FromBody] Restaurant restaurant) //Insert to database
        {
            using (var db = new OurLunchDatabase())
            {
                db.RestaurantRepository.AddRestaurant(restaurant);
                db.Save();
            }

            return new ObjectResult(restaurant.RestaurantId);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateRestaurant(int id, [FromBody] Restaurant restaurant)
        {
            using (var db = new OurLunchDatabase())
            {
                db.RestaurantRepository.UpdateRestaurant(restaurant);
                db.Save();
            }

            return new NoContentResult();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteRestaurant(int id)
        {
            using (var db = new OurLunchDatabase())
            {
                var restaurant = db.RestaurantRepository.GetRestaurantById(id);

                if (restaurant == null)
                {
                    return NotFound();
                }

                db.RestaurantRepository.DeleteRestaurant(restaurant);
                db.Save();
            }

            return new NoContentResult();
        }

        [HttpGet("{id}/meals")]
        public IEnumerable<Meal> GetMealsForRestaurant(int id) //retrieve from database
        {
            using (var db = new OurLunchDatabase())
            {
                return db.MealRepository.GetMealsByRestaurantId(id);
            }
        }

    }
}