from flask import Flask
from flask_socketio import SocketIO
import eventlet

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")


@app.route("/")
def home():
    return "Socket.IO Server Running"

def send_notifications():
    contador=0
    """Función que emite notificaciones cada 5 segundos"""
    while True:
        eventlet.sleep(5)  # Espera 5 segundos
        socketio.emit("new_notification", {"message": "¡Tienes una nueva notificación!"})
        print("Notificación enviada "+str(contador))
        contador+=1

@socketio.on("connect")
def handle_connect():
    print("Cliente conectado")
    socketio.start_background_task(send_notifications)

@socketio.on("disconnect")
def handle_disconnect():
    print("Cliente desconectado")

if __name__ == "__main__":
    socketio.run(app, host="0.0.0.0", port=5000, debug=True)