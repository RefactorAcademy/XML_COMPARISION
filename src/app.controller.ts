import { Controller, Post, UseInterceptors, UploadedFiles, HttpException, HttpStatus } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { parseString } from 'xml2js';
import { readFileSync, writeFileSync } from 'fs';

@Controller()
export class AppController {
  @Post()
  async compareXmlFiles() {
    try {
      const xmlFile1 = readFileSync("XML_1.xml", 'utf-8');
      const xmlFile2 = readFileSync("XML_1.xml", 'utf-8');
  
      let map = {};
      parseString(xmlFile1, (err, result) => {
        this.compareXmlFilesHelper(result, map);
      });
  
      let finalResult;
      parseString(xmlFile2, (err, result) => {
        this.updateXmlFile(result, map);
        finalResult=result
        writeFileSync('updatedXmlFile.xml', JSON.stringify(result));

      });
  
  
      return { message: 'XML file comparison is complete. Check the updatedXmlFile.xml for the result.',result:finalResult };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  
  compareXmlFilesHelper(element, map) {
    for (const key in element) {
      if (typeof element[key] === 'object') {
        map[key] = '1';
        this.compareXmlFilesHelper(element[key], map);
      }
    }
  }
  
  updateXmlFile(element, map) {
    for (const key in element) {
      if (typeof element[key] === 'object') {
        if (map[key]) {
          map[key] = 'both';
        } else {
          map[key] = '2';
        }
  
        element[key]['occurrence'] = map[key];
        this.updateXmlFile(element[key], map);
      }
    }
  }
}
