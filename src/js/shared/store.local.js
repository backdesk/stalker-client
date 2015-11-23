module.exports = {
  init : function (key, fixtures) {
    this.key = key;

    if(!this.read()) {
      this.save(fixtures);
    }
  },

  save : function (data) {
    localStorage.setItem(this.key, JSON.stringify(data));
  },

  read : function () {
    return JSON.parse(localStorage.getItem(this.key));
  },

  find : function (id, seg) {
    var found, data = this.read();

    if(seg) {
      data = data[seg];
    }

    if(data && data.find) {
      found = data.find(function (item) {
        return item._id === id;
      });
    }

    return found;
  }
};