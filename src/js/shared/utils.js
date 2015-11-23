module.exports = {
  getSelectedOption : function (options) {
    var selected = [].filter.call(options, function (option) {
      return option.selected;
    }).shift();

    return selected.value;
  },
  genObjId : function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);

    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
      return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
	}
};