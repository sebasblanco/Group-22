using System.Dynamic;
using System.Net.Http.Json;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class LeagueGetPUUID
    {
        const string API_KEY = "RGAPI-f32fb186-7dd6-4689-b228-2c86152e45ee";
        private readonly ILogger<LeagueGetPUUID> _logger;

        public LeagueGetPUUID(ILogger<LeagueGetPUUID> logger)
        {
            _logger = logger;
        }

        [Function("LeagueGetPUUID")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
        {
            string? username = req.Query["username"];
            string? tag = req.Query["tag"];
            _logger.LogInformation("C# HTTP trigger function processed a request.");
            _logger.LogInformation("username: " + username);
            _logger.LogInformation("tag: " + tag);

            string url = $"https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/{username}/{tag}?api_key={API_KEY}";
            _logger.LogInformation($"url: {url}");
            
            try
            {
                var client = new HttpClient();
                var response = await client.GetAsync(url);

                var json = await response.Content.ReadAsStringAsync();

                dynamic ?responseData = JsonSerializer.Deserialize<ExpandoObject>(json, new JsonSerializerOptions
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
