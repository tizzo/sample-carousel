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
  this.unusedList = this.unusedList.concat(incomingItems);
};
$(document).ready(function() {
  var buffer = new Buffer(initialItems);
  console.log(buffer.getNext());
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

