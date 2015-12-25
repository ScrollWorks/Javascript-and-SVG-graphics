# Javascript-and-SVG-graphics
Collection of ultra lightweight, graphic widgets for the web. 


##PieChart.js
###Example
```
	new PieChart({
		container: document.getElementById("container"),
		data: [
			{value:20, col:"#ff6666", legend:"20 units"},
			{value:25, col:"#ff8c66", legend:"25 units"},
			{value:30, col:"#ffb366", legend:"30 units"},
			{value:55, col:"#ffd966", legend:"55 units"}]
		,
		onMouseEnterSlice: function(sliceData) {
			console.log("enter", sliceData.legend);	
		},	
		onMouseLeaveSlice: function(sliceData) {
			console.log("leave", sliceData.legend);	
		}	
	});
```
http://codepen.io/ScrollWorks/pen/PZGQZR


###Parameters
* **container**: HTML element in which the SVG will be inserted 
* **data**: Array of `<DataObject>` to be plotted in the piechart.
* **startingDeg** *(optional)* : Number of degrees on which the first slice will be plotted.
* **onMouseEnterSlice** *(optional)*: Function to be called when the users moves the mouse within a slice. It will receive a parameter with the information about the slice in which the mouse just entered.
* **onMouseLeaveSlice** *(optional)*: Function to be called when the user moves the mouse out of a slice. It will receive a parameter with the information about the slice the mouse just left.


###`<DataObject>` definition
`<DataObject>` is a JSON object containing at least the following properties:
  * **value**: Numeric value to be used in the computation of the graphic
  * **col**: Colour, in hexadecimal format to be used in this piece of data's slice.

Apart from this properties, it can contain any other defined by the user. All the properties will be passed to the `onMouseEnterSlice` and `onMouseLeaveSlice` functions. For instance, in our example we added the "legend" property.
