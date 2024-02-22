using System.Dynamic;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
namespace Company.Function
{
    public class GetChampionMastery
    {   
        string ?API_KEY = System.Environment.GetEnvironmentVariable("API_KEY");
        private readonly ILogger<GetChampionMastery> _logger;

        public GetChampionMastery(ILogger<GetChampionMastery> logger)
        {
            _logger = logger;
        }

        [Function("GetChampionMastery")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
        {
            string? puuid = req.Query["puuid"];
            _logger.LogInformation("Puuid: " + puuid);
            string url = $"https://na1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/{puuid}?api_key={API_KEY}";
            _logger.LogInformation($"url: {url}");

            try
            {
                var client = new HttpClient();
                var response = await client.GetAsync(url);

                var json = await response.Content.ReadAsStringAsync();

                dynamic ?responseData = JsonSerializer.Deserialize<List<ExpandoObject>>(json, new JsonSerializerOptions
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
