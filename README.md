# alloy-sdk
This is a tiny wrapper that makes a POST request to run an Alloy workflow.

## Usage

```
import {runAlloy} from 'alloy-sdk';

...

await runAlloy({
  // You can find this on Step 4 of the SDK block in your workflow
  workflowId : '<workflowId>',

  // required for authenticated workflows; found in Account Settings
  apiKey: '<apiKey>',

  // each parameterName should match what you entered in the Parameter fields on the SDK block
  parameters: {
    parameterName: 'Parameter Value'
  },

  // Set this flag to retrieve output from workflow
  getOutput:true,
});
```

## Workflow Output

You can add an SDK Output block to the end of your workflow to aggregate the data retrieved from
any of the other blocks in the workflow. If the `getOutput` option is set, then an object with this output will
be returned by the `runAlloy` function. Be aware that the `getOutput` flag can add a significant amount of latency, since the function will have to wait for the workflow to finish running.