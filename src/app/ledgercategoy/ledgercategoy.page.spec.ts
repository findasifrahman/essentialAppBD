import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LedgercategoyPage } from './ledgercategoy.page';

describe('LedgercategoyPage', () => {
  let component: LedgercategoyPage;
  let fixture: ComponentFixture<LedgercategoyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LedgercategoyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LedgercategoyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
