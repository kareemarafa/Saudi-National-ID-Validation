import {Input, Component, OnInit, OnChanges, SimpleChanges, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {takeWhile} from 'rxjs/operators';
import {CustomValidations} from '../validations';
@Component({
    selector: 'app-control-errors',
    templateUrl: './error-control.component.html',
    providers: []
})
export class ErrorControlComponent implements OnInit, OnDestroy {
    private alive = true;
    @Input()
    public ctl: FormControl;
    @Input()
    public translationKey = '';

    errorMessages: any[] = [];

    constructor() {

    }

    ngOnInit() {
        this.setErrorMessages();
        this.ctl.statusChanges.pipe(takeWhile(() => this.alive)).subscribe(() => {
            this.setErrorMessages();
        });
        this.ctl.valueChanges.subscribe(() => {
            this.setErrorMessages();
        });
    }

    setErrorMessages() {
        const messages = [];
        if (this.ctl) {
            for (const propertyName in this.ctl.errors) {
                if (this.ctl.errors.hasOwnProperty(propertyName)) {
                    messages.push(CustomValidations.getValidatorErrorMessage(propertyName, this.ctl.errors[propertyName]));
                }
            }
        }
        this.errorMessages = messages;
    }

    public ngOnDestroy() {
        this.alive = false;
    }
}
