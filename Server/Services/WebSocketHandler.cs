using System;
using System.Text;
using OurLunch.Interfaces;
using System.Collections.Concurrent;
using System.Net.WebSockets;
using Newtonsoft.Json;
using System.Threading;
using System.Threading.Tasks;
using System.Linq;

namespace OurLunch.WebSockets
{
    public class WebSocketHandler : IWebSocketHandler
    {
        private ConcurrentDictionary<string, WebSocket> _sockets = new ConcurrentDictionary<string, WebSocket>();

        public void OnConnected(WebSocket socket)
        {
            _sockets.TryAdd(_createConnectionId(), socket);
        }

        public async void OnDisconnected(WebSocket socket)
        {
            var id = _sockets.FirstOrDefault(s => s.Value == socket).Key;

            _sockets.TryRemove(id, out socket);

            await socket.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closed by the WebSocketManager", CancellationToken.None);
        }

        public async Task ListenForDisconnection(WebSocket socket)
        {
            var buffer = new byte[1024 * 4];

            while (socket.State == WebSocketState.Open)
            {
                var result = await socket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

                if (result.MessageType == WebSocketMessageType.Close)
                {
                    OnDisconnected(socket);
                }
            }
        }

        public async Task SendToAll(Notification message)
        {
            foreach (var pair in _sockets)
            {
                if (pair.Value.State == WebSocketState.Open)
                {
                    var jsonString = JsonConvert.SerializeObject(message);

                    await pair.Value.SendAsync(
                        new ArraySegment<byte>(Encoding.ASCII.GetBytes(jsonString), 0, jsonString.Length),
                        WebSocketMessageType.Text,
                        true,
                        CancellationToken.None
                    );
                }
            }
        }

        private string _createConnectionId()
        {
            return Guid.NewGuid().ToString();
        }
    }
}