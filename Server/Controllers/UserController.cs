using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;
using OurLunch.Interfaces;
using OurLunch.WebSockets;

namespace TodoApi.Controllers
{
    [Route("api/users")]
    public class UserController : Controller
    {
        private IWebSocketHandler _socketHandler;

        public UserController(IWebSocketHandler socketHandler)
        {
            _socketHandler = socketHandler;
        }

        [HttpGet]
        public IEnumerable<User> GetAll() //retrieve from database
        {
            using (var db = new OurLunchDatabase())
            {
                return db.UserRepository.GetUsers();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
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
        public IActionResult AddUser([FromBody] User user)
        {
            using (var db = new OurLunchDatabase())
            {
                var existingUser = db.UserRepository.GetUserByAlias(user.Alias);

                if(existingUser != null)
                {
                    return BadRequest();
                }

                db.UserRepository.AddUser(user);
                db.Save();
                
                _socketHandler.SendToAll(new Notification { Path = "users", Method = "post", Data = user });
            }

            return new ObjectResult(user.UserId);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User user)
        {
            using (var db = new OurLunchDatabase())
            {
                db.UserRepository.UpdateUser(user);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "users", Method = "put", Data = user });
            }

            return new NoContentResult();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            using (var db = new OurLunchDatabase())
            {
                var user = db.UserRepository.GetUserById(id);

                if (user == null)
                {
                    return NotFound();
                }

                db.UserRepository.DeleteUser(user);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "users", Method = "delete", Data = user });
            }

            return new NoContentResult();
        }
    }
}