const COLORS = {
  butttonLightColor: '#80A0AA',
  backgroundColor: '#FCFCFC', 
  primaryTextColor: "#000000",
  activityIndicatorColor: '#0000f'
};

const IMAGES = {
  BACKGROUND: "../assets/images/welcomeBackground.svg",
  LOGO: "../assets/images/logo.svg",
  WELCOMESCREEN: "../assets/images/Group 5.svg"
}

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 58,
};

const SHADOWS = {
  small: {
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2, // For Android elevation
  },
  middle: {
    shadowColor: 'rgba(0, 0, 0, 0.24)',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 8,
    elevation: 4, // For Android elevation
  },
  strong: {
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 54 },
    shadowOpacity: 1,
    shadowRadius: 55,
    elevation: 24, // For Android elevation (adjust as needed)
  },
};
const BORDERRADIUS =  50; 


export { COLORS, FONT, SIZES, SHADOWS, BORDERRADIUS, IMAGES };
  
