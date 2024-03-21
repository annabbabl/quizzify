import Toast from "react-native-toast-message";

const showErrorToast = (toastKeyError:string) => {
    Toast.show({
        type: 'error',
        text1:  toastKeyError,
      }); 
}
const showSuccessToast = (toastKeyError:string) => {
    Toast.show({
        type: 'success',
        text1:  toastKeyError,
    });
}

export {showErrorToast, showSuccessToast}