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
	btnPintu: {
		position: 'absolute',
		bottom: 23,
		right:100,
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
		justifyContent: 'space-around',
		flexDirection: 'row'
	},
	headerText: {
		fontSize: 16,
		fontFamily: 'Poppins-Regular',
		// backgroundColor: 'red',
	},
	datePicker: {
		width: 150,
		// backgroundColor: 'yellow',
	},
	listContainer: {
		// backgroundColor: 'red',
		flex: 1,
	},
	lockImg: {
		height: 57,
		width: 57,
		marginBottom: 6,
	},
});

export default styles