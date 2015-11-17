module.exports = {
  getSelectedOption : function (options) {
    var selected = [].filter.call(options, function (option) {
          return option.selected;
    }).shift();

    return selected.value;
  }
};