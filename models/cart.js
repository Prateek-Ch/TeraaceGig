module.exports = function Cart(oldCart){
  this.totalQty = oldCart.totalQty || 0;

this.items = oldCart.items || {};
this.totalQuantity = oldCart.totalQuantity || 0;
this.totalPrice = oldCart.totalPrice || 0;

this.add = function(item, id){
  var storedItem = this.items[id];
  if(!storedItem){
    storedItem = this.items[id] = {item: item, qty: 0, price: 0};
  }
  storedItem.qty++;
  storedItem.price = storedItem.item.price * storedItem.qty;
  this.totalQuantity++;
  this.totalPrice += storedItem.item.price;
}

this.reduceOne = function(id){
  this.items[id].qty--;
  this.items[id].price -= this.items[id].item.price;
  this.totalQuantity--;
  this.totalPrice -= this.items[id].item.price;

  if(this.items[id].qty<=0){
    delete this.items[id];
  }
}

this.removeAll = function(id){
  this.totalQuantity -= this.items[id].qty;
  this.totalPrice -= this.items[id].price;

  delete this.items[id];
}

this.generateArray = function(){
  var arr = []
  for(var id in this.items){
    arr.push(this.items[id]);
  }
  return arr;
}
};