var fs = require('fs');
/*delete files*/
delFile("downloads.json");
delFile("appInit.json");
/*files*/
function delFile(filePath){
	try{
		fs.unlinkSync(filePath);
	}catch(e){
		return "false";
	}
}