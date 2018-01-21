using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using OurLunch.Models;
using OurLunch.Data;

namespace TodoApi.Controllers
{
    [Route("api/orderItems")]
    public class OrderItemController : Controller
    {
        [HttpGet]
        public IEnumerable<OrderItem> GetAllOrdersItems() //retrieve from database
        {
            using (var db = new OurLunchDatabase())
            {
                return db.OrderItemRepository.GetAllOrdersItems();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderItemsByOrderId(int id)  //retrieve from database for a certain index
        {
            OrderItem orderItem;

            using (var db = new OurLunchDatabase())
            {
                orderItem = db.OrderItemRepository.GetOrderItemsByOrderId(id);
            }

            if (orderItem == null)
            {
                return NotFound();
            }

            return new ObjectResult(orderItem);
        }

        [HttpGet("{id}")]
        public IActionResult GetOrderItemsForOneUser(int userId, int orderId)  //retrieve from database for a certain index
        {
            OrderItem orderItem;

            using (var db = new OurLunchDatabase())
            {
                orderItem = db.OrderItemRepository.GetOrderItemsForOneUser(userId, orderId);
            }

            if (orderItem == null)
            {
                return NotFound();
            }

            return new ObjectResult(orderItem);
        }


        [HttpPost]
        public IActionResult AddOrderItem([FromBody] OrderItem orderItem) //Insert to database
        {
            using (var db = new OurLunchDatabase())
            {
                db.OrderItemRepository.AddOrderItem(orderItem);
            }

            return CreatedAtRoute("AddOrderItem", new { id = orderItem.OrderItemId }, orderItem);
        }


        [HttpPut("{id}")]
        public IActionResult UpdateOrderItem(int id, [FromBody] OrderItem orderItem)
        {
            using (var db = new OurLunchDatabase())
            {
                db.OrderItemRepository.UpdateOrderItem(orderItem);
            }

            return new NoContentResult();
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteOrderItem(int id, [FromBody] OrderItem orderItem)
        {
            using (var db = new OurLunchDatabase())
            {
                db.OrderItemRepository.Delete(orderItem);
            }

            return new NoContentResult();
        }

    }
}