//PRINCIPAL
import React, { useContext, useEffect, useCallback, useMemo } from 'react';
import { Alert, StyleSheet, View, Text } from 'react-native';
import { NavigationContext } from "@react-navigation/native";
import { Formik } from 'formik';
import * as Yup from 'yup';
//REDUX
import { compose } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { setEmail, setFirstName, setLastName } from '../reducers/user';
//COMPONENTS
import Body from '../components/Body';
import Badge from '../components/Badge';
import Input from '../components/Input';
//TYPES
import { User } from '../types';
//HOC
import { withPersistentStore, withQueryClientProvider } from '../hoc';
//HOOKS
import { getUsers } from '../hooks/getUsers';

const ProfileStep1Screen = () => {

    const navigation = useContext(NavigationContext);

    const { data: dataGetUsers, isError: isErrorGetUsers } = getUsers()

    useEffect(() => {
        console.log('dataGetUsers', dataGetUsers)
    }, [dataGetUsers]);

    useEffect(() => {
        if (isErrorGetUsers) {
            Alert.alert('Request error', `There was an error fetching users. Contact admin at admin@example.com`, [
                { text: 'OK' },
            ]);
        }
    }, [isErrorGetUsers]);

    const dispatch = useDispatch();
    const { firstName: localFirstName, lastName: localLastName, email: localEmail } = useSelector<any, User>(state => state.user);

    /*const isFirstNameValid = useMemo(() => {
        if (localFirstName.length >= 2) {
            return true
        }
        return false
    }, [localFirstName])

    const isEmailValid = useMemo(() => {
        if (localEmail === '') {
            return true
        }
        return localEmail.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }, [localEmail])*/

    const onPress = useCallback(() => {
        profileStep1Schema.validate({
            firstName: localFirstName,
            lastName: localLastName,
            email: localEmail
        }).then(valid => {
            console.log(valid)
            navigation?.navigate('ProfileStep2')
        }).catch(error => console.log(error));
        /*if (!isFirstNameValid) {
            Alert.alert('Form error', 'Enter a valid first name', [
                { text: 'OK' },
            ]);
            return
        }
        if (!isEmailValid) {
            Alert.alert('Form error', 'Enter a valid email', [
                { text: 'OK' },
            ]);
            return
        }*/
        //navigation?.navigate('ProfileStep2')
    }, [localFirstName, localLastName, localEmail])

    const profileStep1Schema = Yup.object().shape({
        firstName: Yup.string()
            .min(2, 'Enter a valid first name, value is too short')
            .max(20, 'Enter a valid first name, value is too long')
            .matches(/^[A-Za-z]+$/, 'Enter a valid first name, 0nly alphabetic characters allowed')
            .required('Required'),
        lastName: Yup.string()
            .max(20, 'Enter a valid last name, value is too long')
            .matches(/^$|[A-Za-z]+$/, 'Enter a valid last name, only alphabetic characters allowed')
            .notRequired(),
        email: Yup.string()
            .email('Enter a valid email')
            .notRequired()
    });

    return (
        <Body children={
            <View style={{ alignItems: 'center' }} >
                <Badge text={localFirstName !== '' ? ('Hi, ' + localFirstName) : 'Step One'} />
                <Formik
                    initialValues={{ firstName: '', lastName: '', email: '' }}
                    onSubmit={values => { console.log(values) }}
                    validationSchema={profileStep1Schema}
                >
                    {({ handleChange, values, errors }) => {

                        useEffect(() => {
                            dispatch(setFirstName(values.firstName))
                        }, [values.firstName]);

                        useEffect(() => {
                            dispatch(setLastName(values.lastName))
                        }, [values.lastName]);

                        useEffect(() => {
                            dispatch(setEmail(values.email.toLowerCase()))
                        }, [values.email]);

                        return (
                            <>
                                <Input label='First Name' value={values.firstName} onChangeText={handleChange('firstName')} inputMode='text' />
                                <Text style={styles.text_error}>{errors.firstName}</Text>
                                <Input label='Last Name' value={values.lastName} onChangeText={handleChange('lastName')} inputMode='text' />
                                <Text style={styles.text_error}>{errors.lastName}</Text>
                                <Input label='Email' value={values.email} onChangeText={handleChange('email')} inputMode='email' />
                                <Text style={styles.text_error}>{errors.email}</Text>
                            </>
                        )
                    }}
                </Formik>
                {/* <Input label='First Name' value={localFirstName} onChangeText={onChangeTextFirstName} inputMode='text' />
                <Input label='Last Name' value={localLastName} onChangeText={onChangeTextLastName} inputMode='text' />
                <Input label='Email' value={localEmail} onChangeText={onChangeTextEmail} inputMode='email' /> */}
            </View>
        }
            reverseColor={true}
            buttonText='Continue'
            buttonOnPress={onPress}
        />
    );
}
export default React.memo(compose(withPersistentStore, withQueryClientProvider)(ProfileStep1Screen))

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
    },
    image_logo: {
        marginTop: 63,
        tintColor: '#ffffff',
        width: 80,
        height: 20
    },
    text_error: {
        fontSize: 11,
        color: 'red',
        marginTop: 2
    },
});