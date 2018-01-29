using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OurLunch.Models;


namespace OurLunch.Data
{
    public class OrderRepository : BaseRepository<Order>
    {
        public OrderRepository(OurLunchContext context) : base(context) { }

        public virtual List<Order> GetOrders()
        {
            return Get().ToList();
        }

        public virtual Order GetOrderById(int order_no)
        {
            return Get(o => o.OrderId == order_no).SingleOrDefault();
        }
        
        public virtual Order GetOrderByTime(DateTime start, DateTime end)
        {
            return Get(o => o.Time >= start && o.Time <= end).SingleOrDefault();
        }

        public virtual void AddOrder(Order order)
        {
            Insert(order);
        }

        public void UpdateOrder(Order updatedOrder)
        {
            Update(updatedOrder);
        }

        public virtual void DeleteOrder(Order order)
        {
            Delete(order);
        }

        /*
        public void UpdateOrder(Guid orderId, int userId, int restaurantId, DateTime time)
        {
            var record = GetByID(orderId);
            record.UserId = userId;
            record.RestaurantId = restaurantId;
            record.Time = time;
            Update(record);
        }
        */

        /*
        public virtual void DeleteOrder(Guid orderId)
        {
            var record = GetByID(orderId);
            Delete(record);
        }
        */

    }
}
