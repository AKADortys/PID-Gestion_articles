const handdleError = (error, serviceName) => {
  console.log(`Erreur sur service :${serviceName}\n`, error);
  throw error.message;
};

module.exports = { handdleError };
