import { Component } from '@angular/core';
import{Input}from '@angular/core'
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
@Input()image:string|undefined
@Input()name:string|undefined
@Input()text:string|undefined
}
