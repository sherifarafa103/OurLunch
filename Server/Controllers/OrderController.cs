using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;
using System;
using OurLunch.Interfaces;
using OurLunch.WebSockets;

namespace TodoApi.Controllers
{
    [Route("api/orders")]
    public class OrderController : Controller
    {
        private IWebSocketHandler _socketHandler;

        public OrderController(IWebSocketHandler socketHandler)
        {
            _socketHandler = socketHandler;
        }

        [HttpGet]
        public IEnumerable<Order> GetAll()
        {
            using (var db = new OurLunchDatabase())
            {
                return db.OrderRepository.GetOrders();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderById(int id)
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
        public IActionResult GetOrderByTime(DateTime start, DateTime end)
        {
            List<Order> orders;

            using (var db = new OurLunchDatabase())
            {
                orders = db.OrderRepository.GetOrdersByTime(start, end);
            }

            return new ObjectResult(orders);
        }

        [HttpPost]
        public IActionResult AddOrder([FromBody] Order order)
        {
            using (var db = new OurLunchDatabase())
            {
                db.OrderRepository.AddOrder(order);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "orders", Method = "post", Data = order });                
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
                _socketHandler.SendToAll(new Notification { Path = "orders", Method = "put", Data = order });                
            }

            return new NoContentResult();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(int id)
        {
            using (var db = new OurLunchDatabase())
            {
                var order = db.OrderRepository.GetOrderById(id);

                if (order == null)
                {
                    return NotFound();
                }

                db.OrderRepository.DeleteOrder(order);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "orders", Method = "delete", Data = order });

            }

            return new NoContentResult();
        }
    }
}