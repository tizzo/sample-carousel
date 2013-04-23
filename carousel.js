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
    console.log(forwardMost + ' is now ' + item.title);
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
  console.log('returning ' + item.title + ' from buffer');
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
  this.currentModel = this.currentModel.getPrevious();
  this.render();
};
var Controller = function(list) {
  this.displays = list;
};
Controller.prototype.displays = [];
Controller.prototype.next = function() {
  for (i in this.displays) {
    this.displays[i].next();
  }
};
Controller.prototype.previous = function() {
  for (i in this.displays) {
    this.displays[i].previous();
  }
};
Controller.prototype.push = function(item) {
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
    displays.next();
  });
  $previousButton.click(function() {
    displays.previous();
  });
});


var initialItems = [
    {
      title: 'This is Batman.',
      image: 'http://images4.wikia.nocookie.net/__cb20120113133430/batman/images/e/e9/000hctfysy2.jpg'
    },
    {
      title: 'This is Superman.',
      image: 'http://images1.wikia.nocookie.net/__cb20100819014815/superman/images/7/72/Superman.jpg'
    },
    {
      title: 'This is Wonder Woman.',
      image: 'http://amazingstoriesmag.com/wp-content/uploads/2013/02/wonderwoman.jpg'
    },
    {
      title: 'This is The Flash.',
      image: 'http://www.hyperborea.org/flash/bigimages/wally5.jpg'
    },
    {
      title: 'This is Green Lantern.',
      image: 'http://images2.wikia.nocookie.net/__cb20121223023426/bigbangtheory/images/f/ff/Gl.jpg'
    },
  ];

