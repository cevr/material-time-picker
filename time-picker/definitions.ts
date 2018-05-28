import { Observable } from 'rxjs';

export interface TimePickerConfig {
  time?: string;
  format: string[];
  rangeTime?: RangeTime;
  onlyHour?: boolean;
  onlyMinute?: boolean;
  onlyAM?: boolean;
  onlyPM?: boolean;
  twentyFourHours?: boolean;
}

export interface RangeTime {
  start: string;
  end: string;
}

export interface IDialogResult {
  timeChosen(): Observable<string>;
}

export type Time = string[];

export enum TimeStart {
  'minute' = 0,
  'hour' = 1,
  'twentyFour' = 0
}

export enum TimeEnd {
  'minute' = 60,
  'hour' = 12,
  'twentyFour' = 24
}
