import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelToJsonWithTemplateService {
  private subject:Subject<any>;

  private inputArray;
  private outputJson:{} = {};
  private templateJson:{};
  private readonly contentKey = 'content';
  private readonly contentIndex = 0;
  private  processedIndex = -1;
  private delimiter;
  private tabNamesIndex = {};
  constructor() { }

  public convertToJson(input:Excel2JsonInput):Subject<any>{
    this.subject = new Subject();
    if(!input || !input.excelFileHandler){
      console.error("Invalid input, no file handle found");
    }
    this.processJson(input);
    return this.subject;
  }

  private processJson(input:Excel2JsonInput){
    const reader = new FileReader();
    reader.readAsBinaryString(input.excelFileHandler);
    reader.onload = () => {
      const content = this.getTheContent(reader.result);
      //console.log("content is ",content);
      if(input.jsonTemplate){
        const output = this.mapJsonWithDelimiter(input.jsonTemplate,content,input.delimiter);
        this.subject.next(output);
      }else{
        this.subject.next(content);
      }  
    }
  }

  private getTheContent(binaryData){
    const workbook = XLSX.read(binaryData, {type:'binary', cellDates: true, cellStyles:true});
    const sheetNameList = workbook.SheetNames;
    let jsonPageArray = [];
      sheetNameList.forEach(function(sheet) {
        const jsonPage = {
          name: sheet,
          content: XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
        };

        jsonPageArray.push(jsonPage);
      });
    return jsonPageArray;
  }

  private mapJsonWithDelimiter(template, data, templateDelimiter){
   
    this.delimiter = templateDelimiter;
    if(!data &&data.length <1)
    {
      console.info("Data is empty");
      return;
    }
    this.inputArray = data;
    this.templateJson = template;
    this.mapTabNameswithIndex();
    this.processData();
    //console.log("output is ",this.outputJson);
    return this.outputJson;
    
  }

  private mapTabNameswithIndex(){
    let data = this.inputArray;
    //console.log("input data is ",data);
    for(let i=0;i<data.length;i++){
      let tabName = data[i].name;
      this.tabNamesIndex[tabName] = i; 
    }
  }

  private processData(){
    this.outputJson = {};
   
    Object.entries(this.templateJson).forEach(([key,value]) => {
     // console.log("key is :",key);
     // console.log("type of value :",typeof value);
      this.setValue(key, value,this.outputJson,this.contentIndex);
    });

  }

  private getTabNameIndexAndHeaderName(templateStr){
    let info =undefined;
    let splitVals = templateStr.split(this.delimiter);
    if(splitVals && splitVals.length > 1){
      info = {};
      if(splitVals[0] === ''){
        info.index = 0;
      }else{
        info.index = this.tabNamesIndex[splitVals[0]];
      }
      info.header = splitVals[1]; 
    }
    return info;

  }

  private processString(key,value,output,index){
    //console.log("processingstring "+key+"-"+value+"-"+output+"-"+index);
    const templateInfo = this.getTabNameIndexAndHeaderName(value);
    //console.log("template info s ",templateInfo);
    if(templateInfo){
      let tabNameIndex = templateInfo.index;
      this.processedIndex = templateInfo.index;
      let headerName = templateInfo.header; 
      try{
        output[key] = this.inputArray[tabNameIndex][this.contentKey][index][headerName]; 
      }catch(error){
        console.info("Error processing tag", key);
        console.error(error);
      }
    }
  }

  private processArray(key,value,output,index){ //works only for whole tabs
    let valueArr = [];
    console.log("key and value is ",key+'-'+value);
    if(value.length > 0){
      let i = 0
      let arrSize = 0;
      do{
        this.setValue(key,value[0],output,i);
        valueArr.push(output[key]);
        arrSize = this.inputArray[this.processedIndex][this.contentKey].length;
        i++;
        //console.log("array size is ",arrSize);
      }while(i<arrSize);

    }
    output[key] = valueArr;
  }

  private processObject(key,value,output,index){
    output[key] = {};
      Object.entries(value).forEach(([key1,value1]) => {
        //console.log("key is :",key1);
        //console.log("type of value :",typeof value1);
        this.setValue(key1, value1,output[key],index);
      });
  }

  private setValue(key,value,output,index){
    output[key] =value; 
    if(typeof value == "string"){ //process strings
      //console.log("processing string ",value);
      this.processString(key,value,output,index);
    }else if(Array.isArray(value)){ //process arrays
      //console.log("processing array ",value);
      this.processArray(key,value,output,index);
    }else if(typeof value == "object"){ //process objects
      //console.log("processing objects ",value);
      this.processObject(key,value,output,index);
    }
  }

}

export class Excel2JsonInput{
  excelFileHandler:File;
  jsonTemplate?:Object;
  delimiter?:string = '$';
}

