
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace co_motion.Import.Model
{
    class MoveDataImporter
    {
        public void Run()
        {
            var now = DateTime.Now.Date;
            var tommorrow = now.Date.AddDays(1);

            using (var db = new UserRepository())
            {
                var users = db.Users.Where(u => u.Code != null).ToList();
                var moveClient = new MoveClient();

                foreach (var user in users)
                {
                    var activity = moveClient.GetUserData(user.Code);
                    if (activity != null)
                    {
                        var userActivity = db.Activities.SingleOrDefault(a => a.UserId == user.Id 
                            && (a.DateTime >= now.Date && a.DateTime < tommorrow));

                        if (userActivity != null)
                        {
                            // Update
                            userActivity.Steps = int.Parse(activity.steps);
                            userActivity.Distance = int.Parse(activity.distance);
                        }
                        else
                        {
                            // Insert
                            userActivity = new Activity
                            {
                                DateTime = now,
                                UserId = user.Id,
                                Steps = int.Parse(activity.steps),
                                Distance = int.Parse(activity.distance)
                            };
                            db.Activities.Add(userActivity);
                        }
                        db.SaveChanges();
                    }
                }
            }
        }
    }
}
