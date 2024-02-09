using System.Dynamic;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class GetMatchData
    {
        private readonly ILogger<GetMatchData> _logger;
        string ?API_KEY = System.Environment.GetEnvironmentVariable("API_KEY");

        public GetMatchData(ILogger<GetMatchData> logger)
        {
            _logger = logger;
        }

        [Function("GetMatchData")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")] HttpRequest req)
        {
            _logger.LogInformation("GetMatchData trigger function processed a request.");
            string? matchID = req.Query["matchID"];

            string url = $"https://americas.api.riotgames.com/lol/match/v5/matches/{matchID}?api_key={API_KEY}";

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
