import { h } from 'preact';
import { useState, useLayoutEffect } from 'preact/hooks';
import { renderFormField } from '../../FormFields';
import Field from '../../FormFields/Field';
import useCoreContext from '~/core/Context/useCoreContext';
import fetchJSONData from '~/utils/fetch-json-data';

export default function CountryField(props) {
    const { allowedCountries = [], errorMessage, onDropdownChange, value } = props;
    const { i18n, loadingContext } = useCoreContext();
    const [countries, setCountries] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [readOnly, setReadOnly] = useState(props.readOnly);

    useLayoutEffect(() => {
        fetchJSONData({
            path: `datasets/countries/${useCoreContext().locale}.json`,
            loadingContext
        })
            .then(response => {
                const countriesFilter = country => allowedCountries.includes(country.id);
                const newCountries = allowedCountries.length ? response.filter(countriesFilter) : response;
                setCountries(newCountries || []);
                setReadOnly(newCountries.length === 1 || readOnly);
                setLoaded(true);
            })
            .catch(error => {
                console.error(error);
                setCountries([]);
                setLoaded(true);
            });
    }, []);

    if (!loaded) return null;

    return (
        <Field label={i18n.get('country')} errorMessage={errorMessage} classNameModifiers={['country']}>
            {renderFormField('select', {
                onChange: onDropdownChange,
                name: 'country',
                placeholder: i18n.get('select.country'),
                selected: value,
                items: countries,
                readonly: readOnly && !!value
            })}
        </Field>
    );
}
