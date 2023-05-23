import React, {useContext} from 'react';
import {Context} from "../../index";
import InputField from "../InputField/InputField";
import {Form} from "react-bootstrap";
import SemesterPicker from "../RadioPicker/SemesterPicker";

const CreateCourseForm = ({nameValidation, yearValidation, placesValidation}) => {
    const {course} = useContext(Context);

    return (
        <Form>
            <div className="mb-3">
                <InputField label={'Название курса'}
                            setInputDirty={nameValidation.setNameDirty}
                            checker={nameValidation.nameChecker}
                            name={'name'} type={'name'} value={nameValidation.name} controlId={''}
                            placeHolder={'Введите название курса'}
                            isImportant={true}
                            SetValueInStore={course.setCreatingCourseName.bind(course)}
                />
            </div>
            {(nameValidation.nameDirty && nameValidation.nameError) &&
                <div className="error-message">
                    {nameValidation.nameError}
                </div>
            }
            <div className="mb-3">
                <InputField label={'Год начала курса'}
                            setInputDirty={yearValidation.setYearDirty}
                            checker={yearValidation.yearChecker}
                            name={'year'} type={'year'} value={yearValidation.year} controlId={''}
                            placeHolder={'Введите год начала курса'}
                            isImportant={true}
                            SetValueInStore={course.setCreatingCourseYear.bind(course)}
                />
            </div>
            {(yearValidation.yearDirty && yearValidation.yearError) &&
                <div className="error-message">
                    {yearValidation.yearError}
                </div>
            }
            <div className="mb-3">
                <InputField label={'Общее количество мест'}
                            setInputDirty={placesValidation.setPlacesDirty}
                            checker={placesValidation.placesChecker}
                            name={'places'} type={'places'} value={placesValidation.places} controlId={''}
                            placeHolder={'Введите общее количество мест'}
                            isImportant={true}
                            SetValueInStore={course.setCreatingCoursePlaces.bind(course)}
                />
            </div>
            {(placesValidation.placesDirty && placesValidation.placesError) &&
                <div className="error-message">
                    {placesValidation.placesError}
                </div>
            }
            <div className="mb-3">
                <SemesterPicker header={'Семестр'} setChoice={course.setCreatingCourseSemester.bind(course)} fields={[
                    {
                        name: 'Весенний',
                        id: 'Spring',
                        value: 'Spring'
                    },
                    {
                        name: 'Осенний',
                        id: 'Autumn',
                        value: 'Autumn'
                    }
                ]}/>
            </div>
        </Form>
    );
};

export default CreateCourseForm;