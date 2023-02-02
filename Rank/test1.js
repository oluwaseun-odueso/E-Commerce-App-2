const input = {a: 1, b: 2, c: 3}

function converObjectToArray (input) {
    const output = [];

    // Iterates over the input object
    for (let key in input) {
        output.push({ [key]: input[key] });
    };
    
    return output;
};

console.log(converObjectToArray(input));
