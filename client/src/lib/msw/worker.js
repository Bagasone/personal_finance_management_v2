import expense from "./handlers/expenseHandlers";
import income from "./handlers/incomeHandlers";
import budget from "./handlers/budgetHandlers";
import debt from "./handlers/debtHandlers";

const handlers = [...expense, ...income, ...budget, ...debt];

export default handlers;
