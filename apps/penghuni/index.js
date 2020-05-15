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
			date: '2020-01-01',
			jam: '00:01',
			month: '1',
		}
	}

	open = () => {
		// const { solenoid } = this.state;
		var date = new Date().getDate();
		var month = new Date().getMonth()+1;
		var year = new Date().getFullYear();
		var hours = new Date().getHours();
		var min = new Date().getMinutes();
		var sec = new Date().getSeconds();
		this.setState({ month: month });
		if(this.state.month.length == 1){
			this.setState({ date: year + "-0" + month + "-" + date });
		} else {
			this.setState({ date: year + "-" + month + "-" + date });
		};
		this.setState({ jam: hours + ":" + min + ":" + sec });
		if (this.state.gambar == pintuImg) {
			this.setState({ gambar: pintu2Img, buttonText: 'Pintu Terbuka', btnContainer: styles.btnDelete2, btnText: styles.textDelete2 });
			// console.log(solenoid);
			var solenoid = '1';
			firebase.database().ref().child('solenoid').set({
				solenoid
			}).then(()=>{
				firebase.database().ref().child('log').child(this.state.date).child(this.props.navigation.state.params.username).child(this.state.jam).set({
					username: this.props.navigation.state.params.username,
					nama: this.props.navigation.state.params.nama,
					jam: this.state.jam,
					tgl: this.state.date,
				})
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

                <TouchableOpacity style={styles.btnContainerLog} onPress={() => this.props.navigation.navigate('Log', {
					nama: this.props.navigation.state.params.nama,
					username: this.props.navigation.state.params.username,
				})}>
					<Text style={styles.btnTextLog}>Log</Text>
				</TouchableOpacity>
			</ImageBackground>
		);
	}
}

export default DoorScreen