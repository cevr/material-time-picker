import { Injectable } from '@angular/core';
import { Time } from '../definitions';

@Injectable()
export class TimePickerCoreService {
  public getAllowedTimes(min, max) {
    const hour = {
      minimum: +min.split(':')[0],
      max: +max.split(':')[0]
    };
    const minute = {
      minimum: +min.split(':')[1],
      max: +max.split(':')[1]
    };

    return this.calculateAllowedTimes(hour, minute, hour.minimum);
  }

  private calculateAllowedMinutes(minimum, maximum, index, times = []) {
    if (minimum > maximum) {
      return times;
    }
    const hourTime = index <= 12 ? index : index - 12;
    const minuteTime = minimum;
    const ampm = index < 12 ? 'AM' : 'PM';
    times = times.concat(`${hourTime}:${minuteTime} ${ampm}`);
    minimum++;
    return this.calculateAllowedMinutes(minimum, maximum, index, times);
  }

  private calculateAllowedTimes(hour, minute, hourIndex = hour.minimum, allowedTimes = []) {
    if (hourIndex > hour.max) {
      return allowedTimes;
    }
    let minimumMin = 0;
    let maximumMin = 59;
    if (hourIndex === hour.min) {
      minimumMin = minute.min;
    } else if (hourIndex === hour.max) {
      maximumMin = minute.max;
    }
    allowedTimes = allowedTimes.concat(
      this.calculateAllowedMinutes(minimumMin, maximumMin, hourIndex)
    );
    hourIndex++;
    return this.calculateAllowedTimes(hour, minute, hourIndex, allowedTimes);
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

  getTime(hour, minute, second?): string {
    return `${hour}:${minute}`;
  }
}
