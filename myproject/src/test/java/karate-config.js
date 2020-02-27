function karateConfig() {
  var env = karate.env; // get system property 'karate.env'
  karate.log('karate.env system property was:', env);

  // if no env.. set it to QA
  if (!env) {
    env = 'qa';
  }

  karate.log('Running on environment: ', env);
  karate.configure('logPrettyRequest', true);
  karate.configure('logPrettyResponse', true);
  karate.configure('ssl', true);

  // Inside the config object you can set global variables. For example the baseUrl for your api. And you can also call other feature files
  // Example: call a login feature file first in the test run. Copy authorization and submit it as a global variable to the suite. Therefore Login will only work once. (Logouts should be in a `AfterClass`)
  var config = {
    env: env,
    baseUrl: 'http://jsonplaceholder.typicode.com'
  }
  // Functions or data to set for specific environments
  if (env === 'dev') {
    // customize
    // e.g. config.foo = 'bar';
  } else if (env === 'e2e') {
    // customize
  }
  return config;
}
