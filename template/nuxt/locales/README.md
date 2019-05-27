# LOCALES

This directory contains your Application Languages.
The locals lets you add new languages to your VueFront app. Please follow the naming format (ex. en-gb)

Then add the newly created language js file to your vuefront.config.js

```js
locales: {
    'en-gb': ['vuefront/lib/locales/en-gb.js'], //this will load a compiled languaghe file for English
    'ru-ru': ['~/locales/ru-ru'] //this will load ~/locales/ru-ru/index.js and will compile on build local Russian transaltion
  },
```

More informations about the usage of this directory in the documentation:
https://vuefront.com

**This directory is not required, you can delete it if you don't want to use it.**
