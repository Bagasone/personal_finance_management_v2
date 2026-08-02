import {
  // Categories
  IconToolsKitchen3,
  IconCar,
  IconHome,
  IconHeartHandshake,
  IconDeviceGamepad2,
  IconShoppingBag,
  IconSchool,
  IconReceipt,
  // Sources
  IconCashBanknote,
  IconCashBanknotePlus,
  IconTax,
  IconMoneybagPlus,
  IconCashMove,
  IconCashMoveBack,
  IconPigMoney,
  IconSeedling,
  IconCreditCard,
  // Types
  IconMoneybagMove,
  IconMoneybagMoveBack,
  // Sidebar
  IconChartPie,
  IconCashBanknoteMove,
  IconCashBanknoteMoveBack,
  IconBuildingBank,
} from "@tabler/icons-react";

export const CATEGORY_ICONS = {
  food: IconToolsKitchen3,
  transport: IconCar,
  housing: IconHome,
  health: IconHeartHandshake,
  entertainment: IconDeviceGamepad2,
  shopping: IconShoppingBag,
  education: IconSchool,
  other: IconReceipt,
};

export const SOURCE_ICONS = {
  salary: IconCashBanknote,
  freelance: IconCashBanknotePlus,
  revenue: IconTax,
  bonus: IconMoneybagPlus,
  dividend: IconPigMoney,
  interest: IconSeedling,
  other: IconCreditCard,
};

export const TYPE_ICONS = {
  owe: IconMoneybagMove,
  owed: IconMoneybagMoveBack,
};

export const SIDEBAR_ICONS = {
  dashboard: IconChartPie,
  expenses: IconCashBanknoteMove,
  incomes: IconCashBanknoteMoveBack,
  budgets: IconMoneybagPlus,
  debts: IconBuildingBank,
};
