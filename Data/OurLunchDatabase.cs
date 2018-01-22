using System;
using System.Collections.Generic;

namespace OurLunch.Data
{
    public class OurLunchDatabase : IDisposable
    {
        private readonly OurLunchContext _context;

        private MealRepository mealRepository;
        private OrderItemRepository orderItemRepository;
        private OrderRepository orderRepository;
        private RestaurantRepository restaurantRepository;
        private UserRepository userRepository;

        public OurLunchDatabase()
        {
            _context = new OurLunchContext();
        }

        public OurLunchDatabase(OurLunchContext context)
        {
            _context = context;
        }

        public virtual MealRepository MealRepository
        {
            get
            {
                if (this.mealRepository == null)
                {
                    this.mealRepository = new MealRepository(_context);
                }
                return this.mealRepository;
            }
        }
        public virtual OrderItemRepository OrderItemRepository
        {
            get
            {
                if (this.orderItemRepository == null)
                {
                    this.orderItemRepository = new OrderItemRepository(_context);
                }
                return this.orderItemRepository;
            }
        }
        public virtual OrderRepository OrderRepository
        {
            get
            {
                if (this.orderRepository == null)
                {
                    this.orderRepository = new OrderRepository(_context);
                }
                return this.orderRepository;
            }
        }
        public virtual RestaurantRepository RestaurantRepository
        {
            get
            {
                if (this.restaurantRepository == null)
                {
                    this.restaurantRepository = new RestaurantRepository(_context);
                }
                return this.restaurantRepository;
            }
        }
        public virtual UserRepository UserRepository
        {
            get
            {
                if (this.userRepository == null)
                {
                    this.userRepository = new UserRepository(_context);
                }
                return this.userRepository;
            }
        }

        public virtual async System.Threading.Tasks.Task SaveAsync()
        {
            await _context.SaveChangesAsync().ConfigureAwait(false);
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        #region IDisposable

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion
    }
}
