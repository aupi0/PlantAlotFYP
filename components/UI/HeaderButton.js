import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons'; //chance icons later

import Colors from '../../constants/Colors';
import { Header } from 'react-navigation-stack';

const CustomHeaderButton = props => {
    return <HeaderButton {...props} IconComponent={Ionicons} iconSize={30} color={'white'}/>
};

export default CustomHeaderButton;