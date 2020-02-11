import {
	StyleSheet,
} from 'react-native';

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		paddingTop: 30,
		width: null,
		height: null,
	},
	btnRegister: {
		position: 'absolute',
		right: 30,
		bottom: 23,
	},
	textRegister: {
		color: 'white',
		fontSize: 16,
	},
	navContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	logo: {
		marginLeft: 20,
		height: 25,
		width: 110,
		justifyContent: 'flex-start',
	},
	btnContainer: {
		justifyContent: 'flex-end',
	},
	textNav: {
		color: 'white',
		fontSize: 20,
		fontFamily: 'Poppins-Regular',
		marginRight: 25,
		marginTop: 5,
	},
	table: {
		flex: 1,
		backgroundColor: 'white',
		margin: 15,
		borderRadius: 30,
		padding: 10,
		flexDirection: 'column',
	},
	headerContainer: {
		// backgroundColor: 'yellow',
		alignItems: 'center',
	},
	headerText: {
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
	},
	listContainer: {
		// backgroundColor: 'red',
		flex: 1,
	},
});

export default styles