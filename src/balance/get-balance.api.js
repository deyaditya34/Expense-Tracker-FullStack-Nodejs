const buildApiHandler = require("../api-utils/build-api-handler");

const userResolver = require("../middlewares/user-resolver");

const getBalance = require("./balance.service");

async function controller(req, res) {
  let result = await getBalance();

  res.json({
    message: "Balance :-",
    data: formatAmountItems(result),
  });
}

const formatAmountItems = (amountItems) => {
  let balance = 0;
  amountItems.forEach((typedAmountItem) => {
    let signedVal = typedAmountItem.amount;
    if (typedAmountItem.type === "DEBIT") {
      signedVal *= -1;
    }

    balance += signedVal;
  });

  return {
    balance,
    items: amountItems,
  };
};

module.exports = buildApiHandler([userResolver, controller]);
