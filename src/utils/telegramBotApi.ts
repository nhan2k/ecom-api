import TelegramBot from 'node-telegram-bot-api';
import { TOKEN_BOT, CHAT_ID } from '@config/env';
import axios from 'axios';

class TelegramBotAPI {
  // replace the value below with the Telegram token you receive from @BotFather
  private token = String(TOKEN_BOT);
  public bot: any;

  constructor() {
    // Create a bot that uses 'polling' to fetch new updates
    this.bot = new TelegramBot(this.token, { polling: true });

    this.botOnDeploy();
  }

  // Listen for any kind of message. There are different kinds of
  // messages.
  public botSendMessage(message: any) {
    return this.bot.sendMessage(Number(CHAT_ID), message);
  }

  public botOnDeploy() {
    this.bot.onText(/\/deploy/, async (msg: any) => {
      const response = await axios.get('https://api.netlify.com/api/v1/sites/00edd87e-46a2-4613-8002-2f0a07d43207/deploys');
      const { state, published_at, commit_url, log_access_attributes, title } = response.data[0];
      this.bot.sendMessage(Number(CHAT_ID), JSON.stringify({ state, published_at, commit_url, url_log: log_access_attributes.url, title }, null, 4));
    });
  }
}
export default new TelegramBotAPI();
