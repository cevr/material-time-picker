import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';

import { TimePickerConfig } from '../definitions';
import { TimePickerCoreService } from './time-picker-core.service';
import { Time } from '../definitions';

@Component({
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss']
})
export class TimePickerComponent implements OnInit, OnDestroy {
  public timeChosen$ = new Subject<any>();
  public clockObject: Array<any>;
  public isClicked: boolean;
  public clockType: 'minute' | 'hour' | 'twentyFour' = 'hour';
  public hour: string;
  public minute: string;
  public time: any;
  public degree: any;
  public config: TimePickerConfig;
  public allowedTimes: any;

  constructor(
    public core: TimePickerCoreService,
    private dialogRef: MatDialogRef<TimePickerComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.config = data;
    this.time = data.time;
    this.hour = data.time.split(':')[0];
    this.minute = data.time.split(':')[1];
  }

  ngOnInit() {
    this.allowedTimes = this.core.getAllowedTimes(
      this.config.rangeTime.start,
      this.config.rangeTime.end
    );
    if (this.config && this.config.onlyMinute) {
      this.clockType = 'minute';
    }

    if (this.config && this.config.twentyFourHours) {
      this.clockType = 'twentyFour';
    }
  }

  ngOnDestroy() {
    this.timeChosen$.complete();
  }

  close() {
    this.timeChosen$.next(this.time);
    this.dialogRef.close();
  }

  increment(value, context) {
    switch (context) {
      case 'HH': {
        this.hour = this.core.incrementHour(value, this.config.twentyFourHours);
        break;
      }
    }
    this.time = this.core.getTime(this.hour, this.minute);
  }
}
