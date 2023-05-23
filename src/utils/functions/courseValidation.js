import {useState, useEffect} from "react";

const validateOnlyNumbers = (num) => {
    const prepNum = num.replace(/\D/g, '');
    return prepNum === num;
}

export const useNameState = (defaultName = '', error = 'Поле не может быть пустым!') => {
    const [name, setName] = useState(defaultName);
    const [nameDirty, setNameDirty] = useState(false);
    const [nameError, setNameError] = useState(error);

    const nameChecker = (e) => {
        setName(e.target.value);
        if (e.target.value.length === 0) {
            setNameError('Поле не может быть пустым!');
            return;
        }
        setNameError('');
    }

    const setClear = () => {
        setNameDirty(false);
        setNameError('Поле не может быть пустым!');
        setName('');
    }
    return {name, setName, nameDirty, setNameDirty, nameError, setNameError, nameChecker, setClear}
}

export const useYearState = (defaultYear = '', error = 'Поле не может быть пустым!') => {
    const [year, setYear] = useState(defaultYear);
    const [yearDirty, setYearDirty] = useState(false);
    const [yearError, setYearError] = useState(error);

    const yearChecker = (e) => {
        setYear(e.target.value);
        if (e.target.value.length === 0) {
            setYearError('Поле не может быть пустым!');
            return;
        }
        if (!validateOnlyNumbers(e.target.value)) {
            setYearError('Год должен быть целым числом');
            return;
        }
        if (e.target.value < 2000 || e.target.value > 2029) {
            setYearError('Год должен быть с 2000 до 2029');
            return;
        }
        setYearError('');
    }

    const setClear = () => {
        setYearDirty(false);
        setYearError('Поле не может быть пустым!');
        setYear('');
    }
    return {year, setYear, yearDirty, setYearDirty, yearError, setYearError, yearChecker, setClear}
}

export const usePlacesState = (defaultPlaces = '', error = 'Поле не может быть пустым!') => {
    const [places, setPlaces] = useState(defaultPlaces);
    const [placesDirty, setPlacesDirty] = useState(false);
    const [placesError, setPlacesError] = useState(error);

    const placesChecker = (e) => {
        setPlaces(e.target.value);
        if (e.target.value.length === 0) {
            setPlacesError('Поле не может быть пустым!');
            return;
        }
        if (!validateOnlyNumbers(e.target.value)) {
            setPlacesError('Число мест должно быть целым числом');
            return;
        }
        if (e.target.value < 1 || e.target.value > 200) {
            setPlacesError('Число мест должно быть от 1 до 200');
            return;
        }
        setPlacesError('');
    }

    const setClear = () => {
        setPlacesDirty(false);
        setPlacesError('Поле не может быть пустым!');
        setPlaces('');
    }
    return {places, setPlaces, placesDirty, setPlacesDirty, placesError, setPlacesError, placesChecker, setClear}
}

export const useCreatingFormState = (nameError, yearError, placesError) => {
    const [hasFormErrors, setHasFormErrors] = useState(true);

    useEffect(() => {
        if (nameError || yearError || placesError) {
            setHasFormErrors(true);
        } else {
            setHasFormErrors(false);
        }
    }, [nameError, yearError, placesError]);

    return {hasFormErrors};
}

