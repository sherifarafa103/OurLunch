using System.Net.WebSockets;
using OurLunch.WebSockets;
using System.Threading.Tasks;

namespace OurLunch.Interfaces
{
    public interface IWebSocketHandler
    {
        void OnConnected(WebSocket socket);

        void OnDisconnected(WebSocket socket);

        Task ListenForDisconnection(WebSocket socket);

        Task SendToAll(Notification message);  
    }
}