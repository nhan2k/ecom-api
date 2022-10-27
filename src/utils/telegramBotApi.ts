import TelegramBot from 'node-telegram-bot-api';
import { TOKEN_BOT, CHAT_ID } from '@config/env';

class TelegramBotAPI {
  // replace the value below with the Telegram token you receive from @BotFather
  private token = String(TOKEN_BOT);
  public bot: any;

  constructor() {
    // Create a bot that uses 'polling' to fetch new updates
    this.bot = new TelegramBot(this.token, { polling: true });
  }

  // Listen for any kind of message. There are different kinds of
  // messages.
  public botSendMessage(message: string) {
    // send a message to the chat acknowledging receipt of their message
    return this.bot.sendMessage(Number(CHAT_ID), message);
  }
}
export default new TelegramBotAPI();
