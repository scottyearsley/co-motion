using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using System.Security.Policy;

namespace co_motion.Import.Model
{
    class UserRepository : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Activity> Activities { get; set; }
    }

    [Table("User")]
    class User
    {
        public string Firstname { get; set; }

        public string Surname { get; set; }

        public long Id { get; set; }

        public string Code { get; set; }

        public string MoveId { get; set; }

        public virtual IList<Activity> Activities { get; set; }
    }

    [Table("Activity")]
    class Activity
    {
        public long Id { get; set; }

        public long UserId { get; set; }

        public virtual User User { get; set; }

        public DateTime DateTime { get; set; }

        public long Steps { get; set; }

        public long Distance { get; set; }
    }
}
