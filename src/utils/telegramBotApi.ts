import TelegramBot from 'node-telegram-bot-api';
import { TOKEN_BOT, CHAT_ID } from '@config/env';
import axios from 'axios';
import { URL_NETLIFY } from '@config/env';
import { logger } from '@utils/logger';

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
      logger.info(`Bot on deloy ${msg.chai.id}`);
      const response = await axios.get(String(URL_NETLIFY));
      const { state, published_at, commit_url, log_access_attributes, title } = response.data[0];
      this.bot.sendMessage(Number(CHAT_ID), JSON.stringify({ state, published_at, commit_url, url_log: log_access_attributes.url, title }, null, 4));
    });
  }
}
export default new TelegramBotAPI();
