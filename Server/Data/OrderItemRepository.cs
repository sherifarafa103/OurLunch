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

        public virtual List<OrderItem> GetAllOrdersItems()
        {
            return Get().ToList();
        }

        public virtual OrderItem GetOrderItemsByOrderId(int orderId)
        {
            return Get(i=> i.OrderId == orderId).SingleOrDefault();
        }

        public virtual OrderItem GetOrderItemByOrderItemId(int orderItemId)
        {
            return Get(i => i.OrderItemId == orderItemId).SingleOrDefault();
        }
        //add order no
        public virtual OrderItem GetOrderItemsForOneUser(int userId,int orderId)
        {
            return Get(i => i.UserId == userId && i.OrderId == orderId).SingleOrDefault();
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

        /*
        public void UpdateOrderItem(Guid orderItemId, int orderId, int mealId, int userId, float price)
        {
            var record = GetByID(orderId);
            record.OrderId = orderId;
            record.MealId = mealId;
            record.UserId = userId;
            record.Price = price;
            Update(record);
        }
        */
        /*
        public void UpdateOrderItem(OrderItem updatedOrderItem)
        {
            Update(updatedOrderItem);
        }
        */
        
       
    }
}
