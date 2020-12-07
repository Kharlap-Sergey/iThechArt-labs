using Microsoft.EntityFrameworkCore;
using serverApi.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Domain.Concrete
{
    public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        DbContext dbContext;
        DbSet<TEntity> entities;
        public GenericRepository(CustomDbContext context)
        {
            dbContext = context;
            entities = context.Set<TEntity>();
        }

        public TEntity Create(TEntity item)
        {
            try
            {
                item = entities.Add(item).Entity;
                dbContext.SaveChanges();
                return item;
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        public TEntity FindById(int id)
        {
            return entities.Find(id);
        }

        public IEnumerable<TEntity> Get()
        {
            return entities.AsNoTracking().ToList();
        }

        public IEnumerable<TEntity> Get(Func<TEntity, bool> predicate)
        {
            return entities.AsNoTracking().ToList().Where(predicate);
        }

        public void Remove(TEntity item)
        {
            dbContext.Entry(item).State = EntityState.Deleted;
            dbContext.SaveChanges();
        }

        public void Update(TEntity item)
        {
            //var entry = entities.F;
            var entry = dbContext.Entry(item);
            dbContext.Entry(item).State = EntityState.Modified;
            dbContext.SaveChanges();
        }
    }
}
