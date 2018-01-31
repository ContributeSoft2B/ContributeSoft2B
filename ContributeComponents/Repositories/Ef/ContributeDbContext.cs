using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ContributeComponents.Domains;

namespace ContributeComponents.Repositories.Ef
{
  public   class ContributeDbContext:DbContext
    {
        public DbSet<Applications> Applications { get; set; }
        public DbSet<KycInfos> KycInfos { get; set; }
        public DbSet<Telegrams> Telegrams { get; set; }
    }
}
