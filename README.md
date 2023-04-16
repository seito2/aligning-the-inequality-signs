# eslint-plugin-aligning-inequality-signs

## Installation

```shell
npm i -D eslint-plugin-aligning-inequality-signs
```


in .eslintrc.js

```js
"plugins": [  
  "aligning-inequality-signs",
  ...
],
"rules": {
  "aligning-inequality-signs/aligning-inequality-signs": "error",
}
```

## Example

```ts
let left = 0;
let right = 2;

// This should be left < right. --> Error!!!
if (right > left) {

}

↓
// ok!
if (left < right) {

}
```