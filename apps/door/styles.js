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
	input: {
		width: WIDTH - 100,
		height: 45,
		borderRadius: 45,
		fontSize: 16,
		paddingLeft: 45,
		backgroundColor: 'rgba(255, 255, 255, 0.3)',
		color: 'white',
		marginHorizontal: 25,
	},
	inputIcon: {
		position: 'absolute',
		top: 8,
		left: 37,
	},
	inputContainer: {
		marginTop: 10,
	},
	btnEye: {
		position: 'absolute',
		top: 9,
		right: 37
	},
	btnDelete: {
		width: WIDTH - 100,
		height: 45,
		borderRadius: 45,
		backgroundColor: 'rgba(255, 0, 0, 0.8)',
		justifyContent: 'center',
		marginTop: 20,
	},
	textDelete: {
		color: 'white',
		fontSize: 16,
		textAlign: 'center'
	},
	text: {
		color: 'white',
		marginTop: 25,
		fontSize: 11,
		textAlign: 'center',
	},
	dialogContainer: {
		width: 300,
		height: 150,
	},
	textContainer: {
		// backgroundColor: 'yellow',
		marginTop: 20
	},
	textDialog: {
		fontSize: 16,
		textAlign: 'center',
	},
	btnContainer: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'space-around'
	},
	btnCancel: {
		backgroundColor: 'rgba(0, 0, 0, 0.1)',
		width: 110,
		height: 45,
		borderRadius: 45,
		alignItems: 'center',
		justifyContent: 'center',
	},
	btnYakin: {
		backgroundColor: 'rgba(255, 0, 0, 0.8)',
		width: 110,
		height: 45,
		borderRadius: 45,
		alignItems: 'center',
		justifyContent: 'center',
	}
});

export default styles