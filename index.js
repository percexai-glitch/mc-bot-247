const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.send('Bot is Alive!'));
app.listen(PORT, () => console.log(`Web server on port ${PORT}`));

const options = {
  host: 'Crazyguys98.aternos.me',
  port: 34408,
  username: 'CrazyBot_247', 
  offline: false,
  version: '26.10', // '26.10' ki jagah ye try karo, ye zyada stable hai connection ke liye
  conntimeout: 10000,
  raknetBackend: 'raknet-native' // Isse connection fast hota hai
};

function startBot() {
  console.log('Bot connect karne ki koshish kar raha hai...');
  
  try {
    const client = bedrock.createClient(options);

    client.on('spawn', () => {
      console.log('Success! Bot server ke andar hai.');
    });

    client.on('error', (err) => {
      // Agar MTU error aaye toh ignore karke wapas connect karenge
      console.log('Connection error:', err.message);
    });

    client.on('close', () => {
      console.log('Connection lost. 15 seconds me restart karenge...');
      setTimeout(startBot, 15000);
    });

  } catch (e) {
    console.log('Critical Error:', e);
    setTimeout(startBot, 15000);
  }
}

startBot();