import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { TimePickerComponent } from './time-picker/time-picker.component';
import { TimePickerService } from './time-picker.service';
import { TimePickerCoreService } from './time-picker/time-picker-core.service';
import { ButtonModule } from 'modules/web-core/button/button.module';
import { MatIconModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, TranslateModule, ButtonModule, MatIconModule],
  declarations: [TimePickerComponent],
  providers: [TimePickerService, TimePickerCoreService],
  entryComponents: [TimePickerComponent],
  exports: [TimePickerComponent]
})
export class TimePickerModule {}
