# Increment integer attribute in Sequelize JS
```js
import sequelize from 'sequelize';
import { databaseTable } from '/PATH/TO/models';

databaseTable
  .update({
    increment_attribute: sequelize.literal('increment_attribute + 1'),
  }, {
    // Query options
  })
  .then(() => {})
  .catch(err => next(err, req, res));
```

