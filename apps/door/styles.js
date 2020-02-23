import {
	StyleSheet,
	Dimensions,
} from 'react-native';

const { width: WIDTH } = Dimensions.get('window')

const styles = StyleSheet.create({
	backgroundContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: null,
		height: null,
	},
	logoContainer: {
		alignItems: 'center',
		marginBottom: 25,
	},
	logo: {
		height: 50,
		width: 200
	},
	btnDelete: {
		width: WIDTH - 100,
		height: 45,
		borderRadius: 45,
		backgroundColor: 'rgba(255, 0, 0, 0.8)',
		justifyContent: 'center',
		marginTop: 20,
	},
	btnDelete2: {
		width: WIDTH - 100,
		height: 45,
		borderRadius: 45,
		backgroundColor: 'rgba(255, 255, 255, 0.8)',
		justifyContent: 'center',
		marginTop: 20,
	},
	textDelete: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	},
	textDelete2: {
		color: 'black',
		fontSize: 16,
		textAlign: 'center'
	},
});

export default styles