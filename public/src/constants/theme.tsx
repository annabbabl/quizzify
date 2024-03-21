const COLORS = {
  secondaryColor: '#6750A4',
  thirdColor: '#978DB0',
  backgroundColor: '#F8F5FF', 
  primaryTextColor: "#000000",
  activityIndicatorColor: '#0000f', 
  redPrimaryColor: '#B00000',
  greenPrimaryColor: '#367D24',
  redSecondaryColor: '#2BD800',
  greenSecondaryColor: '#FB0303',
  primaryIconColor: 'black'
};

const IMAGES = {
  BACKGROUND: "../../assets/welcomeBackground.svg",
  WAVY_BACKGROUND: "../../assets/wavyBackground.svg",
  LOGO: "../../assets/logo.svg",
  WELCOMESCREEN: "../../assets/Group 5.svg",
  UPPER_WAVE: "../../assets/upperWave.svg"
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
  xxLarge: 40,
  xxxLarge: 58,
};

const SHADOWS = {
  small: {
    shadowColor: 'rgba(0, 0, 0, 0.16)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 2, 
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

const ICONSIZES = {
  small:  35, 
  medium: 45, 
  large:  90, 
}; 


export { 
        COLORS, 
        FONT, 
        SIZES, 
        SHADOWS, 
        BORDERRADIUS, 
        IMAGES, 
        ICONSIZES as ICONSIZE
      };
  
