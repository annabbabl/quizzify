import { StyleSheet } from "react-native";
import { COLORS, SIZES, BORDERRADIUS} from "../constants";

const containerStyles =  
    StyleSheet.create({
      container: {
        alignItems: 'center',
        backgroundColor: COLORS.backgroundColor,
        justifyContent: 'space-between',
        flex: 1,
        textAlign: 'center',
      },
     
        bottomBarContainer: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor:COLORS.secondaryColor, 
          justifyContent: 'space-between',
          flex: 1,
          textAlign:'center'
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
        b: {
          flex: 1,
          justifyContent: 'flex-end',
          marginBottom: 10
        },    
        bottomHorizontal: {
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginBottom: 10
        },
        buttonTabBar: {
          width: '100%',
          alignItems: 'center', 
          justifyContent:'center',
          alignContent:'space-between'
        },
        center: {
          alignItems:"center"
        }, 
        horizontalContainer1: {
          flexDirection: 'row',
          alignItems: 'center', 
          marginBottom: 10,
          marginTop: 10,
        },
        horizontalCentral2: {
          flexDirection: 'row',
          alignItems: 'center', 
          marginBottom: 5,
          marginTop: 5,
          justifyContent: 'center', 
        },
        horizontalContainer2: {
          flexDirection: 'row',
          justifyContent: 'space-between', 
          marginBottom: 10,
          marginTop: 10,
        },
        horizontalContainer3: {
          flexDirection: 'row',
          justifyContent: 'space-between', 
          marginBottom: 2,
          marginTop: 2,
        },
        modalContainer: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.backgroundColor,
        },
        modalContent: {
          backgroundColor: 'white',
          padding: 20,
          borderRadius: 10,
          elevation: 5,
          alignItems:'center'
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
      backgroundImageTemplate: {
        resizeMode:"center",
        width: 150,
        height: 100,
      },
      imageGallery: {
        flex: 1,
        resizeMode:"contain",
        width: 150,
        height: 150,
        borderRadius: 6
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
  link: {
    fontSize: SIZES.xLarge,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center'
  }, 
  smallIconsText: {
    fontSize: SIZES.xLarge,
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
    color: COLORS.secondaryColor,
    textAlign: 'center'
  },
  buttonTextXS: {
    fontSize: SIZES.medium,
    fontWeight: 'bold',
    color: COLORS.secondaryColor,
    textAlign: 'center'
  },
  button: {
    padding: SIZES.large,
    backgroundColor: COLORS.backgroundColor,
    borderColor: COLORS.secondaryColor, 
    borderWidth: 3, 
    marginBottom: 10, 
    alignItems:"center",
    justifyContent:"center",
    width: '80%', 
    textAlign: 'center'
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