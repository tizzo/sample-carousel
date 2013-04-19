var Buffer = function(list) {
  if (list) {
    this.addItems(list);
  }
}
Buffer.prototype.unusedList = [];
Buffer.prototype.getNext = function() {
  return this.unusedList.shift();
};
Buffer.prototype.addItems = function(incomingItems) {
  this.unusedList.concat(incomingItems);
};
$(document).ready(function() {
});
