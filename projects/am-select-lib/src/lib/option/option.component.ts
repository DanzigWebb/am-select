import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'am-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(click)': 'onCheck()'
  }
})
export class OptionComponent implements OnInit {

  @Input() disabled = false;
  @Input() checked = false;
  @Input() value: any;

  @Output() check = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  onCheck() {
    this.check.emit();
  }

}
