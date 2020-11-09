import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { Overlay } from 'react-native-elements'





const Modal = props => {

    const {isVisible, setIsVisible, children } = props 

    const closeModal = () => setIsVisible(false)

    return(
        <Overlay
        isVisible= {isVisible}
        windowBackgroundColor= 'rgba(0,0,0,0.5)'
        overlayBackgroundColor='transparent'
        overlayStyle = {styles.overlay}
        onBackdropPress = {closeModal}
        >
            <SafeAreaView styles={styles.children}>
            {children}

            </SafeAreaView>
        </Overlay>
    )

}


export default Modal 

const styles =  StyleSheet.create( {
    overlay: {
        height: 'auto', 
        width: '90%',
        backgroundColor: '#fff',
    }, 
})