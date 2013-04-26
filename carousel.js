var Buffer = function(list) {
  if (list) {
    this.addItems(list);
  }
}
Buffer.prototype.unusedList = [];
Buffer.prototype.firstModel = null;
Buffer.prototype.lastModel = null;
Buffer.prototype.getNext = function(backward) {
  var forwardMost = 'lastModel';
  var backwardMost = 'firstModel';
  var item = item;
  if (backward) {
    forwardMost = 'firstModel';
    backwardMost = 'lastModel';
  }
  if (this.unusedList.length != 0) {
    item = new ItemModel(this.unusedList.shift());
    this[forwardMost] =  item;
    item.buffer = this;
  }
  else {
    item = this[backwardMost];
  }
  if (this[forwardMost] == null) {
    this[forwardMost] = item;
  }
  if (this[backwardMost] == null) {
    this[backwardMost] = item;
  }
  return item;
};
Buffer.prototype.addItems = function(incomingItems) {
  this.unusedList = this.unusedList.concat(incomingItems);
};
var ItemModel = function(data) {
  this.title = data.title;
  this.image = data.image;
};
ItemModel.prototype.title = '';
ItemModel.prototype.image = '';
ItemModel.prototype.next = null;
ItemModel.prototype.previous = null;
ItemModel.prototype.buffer = null;
ItemModel.prototype.setNext = function(model) {
  this.next = model;
};
ItemModel.prototype.setPrevious = function(model) {
  this.previous = model;
};
ItemModel.prototype.getNext = function(reverse) {
  var following = 'next';
  var previous = 'previous';
  if (reverse) {
    following = 'previous';
    previous = 'next';
  }
  if (this[following] != null) {
    return this[following];
  }
  else {
    var item = this.buffer.getNext(reverse);
    item[previous] = this;
    return this[following] = item;
  }
};
ItemModel.prototype.getPrevious = function() {
  return this.getNext(reverse = true);
};
var ItemDisplay = function(model, buffer) {
  this.currentModel = model;
  this.buffer = buffer;
  _.bindAll(this);
};
ItemDisplay.prototype.element = null;
ItemDisplay.prototype.imageElement = null;
ItemDisplay.prototype.titleElement = null;
ItemDisplay.prototype.currentModel = null;
ItemDisplay.prototype.buffer = null;
ItemDisplay.prototype.render = function() {
  if (this.imageElement == null) {
    this.imageElement = $('<img height="100px" width="auto" src="" alt="" />');
  }
  if (this.titleElement == null) {
    this.titleElement = $('<div class="title"></div>');
  }
  if (this.element == null) {
    this.element = $('<div class="item-model"></div>');
    this.element.append(this.imageElement);
    this.element.append(this.titleElement);
  }
  this.imageElement.attr('src', this.currentModel.image);
  this.imageElement.attr('alt', 'Image of ' + this.currentModel.title);
  this.titleElement.html(this.currentModel.title);
}
ItemDisplay.prototype.next = function() {
  this.currentModel = this.currentModel.getNext();
  this.render();
};
ItemDisplay.prototype.previous = function() {
  this.currentModel = this.currentModel.getPrevious(reverse = true);
  this.render();
};
var Controller = function(list) {
  this.displays = list;
  this.emitter = new EventEmitter2();
  _.extend(this, this.emitter);
};
Controller.prototype.displays = [];
Controller.prototype.emitter = {};
Controller.prototype.push = function(item) {
  this.emitter.on('next', item.next);
  this.emitter.on('previous', item.previous);
  this.displays.push(item);
};
$(document).ready(function() {
  var buffer = new Buffer(initialItems);
  var displays = new Controller([]);
  var $page = $('#page');
  var item = buffer.getNext();
  for (var i=0 ; i < 2 ; i++) {
    var display = new ItemDisplay(item, buffer);
    display.render();
    displays.push(display);
    $page.append(display.element);
    item = item.getNext()
  }
  var $nextButton = $('<div class="button"><a href="#">next</a></div>');
  var $previousButton = $('<div class="button"><a href="#">previous</a></div>');
  $page.append($nextButton, $previousButton);
  $nextButton.click(function() {
    displays.emit('next');
  });
  $previousButton.click(function() {
    displays.previous('previous');
    displays.emit('next');
  });
});


var initialItems = [
  {
    title: 'This is Batman.',
    image: 'images/batman.jpg'
  },
  {
    title: 'This is Superman.',
    image: 'images/superman.jpg'
  },
  {
    title: 'This is Wonder Woman.',
    image: 'images/wonderwoman.jpg'
  },
  {
    title: 'This is The Flash.',
    image: 'images/flash.jpg'
  },
  {
    title: 'This is Green Lantern.',
    image: 'images/greenlantern.jpg'
  },
  {
    title: 'This is Spiderman.',
    image: 'images/spiderman.jpg'
  },
  {
    title: 'This is Captain America.',
    image: 'images/captain.jpg'
  },
  {
    title: 'This is Captain Marvel.',
    image: 'images/marvel.jpg'
  }
];

