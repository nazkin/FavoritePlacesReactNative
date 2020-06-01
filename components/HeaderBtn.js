import React from 'react'
import {HeaderButton} from 'react-navigation-header-buttons';
import {Ionicons} from '@expo/vector-icons'

/**
* @author
* @function HeaderBtnCustom
**/
const HeaderBtnCustom = (props) => {


 return <HeaderButton {...props} IconComponent={Ionicons} iconSize={25} color="ghostwhite"/>
}



export default HeaderBtnCustom

