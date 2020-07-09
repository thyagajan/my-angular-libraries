import { TestBed } from '@angular/core/testing';

import { ExcelToJsonWithTemplateService } from './excel-to-json-with-template.service';

describe('ExcelToJsonWithTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExcelToJsonWithTemplateService = TestBed.get(ExcelToJsonWithTemplateService);
    expect(service).toBeTruthy();
  });
});
