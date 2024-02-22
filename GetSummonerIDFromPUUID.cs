using System.Dynamic;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class GetSummonerIDFromPUUID
    {
        private readonly ILogger<GetSummonerIDFromPUUID> _logger;
        string ?API_KEY = System.Environment.GetEnvironmentVariable("API_KEY");


        public GetSummonerIDFromPUUID(ILogger<GetSummonerIDFromPUUID> logger)
        {
            _logger = logger;
        }

        [Function("GetSummonerIDFromPUUID")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req) {
         _logger.LogInformation("GetRankedBySummonerID trigger function processed a request.");
            string? puuid = req.Query["puuid"];
            string url = $"https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/{puuid}?api_key={API_KEY}";
            _logger.LogInformation("url" + url);
            _logger.LogInformation("api key" + API_KEY);

            try
            {
                var client = new HttpClient();
                var response = await client.GetAsync(url);

                var json = await response.Content.ReadAsStringAsync();

                dynamic ?responseData = JsonSerializer.Deserialize<dynamic>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                string responseMessage = string.IsNullOrEmpty(json)
                    ? "GetMatchData executed successfully"
                    : $"{json}";

                return new OkObjectResult(responseMessage);
            }
            catch (JsonException ex)
            {
                _logger.LogError($"Error during JSON deserialization: {ex.Message}");
                return new BadRequestObjectResult("Error during JSON deserialization");
            }
            catch (HttpRequestException ex)
            {
                _logger.LogError($"Error during HTTP request: {ex.Message}");
                return new BadRequestObjectResult("Error during HTTP request");
            }
    }
}
}