import React, { Component } from 'react';
import {
	View,
	Text,
	ImageBackground,
	Image,
	TouchableOpacity,
	StatusBar,
	AsyncStorage,
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
			jam: '00:00:00',
			month: '0',
			day: '0',
			count: 1,
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
		this.setState({ date: year + "-" + month + "-" + date });
		this.setState({ jam: hours + ":" + min + ":" + sec });
		AsyncStorage.setItem('count', 1);
		AsyncStorage.getItem('count').then((value) => console.log(value) );
		if (this.state.gambar == pintuImg) {
			this.setState({ gambar: pintu2Img, buttonText: 'Pintu Terbuka', btnContainer: styles.btnDelete2, btnText: styles.textDelete2 });
			// console.log(solenoid);
			var solenoid = '1';
			firebase.database().ref().child('solenoid').set({
				solenoid
			}).then(()=>{
				var a = this.state.date.split('-');
				if(a[1].length == 1) {
					if(a[2].length == 1) {
						this.setState({ date: a[0] + '-0' + a[1] + '-0' + a[2] });
					} else {
						this.setState({ date: a[0] + '-0' + a[1] + '-' + a[2] });
					}
				};
				console.log(this.state.jam);
				
				// var b = this.state.jam.split('-');
				// if(b[0].length == 1) {
				// 	b[0] = '0' + b[0]
				// };
				// if(b[1].length == 1) {
				// 	b[1] = '0' + b[1]
				// };
				// if(b[2].length == 1) {
				// 	b[2] = '0' + b[2]
				// };
				// this.setState({ jam: b[0] + ':' + b[1] + ':' + b[2]});
				// firebase.database().ref().child('log').child(this.state.date).child(this.props.navigation.state.params.username).set({
				// 	nama: this.props.navigation.state.params.nama,
				// });
				firebase.database().ref().child('log').child(this.state.date).child(this.props.navigation.state.params.username).child(this.state.count).set({
					username: this.props.navigation.state.params.username,
					nama: this.props.navigation.state.params.nama,
					jam: this.state.jam,
					tgl: this.state.date,
				});
				this.state.count = this.state.count + 1;
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