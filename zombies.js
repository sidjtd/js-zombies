'use strict';
function Item(name){
    this.name = name;
  }
function Weapon (name, damage){
  Item.call(this, name);
  this.name = name;
  this.damage = damage;
  }
Weapon.prototype = Object.create(Item.prototype,{
});

function Food (name, energy){
    Item.call(this, name);
    this.name = name;
    this.energy = energy;
    this.restoreEnergy = function (){
      this.health += this.energy;
    };
  }
Food.prototype = Object.create(Item.prototype,{
});
/**
 * Class => Player(name, health, strength, speed)
 * -----------------------------
 * Creates a player in a zombie-infested world.
 *
 * @name Player
 * @param {string} name                    The player's name.
 * @param {number} health                  The player's health.
 * @param {number} strength                The player's strength.
 * @param {number} speed                   The player's speed.
 * @private {array} pack                   Default value should be empty.
 * @private {number} maxHealth             Default value should be set to `health`.
 * @property {string} name
 * @property {number} health
 * @property {number} strength
 * @property {number} speed
 * @property {boolean} isAlive             Default value should be `true`.
 * @property {Weapon/boolean} equipped     Default value should be `false`.
 * @property {method} getPack              Returns private variable `pack`.
 * @property {method} getMaxHealth         Returns private variable `maxHealth`.
 */
function Player (name, health, strength, speed){
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.speed = speed;
    var pack = [];
    var maxHealth = health;
    this.isAlive = true;
    this.equipped = false;
    this.getPack = function (){
      return pack;
    };
    this.getMaxHealth = function (){
      return this.health;
    };
}
/**
 * Player Class Method => checkPack()
 * -----------------------------
 * Player checks the contents of their pack.
 *
 * Nicely format and print the items in the player's pack.
 * To access the pack, be sure to use Player's getPack method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name checkPack
 */
  Player.prototype.checkPack = function (){
      var formatPack;
        if(this.getPack().length ===3){
          formatPack = this.getPack()[0] + this.getPack()[1] + this.getPack()[2] + this.getPack()[3];
      } else if (this.getPack().length ===2){
          formatPack = this.getPack()[0] + this.getPack()[1] + this.getPack()[2];
      } else if (this.getPack().length ===1){
          formatPack = this.getPack()[0] + this.getPack()[1];
      }
      console.log(formatPack);
      return formatPack;
    };
/**
 * Player Class Method => takeItem(item)
 * -----------------------------
 * Player takes an item from the world and places it into their pack.
 *
 * Player's pack can only hold a maximum of 3 items, so if they try to add more
 *   than that to the pack, return false.
 * Before returning true or false, print a message containing the player's
 *   name and item's name if successful.  Otherwise, print a message saying
 *   that the pack is full so the item could not be stored.
 * Note: The player is allowed to store similar items (items with the same name).
 * You should be able to invoke this function on a Player instance.
 *
 * @name takeItem
 * @param {Item/Weapon/Food} item   The item to take.
 * @return {boolean} true/false     Whether player was able to store item in pack.
 */
Player.prototype.takeItem = function(item){
      if(this.getPack().length>=3){
        console.log("Bag was full");
        return false;
      }if(this.getPack().length<3){
        console.log(item, "put into bag!");
        this.getPack().push(item);
        return true;
    }
  };
/**
 * Player Class Method => discardItem(item)
 * -----------------------------
 * Player discards an item from their pack.
 *
 * Use Array's indexOf method to check if the pack contains the item.
 * If an item is not found in the pack, indexOf returns -1.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf

 * If the item is in the pack, remove it from the pack using Array's splice method.
 * Print the player and item names and a message saying the item was discarded.
 * Return true for the successful discard.
 * Note: The splice method can also be used for array element replacement.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 *
 * If the item is not in the pack, return a message with the item name saying
 *   nothing was discarded since the item could not be found.
 * Return false in this case.
 *
 * You should be able to invoke this function on a Player instance.
 *
 * @name discardItem
 * @param {Item/Weapon/Food} item   The item to discard.
 * @return {boolean} true/false     Whether player was able to remove item from pack.
 */

Player.prototype.discardItem = function (item) {
      var index = this.getPack().indexOf(item);
        if(index >= 0){
          this.getPack().splice(index, 1);
        console.log("Item: ",item,"was discarded");
          return true;
        }else {
        console.log("Nothing was discarded");
        return false;
      }
  };

/**
 * Player Class Method => equip(itemToEquip)
 * -----------------------------
 * Player equips a weapon item.
 *
 * Player can only equip Weapon instances.
 * Player can only equip weapon items from their pack.
 *
 * If the player already has a weapon equipped (the equipped property
 *   is set to an Item), find the itemToEquip in the pack and replace
 *   it with the currently equipped item.  Then set the equipped property
 *   to the itemToEquip.
 * However, if the player doesn't already have a weapon equipped, simply
 *   equip that item and remove it from the pack.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equip
 * @param {Weapon} itemToEquip  The weapon item to equip.
 */

   Player.prototype.equip = function (item){
      if(item instanceof Weapon){
        var indexOfItem = (this.getPack().indexOf(item));
        if(indexOfItem > -1){

          if(this.equipped===false){
            this.getPack().splice(indexOfItem, 1);
            this.equipped=item;

          }else{
            this.getPack().splice(indexOfItem, 1);
            //var swap = this.equipped;
            //this.getPack().push(swap);
            this.getPack().push(this.equipped);
            this.equipped = item;
        }
      }
    }
/*      return false;*/
  };
