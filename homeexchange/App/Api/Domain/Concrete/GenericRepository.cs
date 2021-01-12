using Microsoft.EntityFrameworkCore;
using Homeexchange.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Homeexchange.Domain;

namespace Homeexchange.Domain.Concrete
{
    public sealed class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
    {
        private readonly DbContext _context;
        private readonly DbSet<TEntity> _entities;
        public GenericRepository(CustomDbContext context)
        {
            _context = context;
            _entities = context.Set<TEntity>();
        }
        public TEntity Create(TEntity item)
        {
            item = _entities.Add(item).Entity;
            _context.SaveChanges();
            return item;
        }
        public TEntity GetById(object id)
        {
            return _entities.Find(id);
        }
        public IEnumerable<TEntity> Get()
        {
            return _entities.AsNoTracking().ToList();
        }
        public IEnumerable<TEntity> Get(Expression<Func<TEntity, bool>> predicate)
        {
            return _entities.AsNoTracking().Where(predicate).ToList();
        }
        public IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null,
            string includeProperties = "")
        {
            IQueryable<TEntity> query = _entities;
            if (filter != null)
            {
                query = query.Where(filter);
            }
            foreach (var includeProperty in includeProperties.Split
                (new char[] { ',' }, StringSplitOptions.RemoveEmptyEntries))
            {
                query = query.Include(includeProperty);
            }
            if (orderBy != null)
            {
                return orderBy(query).ToList();
            }
            else
            {
                return query.ToList();
            }
        }
         public IEnumerable<TEntity> Get(Specification<TEntity> specification)
        {
            IQueryable<TEntity> query = _entities.AsNoTracking();
            if (specification != null)
            {
                query = query.GetSpecifiedQuery<TEntity>(specification);
            }
            //return _entities.AsNoTracking().Where(predicate).Skip(skip).Take(take).ToList();
            return query;
        }
        
        public IEnumerable<TEntity> GetWithInclude(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> query = _entities.AsNoTracking();
            return Include(query, includeProperties).ToList();
        }
        public IEnumerable<TEntity> GetWithInclude(Expression<Func<TEntity, bool>> predicate,
            params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> query = _entities.AsNoTracking();
            query = Include(query.Where(predicate), includeProperties);
            return query.ToList();
        }
        public TEntity Remove(object id)
        {
            TEntity entityToRemove = _entities.Find(id);
            return Remove(entityToRemove);
        }
        public TEntity Remove(TEntity item)
        {
            _context.Entry(item).State = EntityState.Deleted;
            _context.SaveChanges();
            return item;
		}
        public TEntity Update(TEntity item)
        {
            _context.Entry(item).State = EntityState.Modified;
            _context.SaveChanges();
            return item;
        }
        private IQueryable<TEntity> Include(IQueryable<TEntity> query, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return includeProperties
                .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
        }
    }
}
