# react flex tabs
## Description
An npm package to fast create adaptive tabs navigation.
If tabs elements overflow width of screen, they are collapsed to 'More' dropdown button.

## Install
```js
$ npm install react-flex-tabs --save
```
##Live example
http://kinosura.kiev.ua/example/

## How to use

Here is a sample integration:
```js
<ReactFlexTabs tabsArray={[
    {
        name: "tab1",
        id: 1
    },
    {
        name: "tab2",
        id: 2
    }
]} >
```

## Development
* Run development server `npm run start`
* Run 'npm run prepublish' before final push
