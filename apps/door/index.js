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
import Dialog, { DialogContent, ScaleAnimation } from 'react-native-popup-dialog';

import styles from './styles';

import bgImage from '../../images/bg-01.png';
import logoImage from '../../images/logo3-02.png';
import Icon from 'react-native-vector-icons/Ionicons';


class UserDetailScreen extends Component {
	static navigationOptions = {
        headerShown: false
    }
	constructor() {
		super()
		this.state = {
			showPass: true,
			press: false,
			buttonText: 'Delete User'
		}
	}

	// onDeletePress = () => {
		
	// }

	showPass = () => {
		if (this.state.press == false) {
			this.setState({ showPass: false, press: true })
		} else {
			this.setState({ showPass: true, press: false })
		}
	}

	render () {
		const { navigation } = this.props;
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
						underlineColorAndroid='transparent'
						value={`Username:\t ${navigation.getParam('username')}`}
						editable={false}
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
						underlineColorAndroid='transparent'
						value={`Nama:\t ${navigation.getParam('nama')}`}
						editable={false}
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
						secureTextEntry={this.state.showPass}
						underlineColorAndroid='transparent'
						value={navigation.getParam('password')}
						editable={false}
					/>

					<TouchableOpacity style={styles.btnEye} onPress={this.showPass.bind(this)}>
						<Icon
							name={this.state.press == false ? 'ios-eye':'ios-eye-off'}
							size={26}
							color={'white'}
						/>
					</TouchableOpacity>
				</View>

				<View>
					<Text style={styles.text}>untuk melihat password silahkan klik tanda mata</Text>
				</View>

				<TouchableOpacity style={styles.btnDelete} onPress={() => {this.setState({error: '', buttonText: 'Wait', visible: true})}}>
					<Text style={styles.textDelete}>{this.state.buttonText}</Text>
				</TouchableOpacity>
				
				<Dialog
					visible={this.state.visible}
					dialogAnimation={new ScaleAnimation({
						initialValue: 0,
						useNativeDriver: true,
					})}
					onTouchOutside={() => {this.setState({ visible: false, buttonText: 'Delete User' });}}
				>
					<DialogContent style={styles.dialogContainer}>
						<View style={styles.textContainer}>
							<Text style={styles.textDialog}>Apakah anda yakin untuk menghapus penghuni ini?</Text>
						</View>
						<View style={styles.btnContainer}>
							<TouchableOpacity style={styles.btnCancel} onPress={() => {this.setState({visible: false, buttonText: 'Delete User'})}}>
								<Text>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.btnYakin} onPress={() => {
								firebase.database().ref().child('User/'+navigation.getParam('username')).remove();
								this.props.navigation.navigate('List');
								this.setState({ visible: false });
							}}>
								<Text style={{color: 'white'}}>Yakin</Text>
							</TouchableOpacity>
						</View>
					</DialogContent>
				</Dialog>
			</ImageBackground>
		);
	}
}

export default UserDetailScreen