
var fs = require('fs');

var sourceFile = 'source/json/source.json';
var destinFile = 'destination/txt/destination.txt';
var xmlFile = 'destination/xml/final.xml';

fs.exists(sourceFile, function (exists){
  if(exists){
    fs.readFile(sourceFile, 'utf8', function (err, data) {

      console.log('\nSoucefile for JSON is: \'' + sourceFile + '\'');
  
      if (err) {

        console.log('\nError while reading the file' + err.message);
    
      } else {

          try {

            // This try block for the handling the JSON which may 
            // have the incorrect syntax which may cause the problem.
        
            var studentObject = JSON.parse(data);

              var Validator = require('jsonschema').Validator;
              var v = new Validator();

              // JSON schema has to create having two schemas as :-
              // 'jsonOject' for Student object &
              // 'jsonSchema' for actual JSON input.

              var jsonObject = {
                  "id": "/StudentObject",
                  "type": "object",
                  "properties": {
                    "id": {"type": "integer", "minimum": 1, "required": true},
                    "fName": {"type": "string", "required": true},
                    "lName": {"type": "string", "required": true},
                    "score": {"type": "integer", "minimum": 1, "required": true},
                  },
                };

              var jsonSchema = {
                "id": "/JsonArrayObject",
                "type": "object",
                "properties": {
                  "students": {
                    "type": "array",
                    "items": {"$ref": "/StudentObject", "minimum": 1, "required": true}
                  }
               }
              }; 
  
              v.addSchema(jsonObject, '/StudentObject');
              var result = v.validate(studentObject, jsonSchema);
  
              if(result.errors.length){
                // If JSON is not having expected format
                // we have to tell user about that and can't
                // go further. 
                console.log("Input JSON is not having the required format " + result.errors);
              } else {

                fs.exists(destinFile, function (exists) {
          
                    if(exists) {

                      // Warning to user about the 
                      //.txt file already file exists.
                      console.log('\nFile named \'' + destinFile + '\' already exists\n\n\'Going to replace it\'');

                    }
                      // Creating .txt file.

                      fs.writeFile(destinFile, 'First Name | Last Name | Score \n', function (err) {

                      if(err){
                      // We cannot write to the file so that we are here.
                      // we have to notify that about user.
                        console.log('\nWe can not write to the file \"' + err + '\"');
                      } else {
                        /**
                         * Sorts the student array in descending order of the scores
                         * @param {score of one} a 
                         * @param {score of another} b
                         * @return {difference of scores} this is used by sort function to compare those scores.
                         * Finally the sorted array of object is created.
                         */
                          studentObject.students = studentObject.students.sort(function (a, b) {
                            return b.score - a.score;
                          });

          
                          for (var i = 0; i < studentObject.students.length; i++) {
                            fs.appendFile(destinFile, studentObject.students[i].id + ' | ' 
                              + studentObject.students[i].fName + ' | '
                              + studentObject.students[i].lName + ' | '
                              + studentObject.students[i].score + '\n', function (err) {
                              if (err) { 
                                console.log('\nError while appending the file ' + err.message)
                              }
                            });
                          }

                          console.log('\nData written to file: \'' + destinFile + '\'');

                          fs.exists(xmlFile, function (exists) {
      
                            if(exists) {
                            // Warning to user about the 
                            //.xml file already file exists.
                              console.log('\nFile named \'' + xmlFile + '\' already exists\n\n\'Going to replace it\'');

                            }

                            // Creating .xml file.

                            var rootElement = require('xmlbuilder');

                            rootElement = rootElement.create('students');

                            var stud;// for student element
                            var studName; // for name element
                            var studScore; // for score element
    
                            for (i = 0; i < studentObject.students.length; i++) {
                              stud = rootElement.ele('student', {'id': studentObject.students[i].id});
    
                              studName = stud.ele('name', studentObject.students[i].fName + ' '
                              + studentObject.students[i].lName);
     
                              studScore = stud.ele('score', studentObject.students[i].score);
                            }
    
                            var xmlString = rootElement.end({ pretty: true, indent: '  ', newline: '\n' });
   
                            fs.writeFile(xmlFile, xmlString, function (err){
                              if (err) {
                                console.log('\nWe can not generate the XML file \"' + err + '\"');
                              } else {
                                  console.log('\nData written in XML file : \'' + xmlFile + '\'');
                              }
                            });


                        });

                        }
                      });
                });

          }
      }
      catch(err) {
        console.log('\nError while parsing the JSON file ' + err.message);
      }
    }
});

  } else {
    console.log('\"Source file does not exists\"');
  }
});

