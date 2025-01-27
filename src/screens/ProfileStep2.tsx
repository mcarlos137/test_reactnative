//PRINCIPAL
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
//NAVIGATION
import { NavigationContext } from "@react-navigation/native";
//REDUX
import { compose } from 'redux';
import { useSelector, useDispatch } from "react-redux";
import { setId, setPhone } from '../reducers/user';
//COMPONENTS
import Body from '../components/Body';
import Badge from '../components/Badge';
import Input from '../components/Input';
//TYPES
import { User } from '../types';
//HOC
import { withPersistentStore, withQueryClientProvider } from '../hoc';
//HOOKS
import { getUserById } from '../hooks/getUserById';
import { createUser } from '../hooks/createUser';
import { updateUser } from '../hooks/updateUser';

const ProfileStep2Screen = () => {

    const navigation = useContext(NavigationContext);

    const dispatch = useDispatch();
    const user = useSelector<any, User>(state => state.user);

    const { data: dataGetUserById, isSuccess: isSuccessGetUserById } = getUserById(user.id)
    const {
        mutate: mutateCreateUser,
        isSuccess: isSuccessCreateUser,
        isError: isErrorCreateUser,
        error: errorCreateUser,
        data: dataCreateUser
    } = createUser()
    const {
        mutate: mutateUpdateUser,
        isSuccess: isSuccessUpdateUser,
        isError: isErrorUpdateUser,
        error: errorUpdateUser,
        data: dataUpdateUser
    } = updateUser()

    const isPhoneValid = useMemo(() => {
        if (user.phone.length >= 10) {
            return true
        }
        return false
    }, [user.phone])

    const onPress = () => {
        // Validating phone
        if (!isPhoneValid) {
            Alert.alert('Form error', 'Enter a valid phone', [
                { text: 'OK' },
            ]);
            return
        }
        // Sending http request
        if (!dataGetUserById || user.id === '') {
            // Creating new user
            console.log('CREATING NEW USER')
            mutateCreateUser(user)
        } else if (
            dataGetUserById.firstName !== user.firstName ||
            dataGetUserById.lastName !== user.lastName ||
            dataGetUserById.email !== user.email ||
            dataGetUserById.phone !== user.phone
        ) {
            // Updating existing user
            console.log('UPDATING EXISTING USER')
            mutateUpdateUser(user)
        } else {
            console.log('DO NOTHING')
            Alert.alert('', 'User data already exists', [
                { text: 'OK' },
            ]);
        }
    }

    const onChangeTextPhone = useCallback((text: string) => {
        dispatch(setPhone(text.replace(/[^0-9]/g, '')))
    }, [])

    useEffect(() => {
        navigation?.setOptions({
            headerTitle: '',
            headerStyle: {
                backgroundColor: 'white',
            },
            headerBackTitle: 'Go Back',
            headerBackTitleStyle: { fontSize: 16, fontWeight: 600, color: '#2C91CF' },
        })
    }, []);

    useEffect(() => {
        if (dataCreateUser?.data) {
            dispatch(setId(dataCreateUser.data.id))
        }
    }, [dataCreateUser]);

    useEffect(() => {
        if (isSuccessCreateUser || isSuccessUpdateUser) {
            Alert.alert('', `User was ${isSuccessCreateUser && 'created' || isSuccessUpdateUser && 'updated'} successfully`, [
                { text: 'OK' },
            ]);
            return
        }
        if (isErrorCreateUser || isErrorUpdateUser) {
            Alert.alert('Request error', `There was an error ${isErrorCreateUser && 'creating new' || isErrorUpdateUser && 'updating'} user. Contact admin at admin@example.com`, [
                { text: 'OK' },
            ]);
        }
    }, [isSuccessCreateUser, isErrorCreateUser, isSuccessUpdateUser, isErrorUpdateUser]);

    useEffect(() => {
        if(dataGetUserById){
            console.log('dataGetUserById', dataGetUserById)
        }
    }, [dataGetUserById])

    return (
        <Body children={
            <View style={{ alignItems: 'center' }} >
                <Badge text={'Step Two'} />
                <Input label='Phone Number' value={user.phone} onChangeText={onChangeTextPhone} inputMode='numeric' />
            </View>

        }
            reverseColor={true}
            buttonText='Save'
            buttonOnPress={onPress}
        />
    );
}

export default React.memo(compose(withPersistentStore, withQueryClientProvider)(ProfileStep2Screen))

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
});