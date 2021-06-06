 var PizZip = require('pizzip');
 var Docxtemplater = require('docxtemplater');
 var fs = require('fs');
 var path = require('path');


exports.replaceErrors = (key, value) => {
    if (value instanceof Error) {
        return Object.getOwnPropertyNames(value).reduce(function(error, key) {
            error[key] = value[key];
            return error;
        }, {});
    }
    return value;
}

exports.errorHandler=(error) => {
    console.log(JSON.stringify({error: error}, replaceErrors));

    if (error.properties && error.properties.errors instanceof Array) {
        const errorMessages = error.properties.errors.map(function (error) {
            return error.properties.explanation;
        }).join("\n");
        console.log('errorMessages', errorMessages);
        // errorMessages is a humanly readable message looking like this :
        // 'The tag beginning with "foobar" is unopened'
    }
    throw error;
}
// // The error object contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
// function replaceErrors(key, value) {
//     if (value instanceof Error) {
//         return Object.getOwnPropertyNames(value).reduce(function(error, key) {
//             error[key] = value[key];
//             return error;
//         }, {});
//     }
//     return value;
// }

// function errorHandler(error) {
//     console.log(JSON.stringify({error: error}, replaceErrors));

//     if (error.properties && error.properties.errors instanceof Array) {
//         const errorMessages = error.properties.errors.map(function (error) {
//             return error.properties.explanation;
//         }).join("\n");
//         console.log('errorMessages', errorMessages);
//         // errorMessages is a humanly readable message looking like this :
//         // 'The tag beginning with "foobar" is unopened'
//     }
//     throw error;
// }

// //Load the docx file as a binary
// var content = fs
//     .readFileSync(path.resolve('./pdf-form', 'AC.docx'), 'binary');

// var zip = new PizZip(content);
// var doc;
// try {
//     doc = new Docxtemplater(zip);
// } catch(error) {
//     // Catch compilation errors (errors caused by the compilation of the template : misplaced tags)
//     errorHandler(error);
// }

// //set the templateVariablles
// let a='eeee'

// doc.setData({
   
//     Matricule: a,
//     fullname: 'samy FERGUI',
//     photo:'x',
//     champs2:'x'
// });

// try {
//     // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
//     doc.render()
// }
// catch (error) {
//     // Catch rendering errors (errors relating to the rendering of the template : angularParser throws an error)
//     errorHandler(error);
// }

// var buf = doc.getZip()
//              .generate({type: 'nodebuffer'});

// // buf is a nodejs buffer, you can either write it to a file or do anything else with it.
// fs.writeFileSync(path.resolve('./pdf-form', 'ACNEW.docx'), buf);


// const docxConverter = require('docx-pdf');

//  docxConverter('./pdf-form/test.docx','./pdf-form/test.pdf', (err, result) => {
//    if (err) console.log(err);
//    else console.log(result); // writes to file for us
//  });








