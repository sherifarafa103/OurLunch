using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;

namespace TodoApi.Controllers
{
    [Route("api/Restaurants")]
    public class MealController : Controller
    {
       
        [HttpGet("{id}")]
        public IActionResult GetMealById(int mealId, int restaurantId)  //retrieve from database for a certain index
        {
            Meal meal;

            using (var db = new OurLunchDatabase())
            {
                meal = db.MealRepository.GetMealById(mealId, restaurantId);
            }

            if (meal == null)
            {
                return NotFound();
            }

            return new ObjectResult(meal);
        }


        [HttpPost]
        public IActionResult AddMeal([FromBody] Meal meal) //Insert to database
        {
            using (var db = new OurLunchDatabase())
            {
                db.MealRepository.AddMeal(meal);
            }

            return CreatedAtRoute("AddMeal", new { id = meal.MealId }, meal);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateMeal(int id, [FromBody] Meal meal)
        {
            using (var db = new OurLunchDatabase())
            {
                db.MealRepository.UpdateMeal(meal);
            }

            return new NoContentResult();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteMeal(int id, [FromBody] Meal meal)
        {
            using (var db = new OurLunchDatabase())
            {
                db.MealRepository.Delete(meal);
            }

            return new NoContentResult();
        }

    }
}