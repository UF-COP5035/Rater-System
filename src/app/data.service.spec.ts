import { TestBed, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpModule } from '@angular/http';

import { DataService } from './data.service';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [DataService]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));
});
