import { useEffect, useState } from 'react';
import { TemplateFragmentProps } from '../../../../navigation/routers';
import { View, Image, ActivityIndicator, ScrollView, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { containerStyles, imageStyles } from '../../../../styles/components.style';
import { CustomButtonWithIcon, CustomText } from '../../../common/shared/components';
import { COLORS, ICONSIZE } from '../../../../constants/theme';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Images } from '../../../../types/databaseTypes';
import { FIRESTORE, FIREBASE_AUTH, FIREBASE_STORAGE } from '../../../../firebase/firebaseConfig';

const ImageFragment = ({
  setImageFragmentVisibility,
  setImages,
  templateID,
  images,
  setBackgroundImage, 
  backgroundImage
}: TemplateFragmentProps) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const templateDocRef = FIRESTORE.collection('users')
      .doc(FIREBASE_AUTH?.currentUser?.uid)
      .collection('templates')
      .doc(templateID);

    const unsubscribe = templateDocRef.onSnapshot((docSnapshot) => {
      const newImageArray = []; // This will be an array of strings if images are just URLs
      const templateData = docSnapshot.data();

      if (templateData && templateData.images) {
        newImageArray.push(...templateData.images); // Assuming 'images' is an array of strings (URLs)
      } else {
        console.warn(`Template with ID ${templateID} has no image data.`);
      }

      setImages?.(newImageArray);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up the subscription
  }, [templateID]); // Depend on templateID to re-subscribe when it changes

  const handleImagePickAndUpload = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (result.canceled) {
        return;
      }

      setLoading(true);
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      const storageRef = ref(FIREBASE_STORAGE, `images/${result.assets[0].fileName}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Optional: Handle progress updates
        },
        (error) => {
          console.error('Error uploading image:', error);
          alert('Error uploading image. Please try again.'); // Update with your error handling message
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const templateDocRef = FIRESTORE.collection('users')
            .doc(FIREBASE_AUTH?.currentUser?.uid)
            .collection('templates')
            .doc(templateID);

          // Get current images array, add new image, and update document
          templateDocRef.get().then((doc) => {
            const currentImages = doc.data()?.images || [];
            const updatedImages = [...currentImages, downloadURL];
            templateDocRef.update({ images: updatedImages });
          });

          alert('Image uploaded successfully!');
          console.log('File available at', downloadURL);
        }
      );
    } catch (error) {
      console.error('Error picking/uploading image:', error);
      alert('Error picking/uploading image. Please try again.'); // Update with your error handling message
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageURL: string) => {
    try {
      setLoading(true);

      const templateDocRef = FIRESTORE.collection('users')
        .doc(FIREBASE_AUTH?.currentUser?.uid)
        .collection('templates')
        .doc(templateID);

      // Remove image URL from Firestore document
      templateDocRef.get().then((doc) => {
        const currentImages = doc.data()?.images || [];
        const updatedImages = currentImages.filter((url: any) => url !== imageURL);
        templateDocRef.update({ images: updatedImages });
      });

      // Delete image file from Firebase Storage
      const fileRef = ref(FIREBASE_STORAGE, imageURL); // Assuming imageURL is the full path to the image in storage
      await deleteObject(fileRef);

      console.log('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Error deleting image. Please try again.'); // Update with your error handling message
    } finally {
      setLoading(false);
    }

  return { images, loading, handleImagePickAndUpload, deleteImage };
  }


  const setBG = (uri: string) => {
    setBackgroundImage?.(uri); 
    setImageFragmentVisibility?.(false)
  }

  
  return (
    <View style={containerStyles.center}>
      <View style={[containerStyles.bottomHorizontal, { marginTop: 8 }]}>
        <CustomButtonWithIcon
          onPress={handleImagePickAndUpload}
          iconName="upload"
          iconSize={ICONSIZE.small}
          iconColor={COLORS.secondaryColor}
          color={COLORS.secondaryColor}
        />

        <CustomButtonWithIcon
          onPress={() => setImageFragmentVisibility?.(false)}
          iconName="cancel"
          iconSize={ICONSIZE.small}
          iconColor={COLORS.backgroundColor}
          color={COLORS.thirdColor}
        />
      </View>
     {!loading ? (
        <ScrollView>
          {Array.isArray(images) && images ? (
            <>
              {images.map((image: any, index: number) => (
                <View style={containerStyles.horizontalContainer3} key={index}>
                  <Pressable onPress={() => setBG(image ? image : '')}>
                    <Image source={{uri: image}} style={imageStyles.imageGallery}/>
                  </Pressable>
                  <CustomButtonWithIcon
                    onPress={() => deleteImage(image)}
                    iconName="cancel"
                    iconSize={ICONSIZE.small}
                    iconColor={COLORS.secondaryColor}
                    color={COLORS.secondaryColor}
                  />
                </View>
              ))} 
            </>
          ) : (
            <CustomText label={t('No images available')} />
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color={COLORS.activityIndicatorColor} />
      )}
    </View>
  );
};

export default ImageFragment;