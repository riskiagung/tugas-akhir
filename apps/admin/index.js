import React, { Component } from 'react';
import {
	ImageBackground,
	TouchableOpacity,
	Text,
	View,
	Image,
} from 'react-native';

import firebase from 'firebase';

import bgImage from '../../images/bg-01.png';
import logoImage from '../../images/logo3-02.png';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements';

class AdminScreen extends Component {
	constructor() {
		super();
		this.state = {
			log: [],
		}
	}

	static navigationOptions = {
        headerShown: false
	}
	
	openLog = () => {
		const { log } = this.state;
		firebase.database().ref().child('log').child('2020-01-17').on('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {
				if(log.some(e => e.username == childSnapshot.value()['username'])) {

				} else {
					log.push(childSnapshot.val());
				}
			})
		})
	}

	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => (
		<ListItem
			title={item.nama}
			subtitle={item.tgl}
			leftAvatar={<Icon name='ios-contact' size={50} color={'rgba(0, 0, 0, 0.7)'} />}
			bottomDivider
			chevron
			containerStyle={{ borderBottomWidth: 0, padding: 10, }}
			// onPress
		/>
	)

	render () {
		this.openLog();
		return (
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>
				<View style={styles.navContainer}>
					<Image source={logoImage} style={styles.logo} />
					<View style={styles.btnContainer}>
						<Text style={styles.textNav}>{this.props.navigation.state.params.nama}</Text>
					</View>
				</View>
				<View style={styles.table}>
					<View style={styles.headerContainer}>
						<Text style={styles.headerText}>Log pintu terbuka</Text>
					</View>
					<View style={styles.listContainer}>
						
					</View>
                </View>
				<TouchableOpacity style={styles.btnRegister} onPress={() => this.props.navigation.navigate('List')}>
					<Icon 
						name={'ios-contact'}
						size={70}
						color={'red'}
					/>
				</TouchableOpacity>
			</ImageBackground>
		);
	}
}

export default AdminScreen