using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;

namespace TodoApi.Controllers
{
    [Route("api/meals")]
    public class MealController : Controller
    {
       
        [HttpGet("{id}")]
        public IActionResult GetMealById(int id)  //retrieve from database for a certain index
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
        public IActionResult AddMeal([FromBody] Meal meal) //Insert to database
        {
            using (var db = new OurLunchDatabase())
            {
                db.MealRepository.AddMeal(meal);
                db.Save();
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
            }

            return new NoContentResult();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteMeal(int id)
        {
            using (var db = new OurLunchDatabase())
            {
                var meal = db.MealRepository.GetMealById(id);

                if (meal == null)
                {
                    return NotFound();
                }

                db.MealRepository.DeleteMeal(meal);
                db.Save();
            }

            return new NoContentResult();
        }

    }
}