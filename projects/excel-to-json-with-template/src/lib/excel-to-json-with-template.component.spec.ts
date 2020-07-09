import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcelToJsonWithTemplateComponent } from './excel-to-json-with-template.component';

describe('ExcelToJsonWithTemplateComponent', () => {
  let component: ExcelToJsonWithTemplateComponent;
  let fixture: ComponentFixture<ExcelToJsonWithTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcelToJsonWithTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcelToJsonWithTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
