import { Component, EventEmitter } from '@angular/core';
import { Input,Output } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.css']
})
export class RowComponent {
  @Input() image: string | undefined
  @Input() name: string | undefined
  @Input() status: string | undefined
  
  @Output() Sender=new EventEmitter()

  /* ViewProfile(nm:string|undefined,img:string|undefined,stat:string|undefined)
  {
    this.Sender.emit({nm,img,stat})
  } */
  
}
