using System;
using System.IO;
using System.Dynamic;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

namespace Company.Function
{
    public class GetPlayerData
    {
        private readonly ILogger<GetPlayerData> _logger;

        public GetPlayerData(ILogger<GetPlayerData> logger)
        {
            _logger = logger;
        }

        [Function("GetPlayerData")]
        public async Task<IActionResult> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get", "post")] HttpRequest req)
        {
            string? username = req.Query["username"];
            _logger.LogInformation("username: " + username);
            string url = "https://api.overwatchleague.com/owl/v1/players/${username}";
            _logger.LogInformation($"url: {url}");

            try
            {
                var client = new HttpClient();
                var response = await client.GetAsync(url);

                var json = await response.Content.ReadAsStringAsync();

                dynamic? responseData = JsonSerializer.Deserialize<List<ExpandoObject>>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                string responseMessage = string.IsNullOrEmpty(json)
                    ? "GetPlayerData executed successfully"
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
