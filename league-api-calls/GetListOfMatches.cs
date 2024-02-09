using System.Dynamic;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class GetListOfMatches
    {
        string ?API_KEY = System.Environment.GetEnvironmentVariable("API_KEY");
        private readonly ILogger<GetListOfMatches> _logger;

        public GetListOfMatches(ILogger<GetListOfMatches> logger)
        {
            _logger = logger;
        }

        [Function("GetListOfMatches")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
        {
            string? puuid = req.Query["puuid"];
            _logger.LogInformation("GetListOfMatches trigger function processed a request.");
            _logger.LogInformation("puuid: " + puuid);

            string url = $"https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/{puuid}/ids?start=0&count=3&api_key={API_KEY}";
            _logger.LogInformation($"url: {url}");


             try
            {
                var client = new HttpClient();
                var response = await client.GetAsync(url);

                var json = await response.Content.ReadAsStringAsync();

                dynamic ?responseData = JsonSerializer.Deserialize<List<String>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                string responseMessage = string.IsNullOrEmpty(json)
                    ? "LeagueGetPUUID executed successfully"
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
