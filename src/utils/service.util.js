const handdleError = (error) => {
  console.log(`Erreur:\n`, error.errors);
  throw error;
};

module.exports = { handdleError };
