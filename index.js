function searchClass1() {
  this.getData = function() {
    return instances[0].chipsData;
  };
  this._init  = function( data ){
      searchBar( data['elem'], data['placeholder'], data['data'] );
  }
}
searchClass1.prototype.counter = 0;
searchClass1.prototype.temp_boolean = false;
chipSearch = new searchClass1();
$(".chips-placeholder").chips({
  placeholder: "Enter a tag",
  secondaryPlaceholder: "+Tag"
});

function searchBar(elem, placeholder, data) {
  this.elem = elem;
  this.enterplaceholder = placeholder;
  this.temp_data = {};
  for (i in data) {
    this.temp_data[i] = null;
  }

  this.elems = document.querySelectorAll(".chiptag");

  instances = M.Chips.init(this.elems, {
    autocompleteOptions: {
      data: temp_data,
      limit: 30,
      minLength: 0
    },
    placeholder: enterplaceholder,
    secondaryPlaceholder: ' ',
    onChipAdd: function() {
      var chips = instances[0].chipsData;
      if (chipSearch.counter == 1) {
        instances[0].autocomplete.options.data = temp_data;
        if( !this.temp_boolean ){
          var chipData = [
            chips[chips.length - 1].tag,
            chips[chips.length - 2].tag
          ];
          M.Chips.getInstance(elem).deleteChip(chips.length - 1);
          M.Chips.getInstance(elem).deleteChip(chips.length - 1);
          this.temp_boolean = !this.temp_boolean;
          chipSearch.counter = 1;
          M.Chips.getInstance(elem).addChip({
            tag: chipData[1] + ": " + chipData[0]
          });
        } 
        chipSearch.counter = 0;
        this.temp_boolean = false;
      }
      else {
        this.temp_boolean = false;
        this.valueOfSelectedChip = chips[chips.length - 1].tag;
        $(elem).find(".chip").last().find(".close").remove();
        for (var i in data) {          
          if (i == this.valueOfSelectedChip) {
            var obj = {};
            data[i].forEach(function(data2) {
              obj[data2] = null;
            });
            instances[0].autocomplete.options.data = obj;
          }
        }
        chipSearch.counter = 1;
      }
    },
    onChipDelete: function() {
      chipSearch.counter = 0;
        if (chipSearch.counter % 2 == 0) {
          instances[0].autocomplete.options.data = temp_data;
        }
        else {
          instances[0].autocomplete.options.data = temp_data;
        }
    }
  });
}
