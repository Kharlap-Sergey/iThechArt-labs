using Microsoft.EntityFrameworkCore;
using HomeexchangeApi.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace HomeexchangeApi.Domain.Concrete
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
            item = entities.Add(item).Entity;
            dbContext.SaveChanges();
            return item;
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

        public IQueryable<TEntity> GetQuerable(Func<TEntity, bool> predicate)
        {
            return entities.AsNoTracking().ToList().Where(predicate);
        }

        public TEntity Remove(TEntity item)
        {
            dbContext.Entry(item).State = EntityState.Deleted;
            dbContext.SaveChanges();
            return item;
        }

        public TEntity Update(TEntity item)
        {
            //var entry = entities.F;
            //var entry = dbContext.Entry(item);
            dbContext.Entry(item).State = EntityState.Modified;
            dbContext.SaveChanges();
            return item;
        }
    }
}
