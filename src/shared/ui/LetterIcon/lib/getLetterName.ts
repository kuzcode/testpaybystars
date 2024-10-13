export const letters = [
  //   { name: "Chi", limit: 100 },
  { name: "Phi", limit: 200 },
  //   { name: "Upsilon", limit: 400 },
  //   { name: "Tau", limit: 800 },
  { name: "Sigma", limit: 2000 },
  { name: "Rho", limit: 5000 },
  { name: "Pi", limit: 10000 },
  { name: "Omicron", limit: 15000 },
  { name: "Xi", limit: 20000 },
  { name: "Nu", limit: 25000 },
  { name: "Mu", limit: 35000 },
  { name: "Lambda", limit: 50000 },
  { name: "Kappa", limit: 80000 },
  { name: "Iota", limit: 100000 },
  { name: "Theta", limit: 150000 },
  { name: "Eta", limit: 200000 },
  { name: "Zeta", limit: 250000 },
  { name: "Epsilon", limit: 300000 },
  { name: "Delta", limit: 350000 },
  { name: "Gamma", limit: 400000 },
  { name: "Beta", limit: 450000 },
  { name: "Alpha", limit: 500000 },
];

// Helper function to determine the name based on deposited amount

export const getLetterName = (deposit: number | null) => {
  if (!deposit) return "Phi";

  // Find the claim where the deposit is less than or equal to the limit
  for (let i = 0; i < letters.length; i++) {
    if (deposit <= letters[i].limit) {
      return letters[i].name;
    }
  }

  // If deposit is greater than all limits, return the highest claim (Alpha)
  return "Alpha";
};
