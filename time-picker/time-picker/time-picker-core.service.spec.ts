import { TestBed, inject } from '@angular/core/testing';

import { TimePickerCoreService } from './time-picker-core.service';

describe('TimePickerCoreService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TimePickerCoreService]
    });
  });

  it(
    'should be created',
    inject([TimePickerCoreService], (service: TimePickerCoreService) => {
      expect(service).toBeTruthy();
    })
  );

  it(
    'should return array of 61 strings that equate to each minute in an hour',
    inject([TimePickerCoreService], (service: TimePickerCoreService) => {
      expect(service.getAllowedTimes('10:00', '11:00').length).toEqual(61);
    })
  );

  it(
    'should convert time objet to string',
    inject([TimePickerCoreService], (service: TimePickerCoreService) => {
      expect(service.timeObjectToString({ hour: 10, minute: 0, ampm: 'AM' })).toEqual('10:00');
      expect(service.timeObjectToString({ hour: 10, minute: 0, ampm: 'PM' })).toEqual('22:00');
    })
  );

  it(
    'should convert string to time object',
    inject([TimePickerCoreService], (service: TimePickerCoreService) => {
      expect(service.stringToTimeObject('10:00')).toEqual({ hour: 10, minute: 0, ampm: 'AM' });
      expect(service.stringToTimeObject('22:00')).toEqual({ hour: 10, minute: 0, ampm: 'PM' });
    })
  );
});
