angular.module('FoodParty').factory('colorService',['COLORS', function(COLORS) {

	var getColor = function() {
		return COLORS[Math.floor(Math.random()*13)]
		/*return {
			c1:  'black',
			c2:  'white'
		}*/
	};

    return {
        mixColors: function(btns, infos, listElements) {
        	var color = getColor();
            btns.forEach(function(entry) {
				var color = getColor();
			    entry.style.background = color.c1;
			    entry.style.color = color.c2;
			    entry.style.borderColor = color.c2;
			});
			
			infos.forEach(function(entry) {
				//var color = getColor();
			    entry.childNodes[3].style.background = color.c1;
			    entry.childNodes[3].style.color = color.c2;
			    entry.childNodes[3].style.borderColor = color.c2;
			    entry.childNodes[1].style.background = color.c2;
			    entry.childNodes[1].style.color = color.c1;
			    entry.childNodes[1].style.borderColor = color.c2;
			});
			listElements.forEach(function(entry) {
				var color = getColor();
			    entry.style.background = color.c1;
			    entry.style.borderColor = color.c2;
                entry.style.color = color.c2;
			});

            var menu = document.getElementById("menu");
            var color = getColor();
            menu.style.background = color.c1;
            menu.style.borderColor = color.c2;
            menu.style.color = color.c2;

			//document.getElementById("page").style.backgroundImage = getImage();
        }
    };
}]);