import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import useCoreContext from '~/core/Context/useCoreContext';
import Field from '~/components/internal/FormFields/Field';
import getImage from '~/utils/get-image';
import { renderFormField } from '~/components/internal/FormFields';
import { UIElementProps } from '../../UIElement';
import './BlikInput.scss';

interface BlikInputDataState {
    blikCode: string;
}

interface BlikInputValidState {
    blikCode: boolean;
}

interface BlikInputErrorState {
    blikCode: boolean;
}

function BlikInput(props: UIElementProps) {
    const { i18n, loadingContext } = useCoreContext();

    const [data, setData] = useState<BlikInputDataState>(props.data);
    const [errors, setErrors] = useState<BlikInputErrorState>({ blikCode: false });
    const [valid, setValid] = useState<BlikInputValidState>({ blikCode: false });

    const handleBlikCode = type => (e: Event): void => {
        e.preventDefault();

        const value: string = (e.target as HTMLInputElement).value;
        const isBlikCodeValid: boolean = value.length === 6;

        setData({ blikCode: value });
        setErrors({ ...valid, blikCode: type === 'blur' && !isBlikCodeValid });
        setValid({ ...valid, blikCode: isBlikCodeValid });
    };

    useEffect(() => {
        props.onChange({ data, isValid: valid.blikCode }, this);
    }, [data, valid, errors]);

    return (
        <div className="adyen-checkout__blik">
            <p className="adyen-checkout__blik__helper">{i18n.get('blik.help')}</p>
            <Field
                errorMessage={!!errors.blikCode && i18n.get('blikCode.invalid')}
                label={i18n.get('blik.code')}
                classNameModifiers={['blikCode', '50']}
                isValid={valid.blikCode}
            >
                {renderFormField('text', {
                    value: data.blikCode,
                    name: 'blikCode',
                    spellcheck: false,
                    required: true,
                    autocorrect: 'off',
                    onInput: handleBlikCode('input'),
                    onChange: handleBlikCode('blur'),
                    maxLength: 6
                })}
            </Field>

            {props.showPayButton && props.payButton({ status: 'ready', icon: getImage({ loadingContext, imageFolder: 'components/' })('lock') })}
        </div>
    );
}

BlikInput.defaultProps = { data: { blikCode: '' } };

export default BlikInput;
