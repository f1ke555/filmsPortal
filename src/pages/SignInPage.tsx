import React, {useState} from 'react';
import {useAppDispatch} from "../hooks/redux";
import {Field, Form, Formik} from "formik";
import {useNavigate} from "react-router-dom";
import {initialFormikValues, Values} from "../const";
import {logInUser} from "../store/reducers/UserSlice";
import show from '../img/showPassword.png'
import hide from '../img/hidePassword.png'


const SignInPage = () => {
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const handleSubmit = (values: Values): void => {
        dispatch(logInUser(values))
        navigate('/')
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
                        <div className='position-relative'>
                            <Field id="password" type={showPassword ? 'text' : 'password'} name="password"
                                   placeholder='Введите пароль'/>
                            <img style={{top: 14, left: 230, cursor: "pointer"}} className='position-absolute'
                                 width={25} height={25} onClick={() => setShowPassword(!showPassword)}
                                 src={showPassword ? show : hide}/>
                        </div>
                        <button type="submit">Авторизоваться</button>
                    </Form>
                </Formik>
            </div>
        </div>
    );
};

export default SignInPage;