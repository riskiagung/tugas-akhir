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
	navContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	logo: {
		marginLeft: 20,
		height: 25,
		width: 110,
		// justifyContent: 'flex-start',
	},
    btnAdd: {
		position: 'absolute',
		right: 30,
		bottom: 23,
	},
	table: {
		flex: 1,
		backgroundColor: 'white',
		margin: 15,
		borderRadius: 30,
	},
	listContainer: {
		margin: 10,
	},
	text: {
		color: 'white',
		fontSize: 20,
		fontFamily: 'Poppins-Regular',
		marginRight: 25,
		marginTop: 5,
	}
});

export default styles