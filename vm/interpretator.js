const fs = require('fs'); 
const prompt = require("prompt-sync")({ sigint: true });

let fIn = process.argv[2];

try { 
	text = fs.readFileSync(fIn, "utf8");
} catch (err) {
	console.log("Error: file not finded")
	return 0;
}

let mem = new Array;
mem = text.split(/\r?\n/).join(' ').split(' ');

//for(i = 0; i < mem.length; i++)
	//console.log("Ячейка", i, mem[i])

//console.log(mem);

var i = 0;
while(mem[i] != "exit")
{
	if(mem[i] == "input")
		mem[mem[i+1]] = prompt("Input: ");
	else if(mem[i] == "output")
		console.log(mem[mem[i+1]]);
	else if(mem[i] == "mov")
		mem[mem[i+1]] = mem[i+2];
	else if(mem[i] == "movi")
		mem[mem[i+1]] = mem[mem[i+2]];
	else if(mem[i] == "sum")
		mem[mem[i+3]] = String(Number(mem[mem[i+1]]) + Number(mem[mem[i+2]]));
	else if(mem[i] == "sub")
		mem[mem[i+3]] = String(Number(mem[mem[i+1]]) - Number(mem[mem[i+2]]));
	else if(mem[i] == "jump")
		i = Number(mem[i+1]) - 1;
	else if(mem[i] == "jne")
	{
		if (Number(mem[mem[i+1]]) != Number(mem[mem[i+2]]))
			i = Number(mem[i+3]) - 1;
	}
	else if(mem[i] == "jg")
	{
		if (Number(mem[mem[i+1]]) > Number(mem[mem[i+2]]))
			i = Number(mem[i+3]) - 1;
	}
	i++;
}
//for(i = 0; i < mem.length; i++)
	//console.log("Ячейка", i, mem[i])