/*
 * GET home page.
 */
function formatFilePath(longPath){
	var pathArr = longPath.split('/public');
	if(pathArr.length >=2 && pathArr[0].length < longPath.length){
		return pathArr[pathArr.length -1];
	}
	return null;
}

module.exports = function (req, res) {
	var walk = require('walk');
	var jsFiles = [];
	var cssFiles = [];
	var pathArr = __dirname.split('\\');
	pathArr.pop();
	pathArr.pop();
	var projectPath= pathArr.join('/');
	var jsToImport = [];
	var jsRule = /.*\.js/;

	var productCodeWalker  = walk.walk(projectPath+'/public/src', { followLinks: false });

	productCodeWalker.on('file', function(root, stat, next) {
		// Add production code & style to the list of files
		if(stat.name.match(jsRule)){
			jsFiles.push(root + '/' + stat.name);
		}
		next();

/*
		var suffix = '.js';
		//var minFolder = 'minified';

		if(stat.name.indexOf(suffix, stat.name.length - suffix.length) !== -1
			//&& root.indexOf(minFolder, root.length - minFolder.length) !== -1){

			jsFiles.push(root + '/' + stat.name);
		}
		next();
*/
	});

	productCodeWalker.on('end', function() {
		for(var i=0; i<jsFiles.length; i++){
			var fileName = formatFilePath(jsFiles[i]);
			if(fileName){
				jsToImport.push(fileName);
			}
		}

		//setTimeout(function(){res.render('./src/platform/index/index', { title: '咨询业务管理 CBMS', jsFiles: jsToImport})}, 2000);
		res.render('./src/platform/index/index', { title: '咨询业务管理 CBMS', jsFiles: jsToImport});
	});
};