import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import {Field, Form, Formik} from "formik";
import {initialFormikValues, Values} from "../const";
import {logInUser} from "../store/reducers/UserSlice";
import show from '../img/showPassword.png'
import hide from '../img/hidePassword.png'


const SignInPage = () => {
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const {errorPassword, errorEmail} = useAppSelector(state => state.userReducer)
    const handleSubmit = (values: Values): void => {
        dispatch(logInUser(values))
    }

    return (
        <div className='container'>
            <div className='form-wrapper'>
                <Formik
                    initialValues={initialFormikValues}
                    onSubmit={handleSubmit}
                >
                    <Form className='form'>
                        <h1>Авторизация</h1>
                        <Field
                            id="email"
                            name="email"
                            placeholder="Введите почту"
                            type="email"
                        />
                        {errorEmail && <h5>Вы ввели несуществующую почту</h5>}
                        <div className='position-relative'>
                            <Field
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder='Введите пароль'/>
                            <img
                                alt='showPassword'
                                style={{top: 14, left: 230, cursor: "pointer"}}
                                className='position-absolute'
                                width={25} height={25} onClick={() => setShowPassword(!showPassword)}
                                src={showPassword ? hide : show}/>
                        </div>
                        {errorPassword && <h5>Вы ввели неверный пароль</h5>}
                        <button type="submit">Авторизоваться</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default SignInPage;