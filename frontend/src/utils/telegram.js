// React can communication with Telegram
const telegram = window.Telegram?.WebApp;

export const isTelegramMiniApp = () => {
  return Boolean(telegram);
};

export const initializeTelegram = () => {
  if (!telegram) {
    console.log("AhGib is running in a normal browser.");
    return;
  }

  telegram.ready();
  telegram.expand();

  console.log("AhGib Telegram Mini App initialized.");
};

export const getTelegramUser = () => {
  return telegram?.initDataUnsafe?.user ?? null;
};

export const getTelegramInitData = () => {
  return telegram?.initData ?? "";
};

export default telegram;