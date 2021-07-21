import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { ActiveTabEnum } from '../Model/enum';

import { TabService } from './tab.service';

describe('TabService', () => {
  let service: TabService;
  let originalTimeout: number;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TabService);

    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
  });

  afterEach(function() {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#getTab should return expected data', (done) => {
    const expectedData: ActiveTabEnum = ActiveTabEnum.Menu

    service.getTab().subscribe(data => {
      expect(data).toEqual(expectedData);
      done();
    });

    service.activeTabSubject.next(expectedData)
  });
});
