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
        marginContainer: {
          alignItems: 'center',
          backgroundColor:COLORS.backgroundColor, 
          justifyContent: 'space-between',
          flex: 1,
          marginBottom: 30, 
        },
        borderContainer: {
          backgroundColor:COLORS.backgroundColor, 
          borderColor: COLORS.secondaryColor,
          borderWidth: 5,
          marginBottom: 10, 
        },
        iconButtonCotainer: {
          backgroundColor:COLORS.backgroundColor, 
          alignItems:'center',
          marginBottom: 10, 
        }, 
        bottom: {
          flex: 1,
          justifyContent: 'flex-end',
          alignItems:'center',
          marginBottom: 10
        },
        bottomHorizontal: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
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
          padding: SIZES.xLarge,
        },
        horizontalContainer2: {
          flexDirection: 'row',
          justifyContent: 'space-between', 
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
        width: '100%',       
        height: '100%',       
      },
}) 

const textStyles = {
  title: {
    size: SIZES.xLarge,
    weight: 'bold',
    fontFamily: "kumarOne",
  },
  undertitle: {
    fontSize: SIZES.medium,
    color: '#000',
  },
  normalText: {
    fontSize: SIZES.xLarge,
    color: 'black',
  },
  boldText: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: 'black',
  }, 
  smallIconsText: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: 'white',
  }, 
  errorStyle: {
    fontSize: SIZES.xLarge,
    color: COLORS.redPrimaryColor,
  }
}

const styles = StyleSheet.create({
  buttonTextXL: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: 'white',
  },
  buttonTextXS: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: 'white',
  },
  
  button: {
    padding: SIZES.large,
    borderRadius: BORDERRADIUS, 
    backgroundColor: COLORS.secondaryColor,
    marginBottom: 10, 
    alignItems:"center",
    justifyContent:"center",
    width: '80%'
  },
  input1: {
    width: '100%',
    height: SIZES.xxLarge,
    borderColor: COLORS.secondaryColor,
    borderWidth: 2,
    marginBottom: 10,
    paddingLeft: SIZES.large, 
    borderRadius: BORDERRADIUS,
    backgroundColor: COLORS.backgroundColor,
  },
  input2: {
    width: '80%',
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
  
});

  
export {styles, containerStyles, imageStyles, textStyles};