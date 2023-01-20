import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  expression: string = "";
  minValue: number = 0;
  maxValue: number = 1000;
  field: string = "author"

  constructor() { }

  getExpression() {
    return this.expression;
  }

  setExpression(expressionV: string) {
    this.expression = expressionV;
  }

  getFields() {
    return this.field;
  }
  
  setFields(fieldV: string) {
    this.field = fieldV;
  }
  
  getMinValue() {
    return this.minValue;    
  }

  setMinValue(minV: number) {
    this.minValue = minV;    
  }

  getMaxValue() {
    return this.maxValue;    
  }

  setMaxValue(maxV: number) {
    this.maxValue = maxV;    
  }
}
