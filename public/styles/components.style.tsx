import { StyleSheet } from "react-native";
import { COLORS, SIZES, BORDERRADIUS} from "../constants";

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
          justifyContent: 'flex-end',
          alignItems:'center',
          marginBottom: 10
        },
        center: {
          justifyContent:"center"
        }, 
        horizontalContainer1: {
          flexDirection: 'row',
          alignItems: 'center', 
          marginBottom: 10,
          marginTop: 10,
          borderColor: COLORS.secondaryColor,
          borderWidth: 5,
          padding: SIZES.xLarge,
        },
        horizontalContainer2: {
          flexDirection: 'row',
          alignItems: 'center', 
          marginBottom: 10,
          marginTop: 10,
        },
})   
const imageStyles =  
    StyleSheet.create({
      image1: {
        flex: 1,
        resizeMode:"center",
        width: 450,
        height: 200,
      },
      image2: {
        flex: 1,
        resizeMode:"center",
        width: 200,
        height: 200
      },
      backgroundImage: {
        flex: 1,      
      },
})   

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.xxLarge,
    fontWeight: 'bold',
    color: COLORS.primaryTextColor,
    marginTop: 50,
    marginBottom: 10,
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
  button: {
    padding: SIZES.large,
    borderRadius: BORDERRADIUS, 
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 10, 
    alignItems:"center", 
    width: '80%'
  },
  input: {
    width: '100%',
    height: SIZES.xxLarge,
    borderColor: COLORS.secondaryColor,
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: SIZES.large, 
    borderRadius: BORDERRADIUS,
    backgroundColor: COLORS.backgroundColor,
  },
  link: {
    marginTop: SIZES.large,
    color: 'black',
    width: '80%',
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    textAlign: "center"
  },
  normalText: {
    fontSize: SIZES.xLarge,
    color: 'black',
  },
  boldText: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: 'black',
}
});


  
export {styles, containerStyles, imageStyles};