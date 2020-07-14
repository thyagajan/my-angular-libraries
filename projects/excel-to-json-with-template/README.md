# ExcelToJsonWithTemplate

An NPM library which can be used in Angular project to convert Excel file to JSON with your desired custom template.

## What it does?
This library helps to convert the excel data to JSON with your own templete.
Currently it supports
* simple key value mapping.
* multiple Key value mapping.
* Object with multiple keys.
* List of keys (only column mapping is supported, row support to be added).
* List of Objects.
* Multiple Sheets/Tabs.
* complex JSON structure.

### Installation
npm i excel-to-json-with-template

### User Interface
An simple user interface which is developed in Angular framework available in the below link. This project can be imported and used on your hosting server.
https://github.ibm.com/tnagaraj/excel-to-json

### Usage
In your app component,
1. Import the libraray
`import {ExcelToJsonWithTemplateService,Excel2JsonInput} from 'excel-to-json-with-template';`
2. Inject to your constructor
`constructor(private excel2JsonService:ExcelToJsonWithTemplateService)`
3. Set the Input

`const jsonInput:Excel2JsonInput = {
      excelFileHandler : this.file,
      jsonTemplate : this.template?JSON.parse(this.template):undefined,
      delimiter: this.delimiter
    }`
   * excelFileHandler is the File handle object which you get it after clicking on import file button.
   * jsonTemplate is an optional template(just to give you more freedom), which you want to convert your excel file to
   * delimiter is an optional parameter that you use in your template. By default it is '$'.
4. Call the library code to convert your excel to JSON

 `this.excel2JsonService.convertToJson(jsonInput).subscribe(jsonData => {
      console.log("received data ",jsonData);
    });`
   

## Use Cases
### Mapping without a Template
![Mappingwithoutatemplate](https://www.thyagajan.in/myassets/excel-json/images/no_template.png)

### Simple Key Value Mapping
![KeyValueMapping](https://www.thyagajan.in/myassets/excel-json/images/simple_key_mapping.png)
### Multiple Key Value Mapping
![MultipleKeyValueMapping](https://www.thyagajan.in/myassets/excel-json/images/multiple_key_mappings.png)

### Multiple Keys as Object
![MultipleKeysasObject](https://www.thyagajan.in/myassets/excel-json/images/mappings_as_object.png)

### Simple List
![SimpleList](https://www.thyagajan.in/myassets/excel-json/images/simple_list.png)

### List Of Objects
![listOfObjects](https://www.thyagajan.in/myassets/excel-json/images/List_of_objects.png)

### Multiple Tab/Sheets
![MultipleTabExcel](https://www.thyagajan.in/myassets/excel-json/images/different_tab_excel.png)

![MultipleTabJSON](https://www.thyagajan.in/myassets/excel-json/images/different_tab_json.png)

### Real Life Example
![RealLifeExampleExcel](https://www.thyagajan.in/myassets/excel-json/images/imdb_excel.png)
![RealLifeExampleTemplate](https://www.thyagajan.in/myassets/excel-json/images/imdb_template.png)
![RealLifeExampleOutput](https://www.thyagajan.in/myassets/excel-json/images/imdb_output.png)






