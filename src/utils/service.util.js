const handdleError = (error, serviceName) => {
  console.log(`Erreur sur service :${serviceName}\n`, error.errors);
  throw error;
};

module.exports = { handdleError };
