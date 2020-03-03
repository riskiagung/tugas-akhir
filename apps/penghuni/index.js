import React, { Component } from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity,
	StatusBar,
} from 'react-native';
import firebase from '../firebase'

import styles from './styles';

import bgImage from '../../images/bg-01.png';
import logoImage from '../../images/logo3-02.png';
import pintuImg from '../../images/pintu-01.png';
import pintu2Img from '../../images/pintu2-01.png';


class DoorScreen extends Component {
	static navigationOptions = {
        headerShown: false
    }
	constructor() {
		super()
		this.state = {
			gambar: pintuImg,
			buttonText: 'Buka Kunci Pintu',
			btnContainer: styles.btnDelete,
			btnText: styles.textDelete,
		}
	}

	open = () => {
		// const { solenoid } = this.state;
		if (this.state.gambar == pintuImg) {
			this.setState({ gambar: pintu2Img, buttonText: 'Pintu Terbuka', btnContainer: styles.btnDelete2, btnText: styles.textDelete2 });
			// console.log(solenoid);
			var solenoid = '1';
			firebase.database().ref().child('solenoid').set({
				solenoid
			}).then(()=>{
				
			}).catch(()=>{
				
			});
		};
		setTimeout(() => {
			if (this.state.gambar == pintu2Img) {
				this.setState({ gambar: pintuImg, buttonText: 'Buka Kunci Pintu', btnContainer: styles.btnDelete, btnText: styles.textDelete });
				// console.log(solenoid);
				var solenoid = '0';
				firebase.database().ref().child('solenoid').set({
					solenoid
				}).then(()=>{
					
				}).catch(()=>{
					
				});
			};
		}, 5000);
	}

	render () {
		const { navigation } = this.props;
		return (	
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>
				<StatusBar translucent backgroundColor="transparent" />
				<View style={styles.logoContainer}>
					<Image source={logoImage} style={styles.logo} />
				</View>

				<View style={styles.pintuContainer}>
					<Image source={this.state.gambar} style={styles.pintuImage} />
				</View>

				<TouchableOpacity style={this.state.btnContainer} onPress={this.open}>
					<Text style={this.state.btnText}>{this.state.buttonText}</Text>
				</TouchableOpacity>

                <TouchableOpacity style={styles.btnContainerLog}>
					<Text style={styles.btnTextLog}>Log</Text>
				</TouchableOpacity>
			</ImageBackground>
		);
	}
}

export default DoorScreen