using System;
using System.Collections.Generic;
using System.Linq;
using RestSharp;

namespace co_motion.Import.Model
{
    class MoveClient
    {
        public SummaryActivity GetUserData(string accessToken)
        {
            var dateFormat = DateTime.Now.ToString("yyyyMMdd");
            var client = new RestClient("https://api.moves-app.com/api/1.1/user/activities/daily/" + dateFormat);
            var request = new RestRequest();
            request.AddHeader("Accept", "application/json");
            request.AddHeader("Authorization", "Bearer " + accessToken);
            request.Method = Method.GET;

            var response = client.Execute<List<MoveDataItem>>(request);

            if (response.Data != null)
            {
                try
                {
                    var activity = (from item in response.Data
                        from summary in item.summary
                        where (summary != null && summary.activity == "walking")
                        select summary).SingleOrDefault();
                    return activity;
                }
                catch (Exception e)
                {
                    // No data in summary
                    return null;
                }
            }

            return null;
        }
    }
}
