import {
  IoFastFoodOutline,
  IoCarOutline,
  IoHomeOutline,
  IoFitnessOutline,
  IoGameControllerOutline,
  IoBagHandleOutline,
  IoSchoolOutline,
  IoReceiptOutline,
} from "react-icons/io5";

import {
  // Incomes
  TbCashBanknote,
  TbCashBanknotePlus,
  TbTax,
  TbMoneybagPlus,
  TbMoneybagMove,
  TbMoneybagMoveBack,
  TbPigMoney,
  TbSeedling,
  TbCreditCard,
  // Sidebar
  TbChartPie,
  TbCashBanknoteMove,
  TbCashBanknoteMoveBack,
  TbMoneybagEdit,
  TbBuildingBank,
} from "react-icons/tb";

export const CATEGORY_ICONS = {
  food: IoFastFoodOutline,
  transport: IoCarOutline,
  housing: IoHomeOutline,
  health: IoFitnessOutline,
  entertainment: IoGameControllerOutline,
  shopping: IoBagHandleOutline,
  education: IoSchoolOutline,
  other: IoReceiptOutline,
};

export const SOURCE_ICONS = {
  salary: TbCashBanknote,
  freelance: TbCashBanknotePlus,
  revenue: TbTax,
  bonus: TbMoneybagPlus,
  dividend: TbPigMoney,
  interest: TbSeedling,
  other: TbCreditCard,
};

export const TYPE_ICONS = {
  owe: TbMoneybagMove,
  owed: TbMoneybagMoveBack,
};

export const SIDEBAR_ICONS = {
  dashboard: TbChartPie,
  expenses: TbCashBanknoteMove,
  incomes: TbCashBanknoteMoveBack,
  budgets: TbMoneybagEdit,
  debts: TbMoneybagEdit,
};
