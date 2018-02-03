using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OurLunch.Models;


namespace OurLunch.Data
{
    public class OrderItemRepository : BaseRepository<OrderItem>
    {
        public OrderItemRepository(OurLunchContext context) : base(context) { }

        public virtual List<OrderItem> GetOrderItemsByOrderId(int orderId)
        {
            return Get(i=> i.OrderId == orderId).ToList();
        }

        public virtual OrderItem GetOrderItemByOrderItemId(int orderItemId)
        {
            return Get(i => i.OrderItemId == orderItemId).SingleOrDefault();
        }

        public virtual void AddOrderItem(OrderItem item)
        {
            Insert(item);
        }

        public void UpdateOrderItem(OrderItem updatedOrderItem)
        {
            Update(updatedOrderItem);
        }

        public virtual void DeleteOrderItem(OrderItem orderItem)
        {
            Delete(orderItem);
        }
    }
}
