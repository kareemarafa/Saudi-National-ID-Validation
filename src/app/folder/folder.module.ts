import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {FolderPageRoutingModule} from './folder-routing.module';

import {FolderPage} from './folder.page';
import {ErrorControlComponent} from './error-control/error-control.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        FolderPageRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [FolderPage, ErrorControlComponent]
})
export class FolderPageModule {
}
