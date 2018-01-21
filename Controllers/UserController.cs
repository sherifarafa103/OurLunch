using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;

namespace TodoApi.Controllers
{
    [Route("api/users")]
    public class UserController : Controller
    {
        [HttpGet]
        public IEnumerable<User> GetAll() //retrieve from database
        {
            using (var db = new OurLunchDatabase())
            {
                return db.UserRepository.GetUsers();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)  //retrieve from database for a certain index
        {
            User user;

            using (var db = new OurLunchDatabase())
            {
                user = db.UserRepository.GetUserById(id);
            }

            if (user == null)
            {
                return NotFound();
            }

            return new ObjectResult(user);
        }

        [HttpGet("alias/{aliasVar}")]
        public IActionResult GetByAlias(string aliasVar)
        {
            User user;

            using (var db = new OurLunchDatabase())
            {
                user = db.UserRepository.GetUserByAlias(aliasVar);
            }

            if (user == null)
            {
                return NotFound();
            }

            return new ObjectResult(user);
        }



        [HttpPost]
        public IActionResult AddUser([FromBody] User user) //Insert to database
        {
            using (var db = new OurLunchDatabase())
            {
                db.UserRepository.AddUser(user);
            }

            return CreatedAtRoute("AddUser", new { id = user.UserId }, user);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User user)
        {
            using (var db = new OurLunchDatabase())
            {
                db.UserRepository.UpdateUser(user);
            }

            return new NoContentResult();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id, [FromBody] User user)
        {
            using (var db = new OurLunchDatabase())
            {
                db.UserRepository.Delete(user);
            }

            return new NoContentResult();
        }



        /* importanttttttttttttttttttttt
        [HttpGet("aliasSherif/{alias}")]
        public IActionResult GetByAlias(string alias)
        {

        }
        */



        /*
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User user)
        {
            using (var db = new OurLunchDatabase())
            {
                db.UserRepository.AddUser(user);
            }

            var item = _context.TodoItems.FirstOrDefault(t => t.Id == id);
            if (item == null)
            {
                return NotFound();
            }
            return new ObjectResult(item);
        }
        */

    }
}