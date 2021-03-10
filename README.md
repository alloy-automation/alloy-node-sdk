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
  }
});
```