const input = [{a: 1}, {b: 2}, {c: 3}];

function convertArrayToObject (input) {
    const output = {}
    for (let i = 0; i < input.length; i++) {
        Object.assign(output, input[i]);
    };

    return output;
};

console.log(convertArrayToObject(input))