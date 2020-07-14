import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CustomValidations} from '../../../../src/app/validations';

@Component({
    selector: 'app-folder',
    templateUrl: './folder.page.html',
    styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
    public folder: string;
    form: FormGroup;
    nationalType: number;

    constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder) {
    }

    ngOnInit() {
        this.folder = this.activatedRoute.snapshot.paramMap.get('id');
        this.form = this.fb.group({
            id:
                ['',
                    [
                        Validators.minLength(10),
                        Validators.maxLength(10),
                        CustomValidations.nationalID
                    ]
                ]
        });
    }

    submit() {
        const type = this.form.controls.id.value;
        if (type.charAt(0) === '1') {
            this.nationalType = 1;
        } else if (type.charAt(0) === '2') {
            this.nationalType = 2;
        }

        console.log(this.form.controls.id.errors);
    }
}
