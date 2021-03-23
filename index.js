const axios = require('axios');

exports.runAlloy = async (config) => {
  const { workflowId, apiKey, parameters, getOutput } = config;
  const data = parameters ? parameters : {};

  if (!!getOutput && !apiKey) {
    throw new Error('API Key is required to retrieve output from workflow');
  }

  const options = {
    url: !!getOutput
      ? `https://api.runalloy.com/webhook/${workflowId}`
      : `https://webhooks.runalloy.com/${workflowId}`,
    method: 'POST',
    data,
  };

  if (apiKey) {
    options.headers = { Authorization: `Bearer ${apiKey}` };
  }

  if (getOutput) {
    //long poll for results
    const initialResult = await axios.request(options);
    if (initialResult.data && initialResult.data.executionId) {
      const pollingOptions = {
        url: `https://api.runalloy.com/sdk/output/${initialResult.data.executionId}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      };
      //don't poll indefinitely
      for (let i = 0; i < 10; i++) {
        const pollResult = await axios.request(pollingOptions);
        if (pollResult.data && pollResult.data.data) {
          return pollResult.data;
        }
      }
    } else {
      //can't retrieve data
      throw new Error(
        'Encountered an error while attempting to run your workflow'
      );
    }
  } else {
    //return immediately
    await axios.request(options);
  }
};
