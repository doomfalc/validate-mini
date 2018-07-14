# validate-mini

Minimalistic validation library. Designed to be as little verbose as possible.

## Usage

Import the module

```js
const { validate } = require("validate-mini");
```

Define a validation schema

```js
const schema = {
    firstName: /[A-Z][a-z]{2,20}/,
    lastName: /[A-Z][a-z]{2,20}/,
};
```

Execute the validate() function, supplying your schema and the object to validate.

```js
const validationResult = validate(schema, request.body);
```

The resulting object contains an isValid Boolean property. It indicates whether a validation error has been found or not, and messages for all properties that failed.

```js
// No validation error
{ isValid: true }

// Validation errors
{
    isValid: false,
    firstName: "Invalid format",
    lastName: "Invalid format"
}
```

## Supported validation rules

### Specific String, Number or Boolean

To validate against specific String, Number or Boolean values:

```js
const schema = {
    acceptTerms: true,
    verificationText: "I accept",
    rejectionCount: 0
};
```

### RegExp

To validate against a RegExp:

```js
const schema = {
    age: /^[1-9]{1, 2}$/
};
```

### Function

For added flexibility, functions can be used for custom validation. Functions should either return a Boolean, or an object with an isValid Boolean property.

```js
const moment = require("moment");

const schema = {
    dob: value => moment().diff(moment(value), "years") >= 18
};
```

Functions take at least one argument as parameter. This parameter represents the value of the corresponding property on the object to validate.

#### Checking against other properties

Functions can also take a second argument, representing the whole object being validated. This allows checking several properties in one function.

```js

const schema = {
    password: /[A-Z]{8,24}/,
    confirmPassword: (value, input) => value === input.password,
};
```

### Arrays

To apply validation rules on Array items:

```js
const schema = {
    aliases: [
        // use any rule you want: RegExp, func, etc
        /[A-Z][a-z]{2,20}/
    ]
}
```

### Objects

Rules can be combined to form complex objects:

```js
const schema = {
    user: {
        name: /[A-Z][a-z]{2,20}/,
        id: /[a-f0-9]{8}/,
        options: {
            // ...
        }
    }
}
```

## Utils

The library comes with a handful of built-in functions to help defining simple validation schemes.

To access the util functions:

```js
const { validate, utils } = require("validate-mini");

const schema = {
    // Validate type of value
    description: utils.is(String),
    // Validate min and max length of Number value
    freeText: utils.length(0, 255),
    // List of acceptable values (enum like)
    status: utils.oneOf("success", "failure", "pending", "canceled"),
    // Validate min and max of Number value
    amount: utils.range(0, 100),
}
```

## Optional properties

By default, all rules require matching input. To mark rules as optional, use the `optional(<rule>)` function together with any rule you like.

```js
const { validate, optional, utils } = require("validate-mini");

const schema = {
    middleName: optional(utils.is(String))
};
```

## Chain several rules

Apply a sequence of rule using the `pipe(<rules>)` function:

```js
const { validate, pipe } = require("validate-mini");

const schema = {
    password: pipe(/[A-Za-z]/, /[0-9]/, /.{8,255}/)
};
```