using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;

namespace TodoApi.Controllers
{
    [Route("api/Restaurants")]
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
            }

            return CreatedAtRoute("AddRestaurant", new { id = restaurant.RestaurantId }, restaurant);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateRestaurant(int id, [FromBody] Restaurant restaurant)
        {
            using (var db = new OurLunchDatabase())
            {
                db.RestaurantRepository.UpdateRestaurant(restaurant);
            }

            return new NoContentResult();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteRestaurant(int id, [FromBody] Restaurant restaurant)
        {
            using (var db = new OurLunchDatabase())
            {
                db.RestaurantRepository.Delete(restaurant);
            }

            return new NoContentResult();
        }

    }
}