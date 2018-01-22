using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;
using System;

namespace TodoApi.Controllers
{
    [Route("api/orders")]
    public class OrderController : Controller
    {
        [HttpGet]
        public IEnumerable<Order> GetAll() //retrieve from database
        {
            using (var db = new OurLunchDatabase())
            {
                return db.OrderRepository.GetOrders();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)  //retrieve from database for a certain index
        {
            Order order;

            using (var db = new OurLunchDatabase())
            {
                order = db.OrderRepository.GetOrderById(id);
            }

            if (order == null)
            {
                return NotFound();
            }

            return new ObjectResult(order);
        }
      
        
        [HttpGet("time/{start}/{end}")]
        public IActionResult GetOrderByTime(DateTime start,DateTime end)
        {
            Order order;

            using (var db = new OurLunchDatabase())
            {
                order = db.OrderRepository.GetOrderByTime(start, end);
            }

            if (order == null)
            {
                return NotFound();
            }

            return new ObjectResult(order);
        }
        



        [HttpPost]
        public IActionResult AddOrder([FromBody] Order order) //Insert to database
        {
            using (var db = new OurLunchDatabase())
            {
                db.OrderRepository.AddOrder(order);
                db.Save();
            }

            return new ObjectResult(order.OrderId);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateOrder(int id, [FromBody] Order order)
        {
            using (var db = new OurLunchDatabase())
            {
                db.OrderRepository.UpdateOrder(order);
                db.Save();
            }

            return new NoContentResult();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            using (var db = new OurLunchDatabase())
            {
                var order = db.OrderRepository.GetOrderById(id);

                if(order == null)
                {
                    return NotFound();
                }

                db.OrderRepository.DeleteOrder(order);
                db.Save();
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