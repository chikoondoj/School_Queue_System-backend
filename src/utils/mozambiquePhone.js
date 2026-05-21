const MOZAMBIQUE_COUNTRY_CODE = "258";

const MOZAMBIQUE_OPERATORS = {
  MCEL_TMcel: {
    name: "Tmcel/Mcel",
    prefixes: ["82", "83"],
    smsSupported: true,
  },
  VODACOM: {
    name: "Vodacom",
    prefixes: ["84", "85"],
    smsSupported: true,
  },
  MOVITEL: {
    name: "Movitel",
    prefixes: ["86", "87"],
    smsSupported: false,
    restriction:
      "Movitel requires a registered Alphanumeric Sender ID for reliable Twilio SMS delivery.",
  },
};

const allOperators = Object.values(MOZAMBIQUE_OPERATORS);
const allMobilePrefixes = allOperators.flatMap((operator) => operator.prefixes);

function getOperatorByPrefix(prefix) {
  return allOperators.find((operator) => operator.prefixes.includes(prefix));
}

function getLocalMobileNumber(phone) {
  if (!phone) return null;

  let digits = String(phone).replace(/\D/g, "");

  if (digits.startsWith("00")) {
    digits = digits.slice(2);
  }

  if (digits.startsWith(MOZAMBIQUE_COUNTRY_CODE)) {
    digits = digits.slice(MOZAMBIQUE_COUNTRY_CODE.length);
  }

  return digits;
}

function normalizeMozambiquePhone(phone, { allowUnsupportedOperators = false } = {}) {
  const localNumber = getLocalMobileNumber(phone);

  if (!localNumber || !/^\d{9}$/.test(localNumber)) {
    return {
      isValid: false,
      reason: "Phone number must be a Mozambican mobile number with 9 local digits.",
    };
  }

  const prefix = localNumber.slice(0, 2);
  const operator = getOperatorByPrefix(prefix);

  if (!operator || !allMobilePrefixes.includes(prefix)) {
    return {
      isValid: false,
      reason: "Phone number must start with 82, 83, 84, 85, 86, or 87.",
    };
  }

  if (!operator.smsSupported && !allowUnsupportedOperators) {
    return {
      isValid: false,
      isUnsupportedOperator: true,
      operator,
      reason: operator.restriction,
    };
  }

  return {
    isValid: true,
    e164: `+${MOZAMBIQUE_COUNTRY_CODE}${localNumber}`,
    localNumber,
    prefix,
    operator,
  };
}

module.exports = {
  MOZAMBIQUE_OPERATORS,
  normalizeMozambiquePhone,
};
