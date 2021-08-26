import React, { Component } from 'react';
import {
	ImageBackground,
	Text,
	View,
	Image,
	RefreshControl,
} from 'react-native';

import firebase from 'firebase';

import bgImage from '../../images/bg-01.png';
import logoImage from '../../images/logo3-02.png';

import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { ListItem } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import DatePicker from 'react-native-datepicker';

class LogAdminScreen extends Component {
	constructor() {
		super();
		this.state = {
			log: [],
			refreshing: false,
			date: "2020-01-01",
		}
	}

	_onRefresh = () => {
		this.setState({refreshing: true});
		this.setState({refreshing: false});
		// console.log(this.state.log);
	}

	static navigationOptions = {
        headerShown: false
	}
	
	openLog = () => {
		const { log } = this.state;
		var a = this.state.date.split('-');
		if(a[1].length == 1) {
			if(a[2].length == 1) {
				this.setState({ date: a[0] + '-0' + a[1] + '-0' + a[2] });
			} else {
				this.setState({ date: a[0] + '-0' + a[1] + '-' + a[2] });
			}
		};
		// console.log(this.state.date);
		firebase.database().ref().child('log').child(this.state.date).child(this.props.navigation.state.params.username).once('value', (snapshot) => {
			snapshot.forEach((childSnapshot) => {
                // if(typeof childSnapshot.val() !== typeof ""){
                    log.push(childSnapshot.val());
                // }
			})
			// console.log(this.state.date);
			// console.log(this.props.navigation.state.params.username);
            console.log(snapshot.val());
            // console.log(this.state.log);
        });
	}

	keyExtractor = (item, index) => index.toString();

	renderItem = ({ item }) => (
		<ListItem
			// title={item.nama}
			title={item.jam}
			// subtitle={'Pukul ' + item.jam}
			leftAvatar={<Icon name='md-contact' size={50} color={'rgba(0, 0, 0, 0.7)'} />}
			bottomDivider
			chevron
			containerStyle={{ borderBottomWidth: 0, padding: 10, }}
			// onPress
		/>
	)

	renderSeparator = () => {
		return (
			<View
				style= {{
					height:1,
					width: '100%',
					backgroundColor: '#CED0CE',
					marginLeft: '19.5%'
				}}
			/>
		)
	}

	componentDidMount() {
		var date = new Date().getDate();
		var month = new Date().getMonth()+1;
		var year = new Date().getFullYear();
		this.setState({ date: year + "-" + month + "-" + date });
		setTimeout(() => {
			this.openLog();
		}, 100);
		setTimeout(() => {
			this.setState({refreshing: true});
			this.setState({refreshing: false});
		}, 100);
	}

	render () {
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
						<DatePicker
							style={styles.datePicker}
							date={this.state.date}
							mode="date"
							placeholder="select date"
							format="YYYY-MM-DD"
							minDate="2020-01-01"
							confirmBtnText="Confirm"
							cancelBtnText="Cancel"
							customStyles={{
								dateIcon: {
									position: 'absolute',
									left: 0,
									top: 4,
									marginLeft: 0,
								},
								dateInput: {
									marginLeft: 36,
								}
							}}
							onDateChange={(date) => {
								this.setState({date: date, log: []});
								this.openLog();
								setTimeout(() => {
									this.setState({refreshing: true});
									this.setState({refreshing: false});
								}, 500);
								// this._onRefresh();
							}}
						/>
					</View>
					<View style={styles.listContainer}>
						<FlatList
							refreshControl={
								<RefreshControl
									refreshing={this.state.refreshing}
									onRefresh={this._onRefresh}
								/>
							}
							keyExtractor={this.keyExtractor}
							data={this.state.log}
							renderItem={this.renderItem}
							style={styles.itemListContainer}
							ItemSeparatorComponent={this.renderSeparator}
						/>
					</View>
                </View>
			</ImageBackground>
		);
	}
}

export default LogAdminScreen