dfdffdfimport cfonts from 'cfonts';
    cfonts.say('ggoku', {import fetch from 'node-fetch';
import readline from 'readline-sync';
import fs from 'fs';
import chalk from 'chalk';
import cfonts from 'cfonts';import cfonts from 'cfonts';
    cfonts.say('ggoku', {
    cfonts.say('ggoku', {
      font: 'block',
      align: 'center',
      colors: ['#adc241', '#fefda1'],
      background: 'black',
      letterSpacing: 1,
      lineHeight: 1,      letterSpacing: 1,
      lineHeight: 1,
      space: true,      align: 'center',import cfonts from 'cfonts';
    cfonts.say('ggoku', {
      colors: ['#adc241', '#fefda1'],
      background: 'black',
      maxLength: '0','block',import cfonts from 'cfonts';
    cfonts.say('ggoku', {
      align: 'center',      letterSpacing: 1,
      lineHeight: 1,      letterSpacing: 1,
      lineHeight: 1,dfdfdfdf
      colors: ['#adc241', '#fefda1'],
      background: 'black',ffdfdf
      letterSpacing: 1,'block',
      align: 'center',  background: 'black',
      letterSpacing: 1,'block',  background: 'black',
      letterSpacing: 1,'block',
      align: 'center',  background: 'black',
      letterSpacing: 1,'block',  background: 'black',
      letterSpacing: 1,'block',
      align: 'center',
      align: 'center',
      align: 'center',
      colors: ['#adc241', '#fefda1'],
      background: 'black',
      letterSpacing: 1,'block',
      align: 'center',
      colors: ['#adc241', '#fefda1'],
      background: 'black',
      letterSpacing: 1,
      lineHeight: 1,
      lineHeight: 1,
      lineHeight: 1,
    });  } catch (error) {}  } catch (error) {}
    console.log(chalk.green("=== Follow Twitter nha may bạn: https://x.com/PeterTran_CT ==="));
const channelIds = readline.question("Discord channel ID: ").split(',').map(id => id.trim());
const deleteOption = readline.question("Xoa tin nhan sau khi gui (yes/no): ").toLowerCase() === 'yes';
const waktuKirim = parseInt(readline.question("Thoi gian cho (Delay time s): ")) * 1000;
let waktuHapus = 0;
let waktuSetelahHapus = 0;

if (deleteOption) {
    waktuHapus = parseInt(readline.question("Cai dat tho gian cho: ")) * 1000;
    waktuSetelahHapus = parseInt(readline.question("Cai dat thoi gian xoa tin nhan: ")) * 1000;
}      align: 'center',
      align: 'center',
const tokens = fs.readFileSync("token.txt", "utf-8").split('\n').map(token => token.trim());

const getRandomComment = async (channelId, token) => {
    try {
        const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
            headers: { 'Authorization': token }
        });
        
        if (response.ok) {
            const messages = await response.json();
            if (messages.length) {
                let comment = messages[Math.floor(Math.random() * messages.length)].content;
                if (comment.length > 1) {
                    const index = Math.floor(Math.random() * comment.length);
                    comment = comment.slice(0, index) + comment.slice(index + 1);
                }
                return comment;
            }
        }
    } catch (error) {}
    return "Generated Message";
};

const sendMessage = async (channelId, content, token) => {
    try {
        const response = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages`, {
            method: 'POST',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify({ content })
        });
        
        if (response.ok) {
            const messageData = await response.json();
            console.log(chalk.green(`[✔] Message sent to ${channelId}: ${content}`));
            if (deleteOption) {
                await new Promise(resolve => setTimeout(resolve, waktuHapus));
                await deleteMessage(channelId, messageData.id, token);
            }
            return messageData.id;
        } else if (response.status === 429) {
            const retryAfter = (await response.json()).retry_after;
            await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
            return sendMessage(channelId, content, token);
        }
    } catch (error) {}
    return null;
};

const deleteMessage = async (channelId, messageId, token) => {
    try {
        const delResponse = await fetch(`https://discord.com/api/v9/channels/${channelId}/messages/${messageId}`, {
            method: 'DELETE',
            headers: { 'Authorization': token }
        });
        if (delResponse.ok) {
            console.log(chalk.blue(`[✔] Deleted message ${messageId} in channel ${channelId}`));
        }
        await new Promise(resolve => setTimeout(resolve, waktuSetelahHapus));
    } catch (error) {}
};      align: 'center',

(async () => {
    while (true) {
        for (const token of tokens) {
            for (const channelId of channelIds) {
                const randomComment = await getRandomComment(channelId, token);
                await sendMessage(channelId, randomComment, token);
                await new Promise(resolve => setTimeout(resolve, waktuKirim));
            }
        }
    }
})();
  } catch (error) {}  } catch (error) {}

      align: 'center',






















