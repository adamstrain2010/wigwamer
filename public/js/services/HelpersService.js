app.factory("helpers",function(){
	return {
		urlEncodeObject: function(resObj){
			var urlOutput = "?";
			for(var k in resObj){
				if(resObj.hasOwnProperty(k)){
					urlOutput += k + "=" +  resObj[k] + "&";
				}
			}
			urlOutput = urlOutput.substr(0, urlOutput.length - 1);
			return urlOutput;	
		}
	}
});