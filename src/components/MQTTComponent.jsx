import React, { useEffect, useState } from 'react';
import mqtt from 'mqtt';

const MQTTComponent = () => {
  const [messages, setMessages] = useState([]);
  const [client, setClient] = useState(null);

  useEffect(() => {
    const mqttClient = mqtt.connect('ws://157.230.230.162:8883'); // Cambia esto a tu dirección IP y puerto

    mqttClient.on('connect', () => {
      console.log('Conectado a MQTT Broker');
      mqttClient.subscribe('prueba', (err) => {
        if (!err) {
          console.log('Suscrito al topic');
        }
      });
    });

    mqttClient.on('message', (topic, message) => {
      console.log(`Mensaje recibido: ${message.toString()}`);
      setMessages((prevMessages) => [...prevMessages, message.toString()]);
    });

    setClient(mqttClient);

    // Cleanup
    return () => {
      mqttClient.end();
    };
  }, []);

  const sendOpenMessage = () => {
    if (client) {
      client.publish('tu/topic', 'open');
      console.log('Mensaje enviado: open');
    }
  };

  return (
    <div>
      <h1>Mensajes MQTT</h1>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button onClick={sendOpenMessage}>Enviar Mensaje 'open'</button>
    </div>
  );
};

export default MQTTComponent;

