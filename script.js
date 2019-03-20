;(function (_window, _document) {
    var upSymbol = '&#x2B06;';
    var downSymbol = '&#x2B07;';

    var ListObj = function() {
        var _list = [];
        var _fnList = [];
        var _isASC = false;

        var trigger = function() {
            _list.sort();
            if(!_isASC) _list.reverse();

            _fnList.map(function (fn) {
                fn(_list);
            });
        };

        this.addItem = function(elem) {
            _list.push(elem);
            trigger();
        };
        this.removeAt = function(index) {
            _list.splice(index, 1);
            trigger();
        };
        this.switchSorting = function() {
            _isASC = !_isASC;
            trigger();
        };
        this.isASC = function() {
            return _isASC;
        };
        this.onChange = function(fn) {
            _fnList.push(fn);
        };
    };

    function trim(x) {
        return x.replace(/^\s+|\s+$/gm,'');
    }

    function render(listElem, list) {
        var elements = '';
        list.map(function (elem) {
            elements += '<li>' + elem + ' <button class="clear-button">[delete]</button></li>';
        });
        return elements;
    }

    _window.addEventListener('DOMContentLoaded', function () {
        
        var sortBtn = _document.querySelector('#sortBtn');
        var inputBtn = _document.querySelector('#inputBtn');
        var inputField = _document.querySelector('#inputField');
        var listElem = _document.querySelector('#list');
        var listObj = new ListObj();

        listObj.onChange(function (list) {
            listElem.innerHTML = render(listElem, list);
            onInputChangeFn();
        });

        var onInputChangeFn = function () {
            var value = trim(inputField.value);
            inputBtn.disabled = !inputField.value;
        };

        inputField.addEventListener('keyup', onInputChangeFn);

        listElem.addEventListener('click', function(e) {
            if(e.target !== undefined && e.target.tagName.toLowerCase() === 'button') {
                var listItem = e.target.parentNode; //closest('li');
                var index = Array.prototype.indexOf.call(listElem.childNodes, listItem);
                if(index >= 0) listObj.removeAt(index);
            }
        });

        inputBtn.addEventListener('click', function() {
            var value = trim(inputField.value);
            if (value) {
                listObj.addItem(value);
                inputField.value = '';
                onInputChangeFn();
            }
        });

        sortBtn.addEventListener('click', function onSortBtnClick () {
            listObj.switchSorting();
            sortBtn.innerHTML = 'ABC';

            if(listObj.isASC()) {
                sortBtn.innerHTML += downSymbol;
            } else {
                sortBtn.innerHTML += upSymbol;
            }

            return onSortBtnClick;
        }());
    });
  })(window, document);