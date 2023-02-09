import { Injectable } from '@nestjs/common';
var xmlcompare = require('node-xml-compare');
@Injectable()
export class AppService {
  getHello() {
  let xml1 = "<sample><a>1</a><a>2</a><a>4</a><b>4</b></sample>";
  let xml2 = "<sample><a>2</a><a>1</a><a>3</a><c>3</c></sample>";
 let res;
  xmlcompare(xml1, xml2, function(result) {
    console.log(result);
     res = result
  });
    return res;
  }
}
