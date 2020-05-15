import React, { Component } from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	TextInput,
	TouchableOpacity,
	StatusBar,
	AsyncStorage,
} from 'react-native';
import firebase from 'firebase';

import styles from './styles';

import bgImage from '../../images/bg-01.png';
import logoImage from '../../images/logo3-02.png';
import Icon from 'react-native-vector-icons/Ionicons';

import { YellowBox } from 'react-native';


class LoginScreen extends Component {
	static navigationOptions = {
        headerShown: false
	}
	
	constructor() {
		super();
		YellowBox.ignoreWarnings(['Setting a timer']);
		this.state = {
			showPass: true,
			press: false,
			username: '',
			password: '',
			error: '',
			buttonText: 'Login',
			try: 1,
			users: {},
			loginID: '',
		}
	}

	openList = () => {
        firebase.database().ref().child('User').once('value', (snapshot) => {
            this.setState({users: snapshot.toJSON()});
        });
	};
	
	setLoginID = (value) => {
		AsyncStorage.setItem('loginID', value);
		this.setState({ loginID: value });
	}

    componentDidMount= () => {
		this.openList();
		AsyncStorage.getItem('loginID').then((value) => this.setState({ loginID: value }));
		// if(this.state.loginID !== ''){
		// 	this.props.navigation.navigate('Admin', {
		// 		nama: this.state.loginID,
		// 	});
		// }
	}
	
	componentWillUnmount = () => {
		this.openList();
	}

	onLoginPress = () => {
		this.setState({error: '', buttonText: 'Wait'});
		const{ username, password, users } = this.state;

		console.log(users);

		if(username == '' || password == '') {
			this.setState({ error: 'Mohon masukkan Email dan Password', buttonText: 'Login' })
		} else {
			for (const [key, value] of Object.entries(users)) {
				if(username == value['username'] && password == value['password']) {
					if(username == 'admin') {
						this.props.navigation.navigate('Admin', {
							nama: value['nama'],
						});
					} else {
						this.props.navigation.navigate('Penghuni', {
							nama: value['nama'],
							username: value['username'],
						});
					}
					
					this.setLoginID(value['nama']);
					break;
				}
			};
			if(this.state.try != 3) {
				this.state.try ++;
				this.setState({ error: 'Username dan Password salah', buttonText: 'Login' });
			} else {
				this.setState({ error: 'Lupa Password? Silahkan tanya ke Admin', buttonText: 'Login' });
				this.state.try = 1;
			}
		}
	}

	showPass = () => {
		if (this.state.press == false) {
			this.setState({ showPass: false, press: true })
		} else {
			this.setState({ showPass: true, press: false })
		}
	}
	render () {
		return (	
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>
				<StatusBar translucent backgroundColor="transparent" />
				<View style={styles.logoContainer}>
					<Image source={logoImage} style={styles.logo} />
				</View>

				<View style={styles.inputContainer}>
					<Icon
						name={'ios-contact'}
						size={28}
						color={'white'}
						style={styles.inputIcon}
					/>

					<TextInput
						style={styles.input}
						placeholder={'Username'}
						placeholderTextColor={'white'}
						underlineColorAndroid='transparent'
						value={this.state.username}
						onChangeText={username => this.setState({username})}
						autoCapitalize={'none'}
					/>
				</View>

				<View style={styles.inputContainer}>
					<Icon
						name={'ios-finger-print'}
						size={28}
						color={'white'}
						style={styles.inputIcon}
					/>

					<TextInput
						style={styles.input}
						placeholder={'Password'}
						secureTextEntry={this.state.showPass}
						placeholderTextColor={'white'}
						underlineColorAndroid='transparent'
						value={this.state.password}
						onChangeText={password => this.setState({password})}
					/>

					<TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
						<Icon
							name={this.state.press == false ? 'ios-eye':'ios-eye-off'}
							size={26}
							color={'white'}
						/>
					</TouchableOpacity>
				</View>

				<TouchableOpacity style={styles.btnLogin} onPress={this.onLoginPress.bind(this)}>
					<Text style={styles.textLogin}>{this.state.buttonText}</Text>
				</TouchableOpacity>

				<View>
					<Text style={styles.text}>{this.state.error}</Text>
				</View>

				<View>
					<Text style={styles.text}>{this.state.loginID}</Text>
				</View>

			</ImageBackground>
		);
	}
}

export default LoginScreen