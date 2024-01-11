import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../../constants";
import { BORDERRADIUS } from "../../../constants/theme";


const containerStyles =  
    StyleSheet.create({
        container: {
          alignItems: 'center',
          backgroundColor:COLORS.backgroundColor, 
          justifyContent: 'space-between',
          flex: 1,
        },
        bottom: {
          flex: 1,
          backgroundColor:COLORS.backgroundColor, 
          justifyContent: 'flex-end',
          marginBottom: 10
        },
})   
const imageStyles =  
    StyleSheet.create({
      image1: {
        flex: 1,
        resizeMode:"center",
        alignItems: "center",
        width: 450,
        height: 500
      },
      image2: {
        resizeMode:"center",
        alignItems: "center",
        width: 300,
        height: 300
      },
      backgroundImage: {
        alignItems: "center",
        flex: 1,
        justifyContent: 'center',
        resizeMode:"cover",
      },
})   

const styles = StyleSheet.create({
 
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.primaryTextColor,
    marginTop: 50,
    fontFamily: "kumarOne",
  },
  buttonText: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: 'white',
  },
  undertitle: {
    fontSize: SIZES.medium,
    color: '#000',
    marginTop: 10
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  bottom: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor, 
    justifyContent: 'flex-end',
    marginTop: 100,
  },
  image: {
    flex: 1,
    resizeMode:"center",
    alignItems: "center",
  },
  backgroundImage: {
    alignItems: "center",
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    padding: SIZES.large,
    borderRadius: BORDERRADIUS, 
    backgroundColor: COLORS.butttonLightColor,
    marginBottom: 10, 
    alignItems:"center"
  },
  input: {
    width: '80%',
    height: SIZES.medium,
    borderColor: COLORS.butttonLightColor,
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: SIZES.large, 
    borderRadius: BORDERRADIUS
  },
  link: {
    marginTop: 16,
    color: COLORS.butttonLightColor,
    fontSize: SIZES.medium,
  },
 
});

export {styles, containerStyles, imageStyles};