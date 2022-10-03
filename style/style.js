import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    fontFamily:'MontserratRegular',
    fontWeight:'bold',
    padding:10,
    borderRadius:50
  },
  header: {
    marginTop: 30,
    backgroundColor: '#274060',
    flexDirection: 'row',
    fontFamily: 'PoppinsRegular',
    borderTopEndRadius:50,
    borderTopStartRadius:50
  },
  footer: {
    flexDirection: 'row',
    borderBottomEndRadius:50,
    borderBottomStartRadius:50,
    backgroundColor: '#274060',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 23,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'MontserratRegular'
  },
  author: {
    color: '#fff',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 15,
    textAlign: 'center',
    margin: 10,
    fontFamily: 'MontserratRegular'
    
  },
  gameboard: {
    backgroundColor: '#CCDBDC',
    alignItems: 'center',
    justifyContent: 'center'
  },
  gameinfo: {
    backgroundColor: '#fff',
    padding:5,
    borderRadius:50,
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 10,
    fontFamily: 'MontserratRegular'
  },
  row: {
    marginTop: 20,
    padding: 10
  },
  flex: {
    flexDirection: "row"
  },
  grid:{
    alignItems: 'center'
  },
  button: {
    margin: 30,
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#3d6496",
    width: 'auto',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    color:"#fff",
    fontSize: 22
  },
  totalText: {
    backgroundColor: '#fff',
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 25,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 15,
    padding:5,
    fontFamily:'PoppinsRegular'
  },
  bonusText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 5,
    fontWeight:'bold',
    fontFamily:'PoppinsRegular',
    marginBottom: 5
  },
  bonusWinText: {
    textAlign: 'center',
    justifyContent: 'center',
    fontSize: 20,
    marginTop: 5,
    textTransform: 'capitalize',
    color:'#86B049',
    fontWeight:'bold',
    fontFamily:'PoppinsRegular',
    marginBottom: 5,
  }
});