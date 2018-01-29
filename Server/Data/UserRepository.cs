using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using OurLunch.Models;

namespace OurLunch.Data
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(OurLunchContext context) : base(context) { }

        public virtual List<User> GetUsers()
        {
            return Get().ToList();
        }

        public virtual User GetUserById(int userId)
        {
            return Get(u => u.UserId == userId).SingleOrDefault();
        }

        public virtual User GetUserByAlias(string alias)
        {
            return Get(u => u.Alias == alias).SingleOrDefault();
        }

        public virtual User GetUserByLastName(string LastName)
        {
            return Get(u => u.LastName == LastName).SingleOrDefault();
        }

        public virtual void AddUser(User newUser)
        {
            Insert(newUser);
        }
        public void UpdateUser(User updatedUser)
        {
            Update(updatedUser);
        }
        
        public virtual void DeleteUser(User user)
        {
            Delete(user);
        }




        /*
        public void UpdateUser(Guid userId, string firstName, string lastName)
        {
            var record = GetByID(userId);
            record.FirstName = firstName;
            record.LastName = lastName;
            Update(record);
        }
        */
        
        /*
        public virtual void DeleteUser(Guid userId)
        {
            var record = GetByID(userId);
            Delete(record);
        }
        */
        
        /*
        public virtual Task<ModelData> GetModelAsync(Guid taskId, Guid modelId)
        {
            return Get(m => m.TaskId == taskId && !m.Deleted && m.ModelId == modelId,
                null,
                m => m.ParentModelRelations,
                m => m.ChildModelRelations,
                m => m.EntityExtractor,
                m => m.SubClosedLists,
                m => m.ExplicitLists
                ).SingleOrDefaultAsync();
        }*/
    }
}
