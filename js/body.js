admixAPI.on('load', function(){ 
	admixAPI.init({
		'resize': [
			{
			'name': 'state-1',
			'width': '300px',
			'height': '600px'
			}
		]
	});
	function $(id){
		return document.getElementById(id);
	}

	/*
	document.body.onclick = function(){
		admixAPI.click('');
	};
	*/
	$('link_btn').onclick = function () {
		admixAPI.click('');
	};

	document.body.onselectstart = function() {
		return false;
	}
});