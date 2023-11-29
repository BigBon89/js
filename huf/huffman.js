// node huffman.js code in.txt table.txt out.txt
let mode = process.argv[2];
let fIn = process.argv[3];
let fTable = process.argv[4];
let fOut = process.argv[5];

const fs = require('fs'); 

let text;

try { 
	text = fs.readFileSync(fIn, "utf8");
} catch (err) {
	console.log("Error: файл ввода не найден")
	return 0;
}

if (mode != "code" && mode != "decode")
{
	console.log("Error: неверный аргумент 1, используйте code/decode")
	return 0;
}

let outStr = "";

let len;

if (mode == "code")
{
	function Tree(name, weight, code, child1, child2, flag)
	{
		this.name = name;
		this.weight = weight;
		this.code = code;
		this.child1 = child1;
		this.child2 = child2;
		this.flag = Boolean(flag);
	}

	let pos = 0;

	let a = [...new Set(text)].join('');

	let b = new Array;
	len = a.length;
	for (let i = 0; i < len; i++)
		b[i] = text.split(a[i]).length-1;

	len = b.length;
	let c = new Array(len);
	for (; pos < len; pos++)
		c[pos] = new Tree(a[pos], b[pos], "", null, null, 0);

	let mn = Number.MAX_VALUE;
	let savei = 0;
	let savej = 0;

	for (let pov = pos-1; pov > 0; pov--)
	{
		len = c.length;
		for (let i = 0; i < len; i++)
		{
			if (c[i].flag == 0)
			{
				let temp = Math.min(mn, c[i].weight);
				if (temp != mn)
				{
					mn = temp;
					savei = i;
				}
			}
		}
		mn = Number.MAX_VALUE;
		for (let j = 0; j < len; j++)
		{
			if (j != savei && c[j].flag == 0)
			{
				let temp = Math.min(mn, c[j].weight);
				if (temp != mn)
				{
					mn = temp;
					savej = j;
				}
			}
		}
		mn = Number.MAX_VALUE;
		c[savei].flag = c[savej].flag = 1;
		c[pos++] = new Tree(c[savei].name + c[savej].name, c[savei].weight + c[savej].weight, "", c[savei], c[savej], 0);
		savei = savej = 0;
	}
	let curObj = c[--pos];
	let tempCode = "";
	for (let i = 0; i < pos; i++)
	{
		while(1)
		{
			if (curObj.child1 && !curObj.child1.code)
			{
				curObj = curObj.child1;
				tempCode += "0";
			}
			else
			{
				if (curObj.child2 && !curObj.child2.code)
				{
					curObj = curObj.child2;
					tempCode += "1";
				}
				else
				{
					curObj.code = tempCode;
					curObj = c[pos];
					tempCode = "";
					break;
				}
			}
		}
	}

	let d = new Array();
	let tableStr = "";
	len = a.length;
	for (let i = 0; i < len; i++)
	{
		d.push(c[i]);
		tableStr += i != 0 ? "|" + c[i].name + "|" + c[i].code : c[i].name + "|" + c[i].code;
	}
	len = text.length;
	for (let i = 0; i < len; i++)
	{
		outStr += (c.find(temp => temp.name === text[i])).code;
	}
	fs.writeFileSync(fTable, tableStr);
	fs.writeFileSync(fOut, outStr);
	//console.log(c);
}
else
{
	let textTable;

	try { 
		textTable = fs.readFileSync(fTable, "utf8");
	} catch (err) {
		console.log("Error: файл таблицы не найден")
		return 0;
	}
	let temp = "";
	let arrayTable = textTable.split("|");
	for (let i = 0; i < text.length; i++)
	{
		temp += text[i];
		for (let j = 0; j < arrayTable.length; j++)
		{
			if (temp == arrayTable[j])
			{
				outStr += arrayTable[j-1];
				temp = "";
			}
		}
	}
	if(temp)
	{
		console.log("Error: невозможно произвести декодирование")
		return 0;
	}
	fs.writeFileSync(fOut, outStr);
}