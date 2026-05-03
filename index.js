const bedrock = require('bedrock-protocol');
const express = require('express');
const app = express();

// 1. Render ko jagaye rakhne ke liye Web Server
const PORT = process.env.PORT || 10000;
app.get('/', (req, res) => res.send('Bot is Running 24/7!'));
app.listen(PORT, () => console.log(`Web Monitor link ready on port ${PORT}`));

// 2. Bot Configuration
const options = {
  host: 'Crazyguys98.aternos.me',
  port: 34408, 
  offline: false,
  version: '26.10', // Isse 26.10 hi rehne dena
  conntimeout: 120000, 
  // raknetBackend wali line humne hata di hai (isise error aa raha tha)
  skipPing: true,    
  profilesFolder: './auth-cache'
};

function createBot() {
    console.log('--- Bot starting sequence ---');
    const client = bedrock.createClient(options);

    client.on('spawn', () => {
        console.log('SUCCESS: Bot server mein pahunch gaya hai!');
        
        // Anti-AFK Action: Har 10 second mein jump karna
        setInterval(() => {
            if (client) {
                client.queue('player_auth_input', {
                    pitch: 0, yaw: 0, position: { x: 0, y: 0, z: 0 },
                    move_vector: { x: 0, z: 0 }, head_yaw: 0, input_data: { _value: 0, jumping: true },
                    input_mode: 'mouse', play_mode: 'screen', interaction_model: 'touch',
                    tick: 0, delta: { x: 0, y: 0, z: 0 }
                });
            }
        }, 10000);

        // Har 5 minute mein chat message
        setInterval(() => {
            client.queue('text', {
                type: 'chat', needs_translation: false, source_name: client.username,
                xuid: '', platform_chat_id: '', message: 'Bot 24/7 Active Hai!'
            });
        }, 300000);
    });

    client.on('error', (err) => {
        console.log('Error Alert: ' + err.message);
        if (err.message.includes('timeout')) {
            console.log('Timeout error, reconnecting...');
            setTimeout(createBot, 10000);
        }
    });

    client.on('close', () => {
        console.log('Connection lost. Reconnecting in 15 seconds...');
        setTimeout(createBot, 15000);
    });
}

createBot();
