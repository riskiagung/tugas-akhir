import React, { Component } from 'react';
import {
	ImageBackground,
	TouchableOpacity,
	View,
    Image,
    FlatList,
    Text,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import firebase from 'firebase';

import bgImage from '../../images/bg-01.png'
import logoImage from '../../images/logo3-02.png'

import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons';

class ListScreen extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
        };
    }

    openList = () => {
        const { users } = this.state;
        firebase.database().ref().child('User').on('value', (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if(users.some(e => e.username == childSnapshot.val()['username'])) {
                    
                } else {
                    users.push(childSnapshot.val());
                }
            });
            users.sort((a, b) => (a.nama > b.nama) ? 1 : -1);
        });
    };

	static navigationOptions = {
        headerShown: false
    }

    componentDidMount() {
        //Here is the Trick
        const { navigation } = this.props;
        //Adding an event listner om focus
        //So whenever the screen will have focus it will set the state to zero
        this.focusListener = navigation.addListener('didFocus', () => {
            this.setState({ users: [] });
        });
    }

    componentWillUnmount() {
        // Remove the event listener before removing the screen from the stack
        this.focusListener.remove();
    }

    keyExtractor = (item, index) => index.toString()

    renderItem = ({ item }) => (
        <ListItem
            title={item.nama}
            subtitle={`username: ${item.username}`}
            leftAvatar={<Icon name='ios-contact' size={50} color={'rgba(0, 0, 0, 0.7)'} />}
            bottomDivider
            chevron
            containerStyle={{ borderBottomWidth: 0, padding: 10 }}
            onPress={() => this.props.navigation.navigate('UserDetail', {
                nama: item.nama,
                username: item.username,
                password: item.password,
            })}
        />
    );

    renderSeparator = () => {
        return (
            <View
                style= {{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#CED0CE',
                    marginLeft: '19.5%'
                }}
            />
        )
    };

	render () {
        this.openList();
		return (
			<ImageBackground source={bgImage} style={styles.backgroundContainer}>
				<View style={styles.navContainer}>
					<Image source={logoImage} style={styles.logo} />
                    <Text style={styles.text}>Daftar Penghuni</Text>
				</View>
                <View style={styles.table}>
                    <FlatList
                        keyExtractor={this.keyExtractor}
                        data={this.state.users}
                        renderItem={this.renderItem}
                        style={styles.listContainer}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </View>
                <TouchableOpacity style={styles.btnAdd} onPress={() => this.props.navigation.navigate('Register')}>
                    <Icon 
                        name={'ios-add-circle'}
                        size={70}
                        color={'red'}
                    />
                </TouchableOpacity>
            </ImageBackground>
		);
	}
}

export default ListScreen