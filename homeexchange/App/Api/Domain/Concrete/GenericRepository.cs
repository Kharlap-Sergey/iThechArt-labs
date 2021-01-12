using Microsoft.EntityFrameworkCore;
using Homeexchange.Domain.Abstract;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using Homeexchange.Domain;
using System.Threading.Tasks;

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
        public async Task<TEntity> CreateAsync(TEntity item)
        {
            item = _entities.Add(item).Entity;
            await _context.SaveChangesAsync();
            return item;
        }
        public async Task<TEntity> GetByIdAsync(object id)
        {
            var entity = await _entities.FindAsync(id);
            return entity;
        }
        public async Task<IEnumerable<TEntity>> GetAsync()
        {
            return await _entities.AsNoTracking().ToListAsync();
        }
        public async Task<IEnumerable<TEntity>>GetAsync(Expression<Func<TEntity, bool>> predicate)
        {
            return await _entities.AsNoTracking().Where(predicate).ToListAsync();
        }
        public async Task<IEnumerable<TEntity>> GetAsync(
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
                return await orderBy(query).ToListAsync();
            }
            else
            {
                return await query.ToListAsync();
            }
        }
        public async Task<IEnumerable<TEntity>> GetAsync(Specification<TEntity> specification)
        {
            IQueryable<TEntity> query = _entities.AsNoTracking();
            if (specification != null)
            {
                query = query.GetSpecifiedQuery<TEntity>(specification);
            }
            return await query.ToListAsync();
        }

        public async Task<IEnumerable<TEntity>> GetWithIncludeAsync(params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> query = _entities.AsNoTracking();
            return await Include(query, includeProperties).ToListAsync();
        }
        public async Task<IEnumerable<TEntity>> GetWithIncludeAsync(Expression<Func<TEntity, bool>> predicate,
            params Expression<Func<TEntity, object>>[] includeProperties)
        {
            IQueryable<TEntity> query = _entities.AsNoTracking();
            query = Include(query.Where(predicate), includeProperties);
            return await query.ToListAsync();
        }
        public async Task<TEntity> RemoveAsync(object id)
        {
            TEntity entityToRemove = _entities.Find(id);
            return await RemoveAsync(entityToRemove);
        }
        public async Task<TEntity> RemoveAsync(TEntity item)
        {
            _context.Entry(item).State = EntityState.Deleted;
            await _context.SaveChangesAsync();
            return item;
        }
        public async Task<TEntity> UpdateAsync(TEntity item)
        {
            _context.Entry(item).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return item;
        }
        private IQueryable<TEntity> Include(IQueryable<TEntity> query, params Expression<Func<TEntity, object>>[] includeProperties)
        {
            return includeProperties
                .Aggregate(query, (current, includeProperty) => current.Include(includeProperty));
        }
    }
}
