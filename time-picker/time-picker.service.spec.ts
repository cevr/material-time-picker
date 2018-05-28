import { TestBed, inject } from '@angular/core/testing';

import { TimePickerService } from './time-picker.service';
import { MatDialogModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TimePickerModule } from './time-picker.module';



describe('TimePickerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MatDialogModule, NoopAnimationsModule, TimePickerModule]
    });
  });

  it(
    'should be created',
    inject([TimePickerService], (service: TimePickerService) => {
      expect(service).toBeTruthy();
    })
  );
});
