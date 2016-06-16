'use strict';
/*// SUPER CLASS
function Item(name) {
  this.name = name;
}

// SUB CLASS
function Weapon(name, damage) {
  this.damage = damage;
  Item.call(this, name); // Call super class
}

```
// EXTEND SUPER CLASS
Weapon.prototype = Object.create(Item.prototype, {
  constructor: {
    value: Item
  }*/
function Item (name){
    this._name = name;
  }
  /*get name(){
    return this._name;
  }
  set name(x){
    this._name = x;
  }
}*/
function Weapon (name, damage){
  Item.call(name);
    this._name = name;
  }

function Player (name){
    this._name = name;
  }



/*Player.prototype.checkPack = function(){

}*/