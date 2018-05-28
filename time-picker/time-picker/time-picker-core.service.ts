import { Injectable } from '@angular/core';
import { Time } from '../definitions';

@Injectable()
export class TimePickerCoreService {
  public getAllowedTimes(min: string, max: string, isTwentyFourHours: boolean = false) {
    const hour = {
      minimum: +min.split(':')[0],
      max: +max.split(':')[0]
    };
    const minute = {
      minimum: +min.split(':')[1],
      max: +max.split(':')[1]
    };

    return this.calculateAllowedTimes(hour, minute, hour.minimum, isTwentyFourHours);
  }
  private calculateAllowedTimes(hour: any, minute: any, hourIndex: number, isTwentyFourHours: boolean, allowedTimes: string[] = []) {
    if (hourIndex > hour.max) {
      console.log(allowedTimes);
      return allowedTimes;
    }
    let minimumMin = 0;
    let maximumMin = 59;
    if (hourIndex === hour.min) {
      minimumMin = minute.min;
    } else if (hourIndex === hour.max) {
      maximumMin = minute.max;
    }
    allowedTimes = allowedTimes.concat(this.calculateAllowedMinutes(minimumMin, maximumMin, hourIndex, isTwentyFourHours));
    hourIndex++;
    return this.calculateAllowedTimes(hour, minute, hourIndex, isTwentyFourHours, allowedTimes);
  }

  private calculateAllowedMinutes(minimum: number, maximum: number, hour: number, isTwentyFourHours: boolean, times: string[] = []) {
    if (minimum > maximum) {
      return times;
    }
    if (isTwentyFourHours) {
      times = times.concat(`${this.numberToTime(hour)}:${this.numberToTime(minimum)}`);
      minimum++;
      return this.calculateAllowedMinutes(minimum, maximum, hour, isTwentyFourHours, times);
    } else {
      const hourTime = hour <= 12 ? hour : hour - 12;
      const ampm = hour < 12 ? 'AM' : 'PM';
      times = times.concat(`${this.numberToTime(hourTime)}:${this.numberToTime(minimum)} ${ampm}`);
      minimum++;
      return this.calculateAllowedMinutes(minimum, maximum, hour, isTwentyFourHours, times);
    }
  }

  /**
   * Converts 00:00 format to Time object
   */

  public parseStringToTime(time: string): Time {
    return time.split('');
  }

  public parseTimeToString(time: Time): string {
    return '';
  }

  incrementHour(value, isTwentyFour) {
    value = Number(value);
    if (isTwentyFour) {
      return value + 10 < 24 ? value + 10 : null;
    }
    return this.numberToTime(value + 10 < 12 ? value + 10 : null);
  }

  incrementH(value, isTwentyFour): string {
    value = Number(value);
    if (isTwentyFour) {
      return this.numberToTime(value + 1 <= 24 ? value + 1 : 0);
    }
    return this.numberToTime(value + 1 <= 12 ? value + 1 : 0);
  }

  numberToTime(number: number): string {
    return number < 10 ? `0${number}` : number.toString();
  }

  timeToNumber(time: string): number {
    return Number(this.parseStringToTime(time).join('.'));
  }

  numberToDisplayTime(number: number) {
    return number
      .toString()
      .split('.')
      .join(':');
  }
  getTime(hour, minute, second?): string {
    return `${hour}:${minute}`;
  }
}
