using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;
using OurLunch.Interfaces;
using OurLunch.WebSockets;

namespace TodoApi.Controllers
{
    [Route("api/orderItems")]
    public class OrderItemController : Controller
    {
        private IWebSocketHandler _socketHandler;

        public OrderItemController(IWebSocketHandler socketHandler)
        {
            _socketHandler = socketHandler;
        }

        [HttpGet("{orderId}")]
        public IActionResult GetOrderItemsByOrderId(int orderId)
        {
            List<OrderItem> orderItems;

            using (var db = new OurLunchDatabase())
            {
                orderItems = db.OrderItemRepository.GetOrderItemsByOrderId(orderId);
            }

            if (orderItems == null)
            {
                return NotFound();
            }

            return new ObjectResult(orderItems);
        }

        [HttpPost]
        public IActionResult AddOrderItem([FromBody] OrderItem orderItem)
        {
            using (var db = new OurLunchDatabase())
            {
                db.OrderItemRepository.AddOrderItem(orderItem);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "orderItems", Method = "post", Data = orderItem });              
            }

            return new ObjectResult(orderItem.OrderItemId);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateOrderItem(int id, [FromBody] OrderItem orderItem)
        {
            using (var db = new OurLunchDatabase())
            {
                db.OrderItemRepository.UpdateOrderItem(orderItem);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "orderItems", Method = "put", Data = orderItem });                
            }

            return new NoContentResult();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteOrderItem(int id)
        {
            using (var db = new OurLunchDatabase())
            {
                var orderItem = db.OrderItemRepository.GetOrderItemByOrderItemId(id);

                if (orderItem == null)
                {
                    return NotFound();
                }

                db.OrderItemRepository.DeleteOrderItem(orderItem);
                db.Save();
                _socketHandler.SendToAll(new Notification { Path = "orderItems", Method = "delete", Data = orderItem });
            }

            return new NoContentResult();
        }

    }
}