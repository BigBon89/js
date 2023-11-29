let mode = process.argv[2];
let method = process.argv[3];
let fIn = process.argv[4];
let fOut = process.argv[5];

const fs = require("fs");

try { 
	text = fs.readFileSync(fIn, "utf8");
} catch (err) {
	console.log("Error: file not found")
	return 0;
}

if (mode != "encode" && mode != "decode")
{
	console.log("Error: wrong argument 1, use encode/decode")
	return 0;
}
if (method != "escape" && method != "jump")
{
	console.log("Error: wrong argument 2, use escape/jump")
	return 0;
}

let count = 1;
let out = "";

let count2 = 0;
let temp = 0;
let temp2 = "";

if (method == "escape")
{
	for(let i = 0; i < text.length; i++)
	{
		if (mode == "encode")
		{
			if(text[i] == text[i+1] && count < 259)
			{
				count++;
			}
			else
			{
				if(count > 3 && text[i] != "#")
				{
					out += "#" + String.fromCharCode(count-4) + text[i];
				}
				else if(count > 0 && text[i] == "#")
				{
					out += "#" + String.fromCharCode(count-1) + text[i];
				}
				else
				{
					for (let j = 0; j < count; j++)
						out += text[i];
				}
				count = 1;
			}
		}
		else if (mode == "decode")
		{
			if(text[i] == "#")
			{
				if(text[i+2] != "#")
				{
					for(let j = 0; j < text[i+1].charCodeAt(0)+4; j++)
						out += text[i+2];
				}
				else
				{
					for(let j = 0; j < text[i+1].charCodeAt(0)+1; j++)
						out += text[i+2];
				}
				i+=2;
			}
			else
			{
				out += text[i];
			}
		}
	}
}
else if (method == "jump")
{
    for (let i = 0; i < text.length; i++) 
    {
    	if (mode == "encode")
		{
			temp2 = "";
	        count = 1;
	        if (text[i] == text[i + 1] && text[i] == text[i + 2]) 
	        {
	            while ((text[i] == text[i + 1]) && (count < 127)) 
	            {
	                count += 1;
	                i += 1;
	            }
	            out += String.fromCharCode(count) + text[i];
	        }
	        else 
	        { 
	            while (!((text[i] == text[i + 1]) && (text[i] == text[i + 2])) && (count < 128)) 
	            {
	                count += 1;
	                temp2 += text[i];
	                i += 1;
	            }
	            out += String.fromCharCode(count + 127);
	            out += temp2;
	            i -= 1;
	        }
    	}
    	else if (mode == "decode")
		{
			if (text[i].charCodeAt(0) < 128)
			{
				for (j = 0; j < text[i].charCodeAt(0); j++)
				{
					out += text[i+1];
				}
				i += 1;
			}
			else
			{
				for (j = 0; j < text[i].charCodeAt(0) - 127 - 1; j++)
				{
					out += text[i+1+j];
				}
				i += text[i].charCodeAt(0) - 127 - 1;
			}
		}
    }
}
fs.writeFileSync(fOut, out);