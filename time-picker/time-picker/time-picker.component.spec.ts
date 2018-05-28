import { async, TestBed } from '@angular/core/testing';
import { NgModule } from '@angular/core';
import { MatDialogModule, MatDialog } from '@angular/material';

import { TimePickerComponent } from './time-picker.component';
import { TimePickerModule } from '../time-picker.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule, TranslateLoader, TranslateFakeLoader } from '@ngx-translate/core';
import { OverlayContainer } from '@angular/cdk/overlay';

const data = {
  time: '00:00',
  theme: 'dark',
  rangeTime: { start: '00:00', end: '24:00' },
  arrowStyle: {},
  locale: 'en',
  changeToMinutes: false,
  onlyHour: false,
  onlyMinute: false,
  onlyAM: false,
  onlyPM: false
};
data.rangeTime = {
  start: data.rangeTime.start || '00:00',
  end: data.rangeTime.end || '24:00'
};
data.arrowStyle = {
  background: '#aaa',
  color: ''
};

@NgModule({
  imports: [MatDialogModule, NoopAnimationsModule, TimePickerModule]
})
class DialogTestModule {}

describe('TimePickerComponent', () => {
  let dialog;
  let overlayContainerElement: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DialogTestModule,
        TranslateModule.forRoot({
          loader: { provide: TranslateLoader, useClass: TranslateFakeLoader }
        })
      ],
      providers: [
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            return { getContainerElement: () => overlayContainerElement };
          }
        }
      ]
    }).compileComponents();
    dialog = TestBed.get(MatDialog);

  }));

  it('should render the time picker', () => {
    const config = {
      data
    };
    const ref = dialog.open(TimePickerComponent, config);
    expect(ref).toBeTruthy();
  });
});
