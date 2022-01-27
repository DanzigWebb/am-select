import {
  ChangeDetectionStrategy,
  Component,
  EmbeddedViewRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  OnInit,
  Output,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Instance } from '@popperjs/core';
import { DOCUMENT } from '@angular/common';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'am-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectComponent implements OnInit {

  private view: EmbeddedViewRef<any> | null = null;
  private popperRef: Instance | null = null;
  private dropdownRef: HTMLElement | null = null;

  private isDropdownShow = false;

  @Input() value: any = '';

  @Output() close = new EventEmitter();

  constructor(
    @Inject(DOCUMENT) private doc: Document,
    private vcr: ViewContainerRef,
    private zone: NgZone,
  ) {
  }

  ngOnInit(): void {
  }


  openDropdown(dropdownTpl: TemplateRef<any>, trigger: HTMLElement): void {
    this.isDropdownShow = true;
    this.view = this.vcr.createEmbeddedView(dropdownTpl);
    this.dropdownRef = <HTMLElement>this.view.rootNodes[0];

    const dropdown = <HTMLElement>this.dropdownRef.querySelector('.dropdown-content');

    this.doc.body.appendChild(this.dropdownRef);
    dropdown.style.width = `${trigger.offsetWidth}px`;

    this.zone.runOutsideAngular(() => {
      this.popperRef = createPopper(trigger, dropdown, {
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 5],
            },
          },
        ],
      });
    });
  }

  onClose(): void {
    this.isDropdownShow = false;

    this.destroyDropdown();
    this.close.emit();

    this._onTouched();
  }

  destroyDropdown() {
    this.popperRef?.destroy();
    this.view?.destroy();
    this.dropdownRef?.remove();
    this.view = null;
    this.popperRef = null;
    this.dropdownRef = null;
  }

  private _onTouched() {
  }
}
