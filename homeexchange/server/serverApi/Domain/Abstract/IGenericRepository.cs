using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace serverApi.Domain.Abstract
{
    public interface IGenericRepository<TEntity> where TEntity : class
    {
        TEntity Create(TEntity item);
        TEntity FindById(int id);
        IEnumerable<TEntity> Get();
        IEnumerable<TEntity> Get(Func<TEntity, bool> predicate);
        TEntity Remove(TEntity item);
        TEntity Update(TEntity item);
    }
}
