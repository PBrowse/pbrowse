const { spawn } = require('child_process');
const fs = require('fs');

if (fs.existsSync("node_modules")) {
	var clc = require("cli-color");
    const ls = spawn('npm', ['run', 'dev'] , { shell: true});
    ls.stdout.on('data', (data) => {
    	if(data.includes('electron .')){
    		console.log(clc.blue('electron.js proceess is starting!'));
    	}
    	if(data.includes('Object has been destroyed')){
    		console.log(clc.red('App closed'));
    		process.exit();
    	}  
	  console.log(clc.blue(`${data}`));
	});

	ls.stderr.on('data', (data) => {
	  console.error(`Error : ${data}`);
	});

	ls.on('close', (code) => {
	  console.log(`Developement Ended ${code}`);
	});
}else{
	var clc = require("cli-color");
	console.log(clc.green("Installing Packages"));
	const ls = spawn('yarn', ['i'] , { shell: true});
    ls.stdout.on('data', (data) => {  	
	  	console.log(clc.green(`${data}`));
	});

	ls.stderr.on('data', (data) => {
	  console.error(clc.red(`Error : ${data}`));
	});

	ls.on('close', (code) => {
	  console.log(`NPM packages has been installed re run "npm run runjs" ${code}`);
	});
}