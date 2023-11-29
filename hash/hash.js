// node hash.js -c -t -n 5 b str.txt substr.txt
let mode = process.argv[process.argv.length-3];
let f1 = process.argv[process.argv.length-2];
let f2 = process.argv[process.argv.length-1];

const fs = require('fs'); 

let str;
let substr;

try 
{ 
	str = fs.readFileSync(f1, "utf8");
} 
catch (err) 
{
	console.log("Error: файл 1 не найден")
	return 0;
}
try 
{ 
	substr = fs.readFileSync(f2, "utf8");
} 
catch (err) 
{
	console.log("Error: файл 2 не найден")
	return 0;
}

if (mode != "b" && mode != "h1" && mode != "h2" && mode != "h3") 
{
	console.log("Error: указан неверный аргумент, используйте: b или h1 или h2 или h3");
	return 0;
}

function b() 
{
	let n = Number.MAX_VALUE;
	if (process.argv.includes("-n")) 
	{
		n = process.argv[process.argv.indexOf("-n")+1];
	}

	for (let i = 0; i < str.length - substr.length + 1; ++i) 
	{
		let c = 0;
		for (let j = 0; j < substr.length; ++j)
		{
			if (str[i+j] == substr[j]) 
			{
				++c;
			}
		}
		if (c == substr.length) 
		{
			if (n) 
			{
				process.stdout.write(String(i + " "));
				--n;
			}
		}
		c = 0;
	}
	console.log();
}
function h1() 
{
	let col = 0;
	
	let n = Number.MAX_VALUE;
	if (process.argv.includes("-n")) 
	{
		n = process.argv[process.argv.indexOf("-n")+1];
	}

	let substr_sum = 0;
	let str_sum = 0;
	for (let i = 0; i < substr.length; ++i)
	{
		substr_sum += substr[i].charCodeAt();
		str_sum += str[i].charCodeAt();
	}
	for (let i = 0; i < str.length - substr.length + 1; ++i) 
	{

		let flag = false;
		if (substr_sum != str_sum) 
		{
			flag = true;
		}

		if (i + substr.length != str.length) // чтобы не выйти за пределы массива str
			str_sum += str[i + substr.length].charCodeAt();
		str_sum -= str[i].charCodeAt();

		if (flag)
			continue;

		let c = 0;
		for (let j = 0; j < substr.length; ++j) 
		{
			if (str[i+j] == substr[j]) 
			{
				++c;
			}
		}
		if (c == substr.length) 
		{
			if (n) 
			{
				process.stdout.write(String(i + " "));
				--n;
			}
		}
		else 
		{
			if (process.argv.includes("-c")) 
			{
				++col;
			}
		}
	}
	console.log();
	if (process.argv.includes("-c")) 
	{
		console.log("Число коллизий:", col);
	}
}
function h2() 
{
	let col = 0;
	
	let n = Number.MAX_VALUE;
	if (process.argv.includes("-n")) 
	{
		n = process.argv[process.argv.indexOf("-n")+1];
	}

	let substr_sum = 0;
	let str_sum = 0;
	for (let i = 0; i < substr.length; ++i)
	{
		substr_sum += substr[i].charCodeAt() ** 2;
		str_sum += str[i].charCodeAt() ** 2;
	}
	for (let i = 0; i < str.length - substr.length + 1; ++i) 
	{

		let flag = false;
		if (substr_sum != str_sum) 
		{
			flag = true;
		}

		if (i + substr.length != str.length) // чтобы не выйти за пределы массива str
			str_sum += str[i + substr.length].charCodeAt() ** 2;
		str_sum -= str[i].charCodeAt() ** 2;

		if (flag)
			continue;

		let c = 0;
		for (let j = 0; j < substr.length; ++j) 
		{
			if (str[i+j] == substr[j]) 
			{
				++c;
			}
		}
		if (c == substr.length) 
		{
			if (n) 
			{
				process.stdout.write(String(i + " "));
				--n;
			}
		}
		else 
		{
			if (process.argv.includes("-c")) 
			{
				++col;
			}
		}
	}
	console.log();
	if (process.argv.includes("-c")) 
	{
		console.log("Число коллизий:", col);
	}
}
function h3() 
{
	let col = 0;
	
	let n = Number.MAX_VALUE;
	if (process.argv.includes("-n")) 
	{
		n = process.argv[process.argv.indexOf("-n")+1];
	}

	let substr_sum = 0;
	let str_sum = 0;
	for (let i = 0; i < substr.length; ++i)
	{
		substr_sum += substr[i].charCodeAt() * 2 ** (substr.length - i);
		str_sum += str[i].charCodeAt() * 2 ** (substr.length - i);
	}
	for (let i = 0; i < str.length - substr.length + 1; ++i) 
	{

		let flag = false;
		if (substr_sum != str_sum) 
		{
			flag = true;
		}

		if (i + substr.length != str.length) // чтобы не выйти за пределы массива str
			str_sum += str[i + substr.length].charCodeAt();
		str_sum -= str[i].charCodeAt() * 2 ** (substr.length);
		str_sum *= 2;

		if (flag)
			continue;

		let c = 0;
		for (let j = 0; j < substr.length; ++j) 
		{
			if (str[i+j] == substr[j]) 
			{
				++c;
			}
		}
		if (c == substr.length) 
		{
			if (n) 
			{
				process.stdout.write(String(i + " "));
				--n;
			}
		}
		else 
		{
			if (process.argv.includes("-c")) 
			{
				++col;
			}
		}
	}
	console.log();
	if (process.argv.includes("-c")) 
	{
		console.log("Число коллизий:", col);
	}
}

if (mode == "b") 
{
	if (process.argv.includes("-t")) 
	{
		var startTime = performance.now();
		b();
		var endTime = performance.now();
		console.log("Время работы:", Math.abs(startTime - endTime));
	} 
	else 
	{
		b();
	}
}
else if (mode == "h1") 
{
	if (process.argv.includes("-t")) 
	{
		var startTime = performance.now();
		h1();
		var endTime = performance.now();
		console.log("Время работы:", Math.abs(startTime - endTime));
	}
	else 
	{
		h1();
	}
} 
else if (mode == "h2") 
{
	if (process.argv.includes("-t")) 
	{
		var startTime = performance.now();
		h2();
		var endTime = performance.now();
		console.log("Время работы:", Math.abs(startTime - endTime));
	} 
	else 
	{
		h2();
	}
}
else if (mode == "h3") 
{
	if (process.argv.includes("-t")) 
	{
		var startTime = performance.now();
		h3();
		var endTime = performance.now();
		console.log("Время работы:", Math.abs(startTime - endTime));
	} 
	else 
	{
		h3();
	}
}