using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;
using OurLunch.Interfaces;
using OurLunch.WebSockets;

namespace TodoApi.Controllers
{
    [Route("api/meals")]
    public class MealController : Controller
    {
        private IWebSocketHandler _socketHandler;

        public MealController(IWebSocketHandler socketHandler)
        {
            _socketHandler = socketHandler;
        }

        [HttpGet("{id}")]
        public IActionResult GetMealById(int id)
        {
            Meal meal;

            using (var db = new OurLunchDatabase())
            {
                meal = db.MealRepository.GetMealById(id);
            }

            if (meal == null)
            {
                return NotFound();
            }

            return new ObjectResult(meal);
        }

        [HttpPost]
        public IActionResult AddMeal([FromBody] Meal meal)
        {
            using (var db = new OurLunchDatabase())
            {
                db.MealRepository.AddMeal(meal);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "meals", Method = "post", Data = meal });
            }

            return new ObjectResult(meal.MealId);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateMeal(int id, [FromBody] Meal meal)
        {
            using (var db = new OurLunchDatabase())
            {
                db.MealRepository.UpdateMeal(meal);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "meals", Method = "put", Data = meal });
            }

            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteMeal(int id)
        {
            using (var db = new OurLunchDatabase())
            {
                var meal = db.MealRepository.GetMealById(id);
                var restaurantId = meal.RestaurantId;

                if (meal == null)
                {
                    return NotFound();
                }

                db.MealRepository.DeleteMeal(meal);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "meals", Method = "delete", Data = meal });
            }

            return new NoContentResult();
        }

    }
}