/*Player.prototype.equip = function (itemToEquip) {
};*/

/**
 * Player Class Method => eat(itemToEat)
 * -----------------------------
 * Player eats a food item, restoring their health.
 *
 * Player can only eat Food instances.
 * Player can only eat food items from their pack.
 *
 * Remove itemToEat from the pack.
 * Increase the player's health by the food's energy amount, but do not
 *   exceed the player's max health.  If exceeded, simply set player's health
 *   to max health instead.
 * To access the player's max health, be sure to use Player's getMaxHealth method.
 * You should be able to invoke this function on a Player instance.
 *
 * @name eat
 * @param {Food} itemToEat  The food item to eat.
 */
  Player.prototype.eat = function (itemToEat){
      if (itemToEat instanceof Food){
        var index = this.getPack().indexOf(itemToEat);
        if(index >= 0){
          this.getPack().splice(index, 1);
          // if(this.getMaxHealth() >= this.health + itemToEat.energy){
            this.health += itemToEat.energy;
        if(this.health>this.getMaxHealth()){
            this.health = this.getMaxHealth();
        }
          // }
          // else {
          //   this.health = this.getMaxHealth();
        //   }
         }

      }
    };


/**
 * Player Class Method => useItem(item)
 * -----------------------------
 * Player uses an item from the pack.
 *
 * If the item is a weapon, the player should equip the item.
 * If the item is food, the player should eat the item.
 * You should be able to invoke this function on a Player instance.
 *
 * @name useItem
 * @param {Item/Weapon/Food} item   The item to use.
 */
Player.prototype.useItem = function (useItem){
  if (useItem instanceof Food) {
    this.eat();
  }
  if (useItem instanceof Weapon) {
    this.equip();
  }
};

/**
 * Player Class Method => equippedWith()
 * -----------------------------
 * Player checks their equipment.
 *
 * Prints the player's name and equipped weapon's name.
 * If nothing is equipped, prints a message saying so.

 * Also returns the equipped weapon's name or false if nothing is equipped.
 * You should be able to invoke this function on a Player instance.
 *
 * @name equippedWith
 * @return {string/boolean}   Weapon name or false if nothing is equipped.
 */
Player.prototype.equippedWith = function (){
  if(this.equipped===false){
    console.log("You have nothing... nothing in your life");
    return false;

  }else {console.log(this.name," and ",this.equipped.name);
    return this.equipped.name;
  }
};


function Zombie (health, strength, speed, maxHealth){
  this.health = health;
  this.strength = strength;
  this.speed = speed;
  this.isAlive = true;
  maxHealth = maxHealth;
}

function FastZombie (health, strength, speed, maxHealth){
  Zombie.call(this, health, strength, speed);
  this.health = health;
  this.strength = strength;
  this.speed = speed;
}

FastZombie.prototype = Object.create(Zombie.prototype,{
});

function StrongZombie (health, strength, speed, maxHealth){
  Zombie.call(this, health, strength, speed);
  this.health = health;
  this.strength = strength;
  this.speed = speed;
}

StrongZombie.prototype = Object.create(Zombie.prototype,{
});

function RangedZombie (health, strength, speed, maxHealth){
  Zombie.call(this, health, strength, speed);
  this.health = health;
  this.strength = strength;
  this.speed = speed;
}
RangedZombie.prototype = Object.create(Zombie.prototype,{
});

function ExplodingZombie (health, strength, speed, maxHealth){
  Zombie.call(this, health, strength, speed);
  this.health = health;
  this.strength = strength;
  this.speed = speed;
}
ExplodingZombie.prototype = Object.create(Zombie.prototype,{
});
/**
 * Sample run.
 * Feel free to edit this and check your game logic.
 */
function runGame() {
  // var player = new Player("Joan", 500, 30, 70);
  // var zombie = new Zombie(40, 50, 20);
  // var charger = new FastZombie(175, 25, 60);
  // var tank = new StrongZombie(250, 100, 15);
  // var spitter = new RangedZombie(150, 20, 20);
  // var boomer = new ExplodingZombie(50, 15, 10);

  // var shovel = new Weapon("shovel", 15);
  // var sandwich = new Food("sandwich", 30);
  // var chainsaw = new Weapon("chainsaw", 25);

  // player.takeItem(shovel);
  // player.takeItem(sandwich);
  // player.takeItem(chainsaw);
  // player.discardItem(new Weapon("scythe", 21));
  // player.discardItem(shovel);
  // player.checkPack();
  // player.takeItem(shovel);
  // player.checkPack();

  // player.equippedWith();
  // player.useItem(chainsaw);
  // player.equippedWith();
  // player.checkPack();

  // player.useItem(shovel);
  // player.equippedWith();
  // player.checkPack();

  // player.health = 487;
  // console.log("Before health: " + player.health);
  // player.useItem(sandwich);
  // console.log("After health: " + player.health);
  // player.checkPack();
}
