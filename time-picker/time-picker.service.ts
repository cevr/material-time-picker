import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { TimePickerComponent } from './time-picker/time-picker.component';
import { TimePickerConfig, IDialogResult } from './definitions';

@Injectable()
export class TimePickerService {
  private opened = false;
  constructor(private dialog: MatDialog) {}

  open(data?: any): IDialogResult {
    data = data || {};
    data = {
      time: data.time || '00:00',
      format: data.format || ['HH', 'MM', 'M'],
      rangeTime: data.rangeTime || { start: '00:00', end: '24:00' },
      twentyFourHours: data.twentyFourHours || false
    } as TimePickerConfig;

    if (!this.opened) {
      this.opened = true;
      const dialogRef = this.dialog.open(TimePickerComponent, {
        disableClose: true,
        data
      });

      dialogRef.afterClosed().subscribe(time => {
        setTimeout(() => {
          this.opened = false;
        }, 0);
      });

      return {
        timeChosen: function() {
          return dialogRef.componentInstance.timeChosen$;
        }
      };
    }
  }
}
