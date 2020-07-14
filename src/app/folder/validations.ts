export class CustomValidations {

    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        const messageConfigs = {
            required: {message: 'required'},
            exist: {message: 'exist'},
            invalidEmailAddress: {message: 'invalid_email'},
            invalidNumber: {message: 'invalid_number'},
            invalidPassword: {message: 'invalid_password'},
            passwordSchemaWrong: {message: 'password_schema_msg'},
            must_be_numbers: {message: 'يجب ان يكون رقم الهوية / المقيم بأرقام عربيه فقط'},
            minimum_message: {message: 'minimum_validation_message'},
            maximum_message: {message: 'maximum_validation_message'},
            must_start_with_plus: {message: 'must_start_with_plus'},
            id_not_valid: {message: 'رقم هوية غير صحيح'},
            length: {message: 'من فضلك تأكد من عدد ارقام الهوية'},
            minlength: {message: 'الحد الادني للادخال ', params: {value: `${validatorValue.requiredLength}`}},
            maxlength: {message: 'الحد الاقصى للادخال ', params: {value: `${validatorValue.requiredLength}`}},
            invalid_min_length: {
                message: 'minlength',
                params: {value: `${validatorValue.requiredLength ? validatorValue.requiredLength : ''}`}
            },
            invalid_format: {message: 'invalid_format'},
            must_start_with_one_or_two: {message: 'يجب ان يبدأ رقم الهويه / المقيم بـ 1 آو 2'}
        };
        const message = messageConfigs[validatorName] ? messageConfigs[validatorName] : {message: validatorName};
        if (!message.params) {
            message.params = {value: ''};
        }
        return message;
    }

    static emailValidator(control) {
        // RFC 2822 compliant regex
        if (!control.value || control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        } else {
            return {invalidEmailAddress: true};
        }
    }

    static numberValidator(control) {
        const cValue = '' + control.value;
        if (cValue.match(/^\d*\.?\d*$/)) {
            return null;
        } else {
            return {invalidNumber: true};
        }
    }

    static passwordValidator(control) {
        if (control.value) {
            //  Password must be between 6 and 12 digits long.
            // include at least one numeric digit.
            if (control.value.match(/^(?=.*\d).{6,12}$/)) {
                return null;
            } else {
                return {passwordSchemaWrong: true};
            }
        } else {
            return null;
        }
    }

    static nationalID(control) {
        // const NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE]+[-]?\d+)?\s*$/;
        // if (control.value !== '' && !NUMBER_REGEXP.test(control.value)) {
        //     return {must_be_numbers: true};
        // }
        // const ONE_OR_TWO = /^[1-2]/;
        // if (!ONE_OR_TWO.test(control.value.charAt(0))) {
        //     return {must_start_with_one_or_two: true};
        // }
        // return null;
        let id = control.value;
        id = id.trim();
        if (id.length !== 10) {
            return {length: true};
        }
        const type = id.substr(0, 1);
        if (type !== '2' && type !== '1') {
            return {must_start_with_one_or_two: true};
        }
        let sum = 0;
        for (let i = 0; i < 10; i++) {
            if (i % 2 === 0) {
                const ZFOdd = String('00' + String(Number(id.substr(i, 1)) * 2)).slice(-2);
                sum += Number(ZFOdd.substr(0, 1)) + Number(ZFOdd.substr(1, 1));
            } else {
                sum += Number(id.substr(i, 1));
            }

        }
        return (sum % 10 !== 0) ? {id_not_valid: true} : null;
    }

}
