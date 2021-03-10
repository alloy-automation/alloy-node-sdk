const https = require('https');

exports.runAlloy = (config) => {
  const { workflowId, apiKey, parameters } = config;
  const data = parameters ? JSON.stringify(parameters) : '{}';
  const options = {
    hostname: 'webhooks.runalloy.com',
    path: `/${workflowId}`,
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
  };
  if (apiKey) {
    options.headers.Authorization = `Bearer ${apiKey}`;
  }
  return new Promise((resolve, reject) => {
    const req = https.request(options, (res) => {
      const { statusCode } = res;

      if (statusCode !== 200) {
        reject(new Error('Failed to run workflow, check your configuration'));
      }

      res.on('end', () => {
        resolve();
      });

      res.on('error', () => {
        reject(new Error('Failed to run workflow, check your configuration'));
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    req.write(data);
    req.end();
  });
};
