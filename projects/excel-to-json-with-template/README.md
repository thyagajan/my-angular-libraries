# ExcelToJsonWithTemplate

An utility to convert Excel file to JSON with your desired template.

## What is does?
This library helps to convert the excel data to JSON with your own templete.
Currently it supports
* simple key value mapping.
* multiple Key value mapping.
* Object with multiple keys.
* List of keys (only column mapping is supported, row support to be added).
* List of Objects.
* Multiple Sheets/Tabs.
* complex JSON structure.

### Installaton
npm i excel-to-json-with-template

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
   




