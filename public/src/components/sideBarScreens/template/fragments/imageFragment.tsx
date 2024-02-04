import React, { useEffect, useState } from 'react';
import { TemplateFragmentProps } from '../../../../navigation/routers';
import { View, Image, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import * as ImagePicker from 'expo-image-picker';
import { containerStyles, imageStyles } from '../../../../styles/components.style';
import { CustomButtonWithIcon, CustomText } from '../../../common/shared/components';
import { COLORS, ICONSIZE } from '../../../../constants/theme';
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { Images } from '../../../../types/databaseTypes';
import { ImagesEdit } from '../../../../types/localTypes/editTypes';
import { FIREBASE_AUTH, FIREBASE_STORAGE, FIRESTORE } from '../../../../../firebaseConfig';

const ImageFragment = ({
  setImageFragmentVisibility,
  setImages,
  templateID,
  images,
  setBackgroundImage, 
  backgroundImage
}: TemplateFragmentProps) => {
  const { t } = useTranslation();

  const imageCollection = FIRESTORE.collection('users')
    .doc(FIREBASE_AUTH?.currentUser?.uid)
    .collection('templates')
    .doc(templateID)
    .collection('images');

  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(true);
  const [initialImages, setImagesState] = useState<Array<any>>(images ? images : [] );


  useEffect(() => {
    const unsubscribe = imageCollection.onSnapshot((querySnapshot) => {
      let newImageObject = {};
  
      querySnapshot.docs.forEach((doc) => {
        const imageData = doc.data();
        const imageId = doc.id;
  
        if (imageData) {
          newImageObject[imageId] = { id: imageId, ...imageData };
        } else {
          console.warn(`Document with ID ${imageId} has no data.`);
        }
      });
      console.log(newImageObject, 122)
      initialImages.push(newImageObject);
      setImages?.(images ? images : [])
      setLoading(false)
    });
  
    return () => {
      if(loading){
        unsubscribe();
      }
    };
  }, []); 

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

      const storageRef = ref(FIREBASE_STORAGE, `images/${new Date().getTime()}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);
      setLoading(true);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
        },
        (error) => {
          console.error('Error uploading image:', error);
          console.log(t('error'))
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const imageData:Images = {name: uploadTask.snapshot.metadata.name, 
                            uri: downloadURL}
          imageCollection.add(imageData).then(()=>{ 
                                              alert('Image uploaded successfully!');
                                              console.log('File available at', downloadURL); 
                                              setIsFetching(true)
                                            })
                                            .catch((error) => {console.log(t('error')); console.error(error);})         
        }
      );
    } catch (error) {
      console.error('Error picking/uploading image:', error);
      alert('Error picking/uploading image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async(image: Images) => {
    try {
      const storageRef = ref(FIREBASE_STORAGE, `images/${image.name}`);
      setLoading(true)

      if (image.id === '' || typeof image.id === 'undefined'){
        throw Error(t('missingAnswers'))
      }
      await imageCollection.doc(image.id).delete();
      
      deleteObject(storageRef)
      .then(() => {
        console.log('File deleted successfully');
        if(image.uri=== backgroundImage){
          setBackgroundImage?.('')
        }
      })
      .catch((error) => {
        console.error('Error deleting file:', error);
      });
      console.log('Question deleted successfully!');
    } catch (error) {
      console.error('Error deleting question:', error.message);
    }finally{
      setLoading(false)
    }
  }
  const setBG = (uri: string) => {
    setBackgroundImage?.(uri); 
    setImageFragmentVisibility?.(false)
  }

  console.log(initialImages, 12234)

  return (
    <View style={containerStyles.center}>
     {!loading ? (
        <ScrollView>
          {Array.isArray(initialImages) && images ? (
            <>
              {initialImages.map((image: ImagesEdit, index: number) => (
                <View style={containerStyles.horizontalContainer3} key={index}>
                  <TouchableOpacity onPress={() => setBG(image.uri ? image.uri : '')}>
                    <Image source={{uri: image.uri}} style={imageStyles.imageGallery}/>
                  </TouchableOpacity>
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
          iconColor={COLORS.secondaryColor}
          color={COLORS.secondaryColor}
        />
      </View>
    </View>
  );
};

export default ImageFragment;