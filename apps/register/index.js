import React, { Component } from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	TextInput,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import firebase from '../firebase'

import styles from './styles';

import bgImage from '../../images/bg-01.png';
import logoImage from '../../images/logo3-02.png';
import Icon from 'react-native-vector-icons/Ionicons';


class RegisterScreen extends Component {
	static navigationOptions = {
        headerShown: false
    }
	constructor() {
		super()
		this.state = {
			username: '',
			nama: '',
			password: '',
			password2: '',
			error: 'Jika proses selesai, \nberitahu Password ke pemilik akun',
			buttonText: 'Register',
			try: 1,
		}
	}

	onRegisterPress = () => {
		this.setState({error: '', buttonText: 'Wait'});
		const{ username, nama, password, password2 } = this.state;

		if(username == '' || password == '' || password2 == '' || nama == '') {
			this.setState({ error: 'Mohon lengkapi form', buttonText: 'Register' });
		} else if(password != password2){
			this.setState({ error: 'Password tidak cocok', buttonText: 'Register' });
		} else {
			firebase.database().ref().child('User/'+username).set({
				username,
				nama,
				password
			}).then(()=>{
				this.setState({ error: 'data berhasil di daftarkan', buttonText: 'Success' });
				// this.props.navigation;
				setTimeout(() => {
					this.setState({ error: 'Jika proses selesai, \nberitahu Password ke pemilik akun', buttonText: 'Register', username: '', nama: '', password: '', password2: '' });}, 3000);
					this.props.navigation.navigate('List');
			}).catch(()=>{
				this.setState({ error: 'Register gagal', buttonText: 'Register' });
			});
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
						name={'ios-contact'}
						size={28}
						color={'white'}
						style={styles.inputIcon}
					/>

					<TextInput
						style={styles.input}
						placeholder={'Nama Lengkap'}
						placeholderTextColor={'white'}
						underlineColorAndroid='transparent'
						value={this.state.nama}
						onChangeText={nama => this.setState({nama})}
						autoCapitalize={'words'}
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
						secureTextEntry={true}
						placeholderTextColor={'white'}
						underlineColorAndroid='transparent'
						value={this.state.password}
						onChangeText={password => this.setState({password})}
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
						placeholder={'Re-Insert Password'}
						secureTextEntry={true}
						placeholderTextColor={'white'}
						underlineColorAndroid='transparent'
						value={this.state.password2}
						onChangeText={password2 => this.setState({password2})}
					/>
				</View>

				<TouchableOpacity style={styles.btnLogin} onPress={this.onRegisterPress}>
					<Text style={styles.textLogin}>{this.state.buttonText}</Text>
				</TouchableOpacity>
				<View>
					<Text style={styles.text}>{this.state.error}</Text>
				</View>
			</ImageBackground>
		);
	}
}

export default RegisterScreen