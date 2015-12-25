var PieChart = (function () {
    console.log("PieChart developed by ScrollWorks, http://scroll.works");
    function pieChart(options) {
    	//Process options - add them to our object instance
    	Object.keys(options).forEach(function(optionName) {
    		this[optionName]=options[optionName];
    	}.bind(this));
    	//Create SVG object and insert it in the container
    	this.svg=insertSVG.call(this);
        //For each piece of data, work out the degrees that it's  slice needs to cover
        getDegrees.call(this);
    	//Initialize variables  (trigonometry knowledge required to understand calculations)
    	this.aggArch=(this.startingDeg?this.startingDeg*2 * Math.PI/360:0);
    	this.currentPoint = {
            x: 50 + 50*Math.cos(this.aggArch),
            y: 50 - 50*Math.sin(this.aggArch)
        };

        //Create the archs for the different pieces of data
	    this.data.forEach(plot.bind(this));
    }

    function insertSVG() {
        var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
        svg.setAttribute("class", "pieChart");
        svg.setAttribute("viewBox", "0 0 100 100");
        svg.setAttribute("preserveAspectRatio", "none");
        svg.setAttribute("height", "100%");
        svg.setAttribute("width", "100%");
        this.container.appendChild(svg);
        return svg;
    }

    function getDegrees() {
		//Let's add up all the values
        var sum = this.data.reduce(function (prev, current) {
            return (prev.value?prev.value*1.0:prev) + current.value*1.0;
        });
        //and find out the rads for 1 unit
        var factor = 2 * Math.PI / sum;
        //so that we can workout the number of rads for each piece of data
        this.data.forEach(function (pieceOfData, index) {
            this.data[index]["degrees"]=factor*pieceOfData.value;
        }.bind(this));
    }

    function plot(pieceOfData,index) {
    	//Create path, set its attributes and add it to our SVG
        var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.setAttribute("fill",pieceOfData.col);
        path.setAttribute("d",calculatePath.call(this, pieceOfData.degrees, index));
        path.setAttribute("class","sector");
        this.svg.appendChild(path);
		
        //Attach event listeners
        if(this.onMouseEnterSlice) 
       		path.addEventListener("mouseenter",function() {
        		this.onMouseEnterSlice.call(window, pieceOfData);
        	}.bind(this));
        	
        if(this.onMouseLeaveSlice) 
       		path.addEventListener("mouseleave",function() {
        		this.onMouseLeaveSlice.call(window, pieceOfData);
        	}.bind(this));        	
    }

    function calculatePath(degreesInc,index) {
    	//Knowledge of trigonometry and SVG archs are required to understand this bit.
        this.aggArch += degreesInc;
        var large=(degreesInc>Math.PI?1:0), sweep = 0;
        var endPoint = {
            x: 50 + 50 * Math.cos(this.aggArch),
            y: 50 - 50 * Math.sin(this.aggArch)
        };
        var d = "M" + this.currentPoint.x + " " +this.currentPoint.y + " "
        + "A " + 50 + " " + 50 + " 1 " + large + " " + sweep + " " + endPoint.x + " " + endPoint.y
        + " L " + 50 + " " + 50 + " Z";
        this.currentPoint = endPoint;
        return d;
    }
    return pieChart;
})();
//Developed by ScrollWorks.   http://scroll.works
