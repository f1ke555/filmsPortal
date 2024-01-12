import React from 'react';
import {Form, Formik, Field, ErrorMessage} from "formik";
import * as Yup from 'yup'
import {useNavigate} from "react-router-dom";
import {initialFormikValues, Values} from "../const";
import {useAppDispatch} from "../hooks/redux";
import {addNewUser} from "../store/reducers/UserSlice";



const SingUpPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()



    const handleSubmit = (values: Values) => {
        dispatch(addNewUser(values))
        navigate('/signin')
    }
    return (
        <div className='container'>
            <div className='form-wrapper'>
                <Formik
                    initialValues={initialFormikValues}
                    onSubmit={handleSubmit}
                    validationSchema = {Yup.object({
                        firstName: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
                        lastName: Yup.string().min(2, 'Минимум 2 символа').required('Обязательное поле'),
                        email: Yup.string()
                            .email()
                            .required('Обязательное поле'),
                        password: Yup.string()
                            .required('Обязательное поле')
                            .min(8, 'Пароль слишком короткий - должен содержать минимум 8 символов.')
                            .matches(/[a-zA-Z]/, 'Пароль может содержать только латинские буквы.'),
                    })}
                >
                    <Form className='form'>
                        <h1>Регистрация</h1>
                        <Field id="firstName" name="firstName" placeholder="Введите имя"/>
                        <ErrorMessage className='error' name='firstName' component='div'/>
                        <Field id="lastName" name="lastName" placeholder="Введите фамилию"/>
                        <ErrorMessage className='error' name='lastName' component='div'/>
                        <Field
                            id="email"
                            name="email"
                            placeholder="Введите почту"
                            type="email"
                        />
                        <ErrorMessage className='error' name='email' component='div'/>
                        <Field id="password" type='password' name="password" placeholder='Введите пароль'/>
                        <ErrorMessage className='error' name='password' component='div'/>
                        <button type="submit">Зарегистироваться</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default SingUpPage;