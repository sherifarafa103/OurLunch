using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;
using OurLunch.Interfaces;
using OurLunch.WebSockets;

namespace TodoApi.Controllers
{
    [Route("api/restaurants")]
    public class RestaurantController : Controller
    {
        private IWebSocketHandler _socketHandler;

        public RestaurantController(IWebSocketHandler socketHandler)
        {
            _socketHandler = socketHandler;
        }

        [HttpGet]
        public IEnumerable<Restaurant> GetRestaurants()
        {
            using (var db = new OurLunchDatabase())
            {
                return db.RestaurantRepository.GetRestaurants();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetRestaurantById(int id)
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

        [HttpGet("{id}/meals")]
        public IEnumerable<Meal> GetMealsForRestaurant(int id)
        {
            using (var db = new OurLunchDatabase())
            {
                return db.MealRepository.GetMealsByRestaurantId(id);
            }
        }

        [HttpPost]
        public IActionResult AddRestaurant([FromBody] Restaurant restaurant)
        {
            using (var db = new OurLunchDatabase())
            {
                db.RestaurantRepository.AddRestaurant(restaurant);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "restaurants", Method = "post", Data = restaurant });
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
                _socketHandler.SendToAll(new Notification { Path = "restaurants", Method = "put", Data = restaurant });
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
                _socketHandler.SendToAll(new Notification { Path = "restaurants", Method = "delete", Data = restaurant });
            }

            return new NoContentResult();
        }
    }
}