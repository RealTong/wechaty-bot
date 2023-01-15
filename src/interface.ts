export interface IBotProvider {
  botName: string;

  setBotName(name: string): void;
  getBotName(): string;

  startBot(): Promise<void>;
}
