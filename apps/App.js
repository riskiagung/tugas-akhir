import React, { Component } from 'react';
import 'react-native-gesture-handler';
import { createAppContainer, StackActions, NavigationActions } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Firebase from './firebase';

import LoginScreen from './login/index';
import AdminScreen from './admin/index';
import RegisterScreen from './register/index';
import ListScreen from './list_user/index';
import UserDetailScreen from './user_detail/index';
import DoorScreen from './door/index';
import PenghuniScreen from './penghuni/index';
import { AsyncStorage, View } from 'react-native';

Firebase.auth().signInWithEmailAndPassword('riski97@gmail.com', 'sug1mun4');

class InitScreen extends Component {
	render () {
		return (
			<View>

			</View>
		);
	}
};

const RootStack = createStackNavigator(
	{
		Init: InitScreen,
		Login: LoginScreen,
		Admin: AdminScreen,
		List: ListScreen,
		Register: RegisterScreen,
		UserDetail: UserDetailScreen,
		Door: DoorScreen,
		Penghuni: PenghuniScreen,
	},
	{
		initialRouteName: 'Login',
	}
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
	// componentDidMount = () => {
	// 	AsyncStorage.getItem('loginID').then((value) => {
	// 		const resetAction = NavigationActions.navigate	({
	// 			routeName: 'Login',
	// 			params: {},
	// 			action: NavigationActions.navigate({ routeName: value === null ? 'Admin' : 'Login'}),
	// 		});
	// 		this.props.navigation.dispatch(resetAction);
	// 	})
	// }

	componentWillUnmount = () => {
		AsyncStorage.getItem('loginID');
	}

	render () {
		return <AppContainer />;
	}
}
